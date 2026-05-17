"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import RazorpayCheckout from "@/components/RazorpayCheckout";

export default function CheckoutPage() {
  const { items, totalINR } = useCart();
  const { format } = useCurrency();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const update = (field: keyof typeof customer, value: string) => {
    setCustomer((c) => ({ ...c, [field]: value }));
  };

  const valid =
    customer.name.trim() &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.city.trim() &&
    customer.state.trim() &&
    customer.zip.trim();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-muted">Your cart is empty.</p>
        <Link href="/veg-pickles" className="mt-4 inline-block text-accent font-semibold">
          Continue shopping
        </Link>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-ink";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>

      <div className="mt-10 grid lg:grid-cols-2 gap-10">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="text-xs font-semibold text-muted uppercase">Full name</span>
            <input
              required
              value={customer.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted uppercase">Phone</span>
            <input
              required
              type="tel"
              value={customer.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted uppercase">Email</span>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted uppercase">Address</span>
            <textarea
              required
              rows={2}
              value={customer.address}
              onChange={(e) => update("address", e.target.value)}
              className={inputClass}
            />
          </label>
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted uppercase">City</span>
              <input
                required
                value={customer.city}
                onChange={(e) => update("city", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted uppercase">State</span>
              <input
                required
                value={customer.state}
                onChange={(e) => update("state", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted uppercase">PIN</span>
              <input
                required
                value={customer.zip}
                onChange={(e) => update("zip", e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
        </form>

        <div>
          <div className="rounded-xl border border-border bg-surface-elevated p-6">
            <h2 className="font-semibold text-ink">Order summary</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="flex justify-between text-muted"
                >
                  <span>
                    {item.productName} ({item.variantLabel}) × {item.quantity}
                  </span>
                  <span>{format(item.priceINR * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span className="text-accent">{format(totalINR)}</span>
            </div>
          </div>

          <div className="mt-6">
            <RazorpayCheckout customer={customer} disabled={!valid} />
          </div>
          <p className="mt-4 text-xs text-muted text-center">
            Secure payment via Razorpay · Glass jars packed with care
          </p>
        </div>
      </div>
    </div>
  );
}
