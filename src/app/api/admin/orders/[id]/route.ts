import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { updateOrder } from "@/lib/orders-db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const patch: { adminNotes?: string; paymentStatus?: "pending" | "paid" } = {};
  if (typeof body.adminNotes === "string") patch.adminNotes = body.adminNotes;
  if (body.paymentStatus === "pending" || body.paymentStatus === "paid") {
    patch.paymentStatus = body.paymentStatus;
  }
  const order = await updateOrder(id, patch);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
