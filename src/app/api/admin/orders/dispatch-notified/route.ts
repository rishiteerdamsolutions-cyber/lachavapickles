import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { markCustomerDispatchNotified } from "@/lib/orders-db";

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }
    await markCustomerDispatchNotified(orderId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/admin/orders/dispatch-notified:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
