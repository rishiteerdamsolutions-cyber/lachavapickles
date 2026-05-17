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
  createdAt: Date;
  dtdcSentAt?: Date;
}

const COLLECTION = "orders";

export async function saveOrderToDb(
  orderId: string,
  displayOrderId: string,
  items: OrderItem[],
  totalINR: number,
  customer: OrderCustomer
): Promise<void> {
  if (!process.env.MONGODB_URI) return;
  const db = await getDb();
  await db.collection(COLLECTION).insertOne({
    orderId,
    displayOrderId,
    paymentStatus: "pending",
    amountINR: totalINR,
    items,
    customer,
    createdAt: new Date(),
  });
}

export async function markOrderPaid(
  orderId: string,
  paymentId: string
): Promise<void> {
  if (!process.env.MONGODB_URI) return;
  const db = await getDb();
  await db.collection(COLLECTION).updateOne(
    { orderId },
    { $set: { paymentStatus: "paid", paymentId } }
  );
}

export async function getAllOrders(): Promise<Order[]> {
  if (!process.env.MONGODB_URI) return [];
  const db = await getDb();
  const docs = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs as unknown as Order[];
}

export async function markDtdcSent(orderId: string): Promise<void> {
  if (!process.env.MONGODB_URI) return;
  const db = await getDb();
  await db.collection(COLLECTION).updateOne(
    { orderId },
    { $set: { dtdcSentAt: new Date() } }
  );
}
