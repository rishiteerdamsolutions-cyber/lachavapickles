"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalINR } = useCart();
  const { format } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-ink">Your cart</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/veg-pickles"
          className="inline-flex mt-8 min-h-[48px] items-center rounded-full bg-accent px-8 font-semibold text-white hover:bg-accent-hover"
        >
          Shop pickles
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl text-ink">Your cart</h1>
        <CurrencySelector />
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantId}`}
            className="rounded-xl border border-border bg-surface-elevated p-4"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-semibold text-ink">{item.productName}</p>
                <p className="text-sm text-muted">{item.variantLabel}</p>
                <p className="mt-1 text-sm text-accent">
                  {format(item.priceINR * item.quantity)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.productId, item.variantId)}
                className="text-xs text-muted hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <div className="mt-3 flex items-center rounded-lg border border-border w-fit">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.productId, item.variantId, item.quantity - 1)
                }
                className="min-w-[40px] min-h-[40px] hover:bg-surface"
              >
                −
              </button>
              <span className="px-3 font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.productId, item.variantId, item.quantity + 1)
                }
                className="min-w-[40px] min-h-[40px] hover:bg-surface"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-border bg-forest-soft p-5">
        <div className="flex justify-between text-lg font-semibold text-ink">
          <span>Subtotal</span>
          <span className="text-accent">{format(totalINR)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">Shipping calculated at checkout</p>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex w-full min-h-[48px] items-center justify-center rounded-full bg-accent font-semibold text-white hover:bg-accent-hover"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
