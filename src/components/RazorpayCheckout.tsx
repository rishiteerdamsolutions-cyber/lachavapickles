"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useLanguage } from "@/context/LanguageContext";

function isClientDemoPayments(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_PAYMENTS === "false") return false;
  if (process.env.NEXT_PUBLIC_DEMO_PAYMENTS === "true") return true;
  return !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Props {
  customer: CustomerForm;
  disabled?: boolean;
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type CreateOrderResponse = {
  demo?: boolean;
  orderId: string;
  displayOrderId: string;
  paymentId?: string;
  amountINR?: number;
  paymentStatus?: string;
  items?: { productName: string; variantLabel: string; quantity: number }[];
  amount?: number;
  currency?: string;
  key?: string;
  error?: string;
};

export default function RazorpayCheckout({ customer, disabled }: Props) {
  const { items, totalINR, clearCart } = useCart();
  const { setLastOrder } = useOrder();
  const { t } = useLanguage();
  const demo = isClientDemoPayments();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finishOrder = (data: CreateOrderResponse) => {
    const success = {
      orderId: data.orderId,
      displayOrderId: data.displayOrderId,
      paymentId: data.paymentId || `demo_${data.orderId}`,
      amountINR: data.amountINR ?? totalINR,
      items: data.items ?? items.map((i) => ({
        productName: i.productName,
        variantLabel: i.variantLabel,
        quantity: i.quantity,
      })),
      paymentStatus: data.paymentStatus || "paid",
    };
    setLastOrder(success);
    sessionStorage.setItem("orderSuccess", JSON.stringify(success));
    clearCart();
    router.push("/checkout/success");
  };

  const handlePay = async () => {
    if (disabled || items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountINR: totalINR,
          items: items.map((i) => ({
            productName: i.productName,
            variantLabel: i.variantLabel,
            quantity: i.quantity,
            priceINR: i.priceINR,
          })),
          customer,
        }),
      });
      const order: CreateOrderResponse = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not create order");

      if (order.demo) {
        finishOrder(order);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Payment gateway failed to load");

      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Lachava Telangana Pickles",
        description: "Authentic Telangana Pickles",
        order_id: order.orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const data = await verifyRes.json();
          if (!verifyRes.ok) {
            setError(data.error || "Payment verification failed");
            return;
          }
          finishOrder(data);
        },
        theme: { color: "#e85d2c" },
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handlePay}
        disabled={disabled || loading || items.length === 0}
        className="w-full min-h-[48px] rounded-full bg-accent px-6 font-semibold text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading
          ? "Processing…"
          : demo
            ? t("checkout.placeOrder")
            : t("checkout.placeOrder")}
      </button>
      <p className="mt-2 text-center text-xs text-muted">
        {demo ? t("checkout.demoNote") : t("checkout.liveNote")}
      </p>
    </div>
  );
}
