import { Order } from "./orders-db";

export function getDtdcWhatsAppNumber(): string {
  return (
    process.env.NEXT_PUBLIC_DTDC_WHATSAPP_NUMBER ||
    process.env.DTDC_WHATSAPP_NUMBER ||
    "919949525111"
  );
}

export function buildDtdcMessage(order: Order): string {
  const lines = [
    "DTDC Shipment Request — Lachava Pickles",
    "",
    `Order: ${order.displayOrderId}`,
    `Customer: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}`,
    "",
    "Items:",
    ...order.items.map(
      (i) => `- ${i.productName} (${i.variantLabel}) × ${i.quantity}`
    ),
    "",
    `Total: ₹${order.amountINR}`,
  ];
  return lines.join("\n");
}

export function dtdcWhatsAppUrl(order: Order): string {
  const num = getDtdcWhatsAppNumber().replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(buildDtdcMessage(order))}`;
}
