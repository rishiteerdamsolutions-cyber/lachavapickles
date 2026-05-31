import { Order } from "./orders-db";

export function formatCustomerWhatsAppPhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  if (digits.startsWith("0") && digits.length === 11) digits = `91${digits.slice(1)}`;
  return digits;
}

export function buildPaymentConfirmedMessage(order: Order): string {
  const lines = [
    `Namaste ${order.customer.name}! 🙏`,
    "",
    `Your payment of ₹${order.amountINR} for order *${order.displayOrderId}* is confirmed.`,
    "",
    "We're preparing your Lachava pickles for dispatch. You'll get another WhatsApp once it's shipped.",
    "",
    "Thank you!",
    "Lachava Telangana Vantalu",
  ];
  return lines.join("\n");
}

export function buildDispatchMessage(order: Order): string {
  const lines = [
    `Namaste ${order.customer.name}! 📦`,
    "",
    `Your order *${order.displayOrderId}* has been dispatched via DTDC.`,
    "",
    "Expected delivery: within 5 working days or less.",
    "",
    "Thank you for your order!",
    "Lachava Telangana Vantalu",
  ];
  return lines.join("\n");
}

export function customerPaymentWhatsAppUrl(order: Order): string {
  const num = formatCustomerWhatsAppPhone(order.customer.phone);
  return `https://wa.me/${num}?text=${encodeURIComponent(buildPaymentConfirmedMessage(order))}`;
}

export function customerDispatchWhatsAppUrl(order: Order): string {
  const num = formatCustomerWhatsAppPhone(order.customer.phone);
  return `https://wa.me/${num}?text=${encodeURIComponent(buildDispatchMessage(order))}`;
}
