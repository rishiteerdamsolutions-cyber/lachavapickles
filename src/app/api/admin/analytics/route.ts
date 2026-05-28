import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAllOrders } from "@/lib/orders-db";
import { computeOrderAnalytics } from "@/lib/order-analytics";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await getAllOrders();
  const analytics = computeOrderAnalytics(orders);
  return NextResponse.json(analytics);
}
