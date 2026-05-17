import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrder, deleteOrder } from "@/lib/order-store";
import { markOrderPaid } from "@/lib/orders-db";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = await req.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expected !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await markOrderPaid(orderId, paymentId);

    const orderData = getOrder(orderId);
    if (orderData) deleteOrder(orderId);

    return NextResponse.json({
      orderId,
      displayOrderId: orderData?.displayOrderId ?? orderId,
      paymentId,
      amountINR: orderData?.amountINR ?? 0,
      paymentStatus: "paid",
      items: orderData?.items ?? [],
      customer: orderData?.customer,
    });
  } catch (err) {
    console.error("POST /api/verify-payment:", err);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
