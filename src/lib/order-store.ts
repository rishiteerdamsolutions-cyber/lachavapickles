import { OrderCustomer, OrderItem } from "./orders-db";

export interface PendingOrder {
  orderId: string;
  displayOrderId: string;
  amountINR: number;
  items: OrderItem[];
  customer: OrderCustomer;
}

const pending = new Map<string, PendingOrder>();

export function saveOrder(order: PendingOrder): void {
  pending.set(order.orderId, order);
}

export function getOrder(orderId: string): PendingOrder | undefined {
  return pending.get(orderId);
}

export function deleteOrder(orderId: string): void {
  pending.delete(orderId);
}
