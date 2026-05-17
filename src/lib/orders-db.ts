import { promises as fs } from "fs";
import path from "path";
import { getDb } from "./mongodb";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productName: string;
  variantLabel: string;
  quantity: number;
  priceINR: number;
}

export type PaymentStatus = "pending" | "paid";

export interface Order {
  orderId: string;
  displayOrderId: string;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  amountINR: number;
  items: OrderItem[];
  customer: OrderCustomer;
  createdAt: Date | string;
  dtdcSentAt?: Date | string;
}

const COLLECTION = "orders";
const FILE_STORE = path.join(process.cwd(), "data", "orders-store.json");

let memoryOrders: Order[] | null = null;

async function readFileOrders(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(FILE_STORE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeFileOrders(orders: Order[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_STORE), { recursive: true });
  await fs.writeFile(FILE_STORE, JSON.stringify(orders, null, 2), "utf-8");
  memoryOrders = orders;
}

async function getOrders(): Promise<Order[]> {
  if (memoryOrders) return memoryOrders;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const docs = await db
        .collection(COLLECTION)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      memoryOrders = docs as unknown as Order[];
      return memoryOrders;
    } catch (err) {
      console.error("MongoDB orders fetch failed, using file store:", err);
    }
  }

  memoryOrders = await readFileOrders();
  return memoryOrders;
}

async function persistOrders(orders: Order[]): Promise<void> {
  memoryOrders = orders;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const col = db.collection(COLLECTION);
      await col.deleteMany({});
      if (orders.length) await col.insertMany(orders);
      return;
    } catch (err) {
      console.error("MongoDB orders save failed, using file store:", err);
    }
  }

  await writeFileOrders(orders);
}

export async function saveOrderToDb(
  orderId: string,
  displayOrderId: string,
  items: OrderItem[],
  totalINR: number,
  customer: OrderCustomer
): Promise<void> {
  const orders = await getOrders();
  orders.unshift({
    orderId,
    displayOrderId,
    paymentStatus: "pending",
    amountINR: totalINR,
    items,
    customer,
    createdAt: new Date().toISOString(),
  });
  await persistOrders(orders);
}

export async function createPaidOrder(
  orderId: string,
  displayOrderId: string,
  paymentId: string,
  items: OrderItem[],
  totalINR: number,
  customer: OrderCustomer
): Promise<Order> {
  const order: Order = {
    orderId,
    displayOrderId,
    paymentId,
    paymentStatus: "paid",
    amountINR: totalINR,
    items,
    customer,
    createdAt: new Date().toISOString(),
  };
  const orders = await getOrders();
  orders.unshift(order);
  await persistOrders(orders);
  return order;
}

export async function markOrderPaid(
  orderId: string,
  paymentId: string
): Promise<void> {
  const orders = await getOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx >= 0) {
    orders[idx] = {
      ...orders[idx],
      paymentStatus: "paid",
      paymentId,
    };
    await persistOrders(orders);
  }
}

export async function getAllOrders(): Promise<Order[]> {
  return getOrders();
}

export async function markDtdcSent(orderId: string): Promise<void> {
  const orders = await getOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], dtdcSentAt: new Date().toISOString() };
    await persistOrders(orders);
  }
}

export function invalidateOrdersCache(): void {
  memoryOrders = null;
}
