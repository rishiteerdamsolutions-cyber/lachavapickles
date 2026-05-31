import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getOrder } from "@/lib/order-store";
import { getOrderByRazorpayId } from "@/lib/orders-db";

export async function GET(req: NextRequest) {
  const orderId = new URL(req.url).searchParams.get("orderId");
  const format = new URL(req.url).searchParams.get("format") ?? "json";

  if (!orderId) {
    return NextResponse.json({ error: "orderId required" }, { status: 400 });
  }

  let displayOrderId: string | undefined;
  let amountINR = 0;
  let items: { productName: string; variantLabel: string; quantity: number; priceINR: number }[] =
    [];
  let customer:
    | {
        name: string;
        phone: string;
        email?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
      }
    | undefined;

  const pending = getOrder(orderId);
  if (pending) {
    displayOrderId = pending.displayOrderId;
    amountINR = pending.amountINR;
    items = pending.items;
    customer = pending.customer;
  } else {
    const dbOrder = await getOrderByRazorpayId(orderId);
    if (dbOrder) {
      displayOrderId = dbOrder.displayOrderId;
      amountINR = dbOrder.amountINR;
      items = dbOrder.items;
      customer = dbOrder.customer;
    }
  }

  if (!displayOrderId && !items.length) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const receipt = {
    orderId,
    displayOrderId: displayOrderId ?? orderId,
    amountINR,
    items,
    customer,
  };

  if (format === "pdf") {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Lachava Telangana Vantalu", 14, 20);
    doc.setFontSize(11);
    doc.text(`Order ID: ${receipt.displayOrderId}`, 14, 30);
    if (customer) {
      doc.text(`Customer: ${customer.name}`, 14, 38);
      doc.text(`Phone: ${customer.phone}`, 14, 44);
    }
    autoTable(doc, {
      startY: 52,
      head: [["Item", "Variant", "Qty", "Price"]],
      body: items.map((i) => [
        i.productName,
        i.variantLabel,
        String(i.quantity),
        `₹${i.priceINR}`,
      ]),
    });
    const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY ?? 80;
    doc.text(`Total: ₹${amountINR}`, 14, finalY + 12);

    const pdf = Buffer.from(doc.output("arraybuffer"));
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${receipt.displayOrderId}.pdf"`,
      },
    });
  }

  return NextResponse.json(receipt);
}
