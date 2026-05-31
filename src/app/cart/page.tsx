"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalINR } = useCart();
  const { format } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="app-content py-20 text-center">
        <h1 className="text-xl font-bold text-brand">Your cart</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-flex mt-8 min-h-[48px] items-center rounded-full bg-brand px-8 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-dark"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="app-content py-[clamp(1.5rem,5vw,3rem)]">
      <h1 className="text-xl font-bold text-brand">Your cart</h1>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantId}`}
            className="rounded-xl border border-border bg-white p-4"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-semibold text-brand">{item.productName}</p>
                <p className="text-sm text-muted">{item.variantLabel}</p>
                <p className="mt-1 text-sm font-semibold text-brand">
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
            <div className="mt-3 flex w-fit items-center rounded-full border border-border">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.productId, item.variantId, item.quantity - 1)
                }
                className="min-h-[40px] min-w-[40px] hover:bg-surface rounded-l-full"
              >
                −
              </button>
              <span className="min-w-[2rem] px-3 text-center font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.productId, item.variantId, item.quantity + 1)
                }
                className="min-h-[40px] min-w-[40px] hover:bg-surface rounded-r-full"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-border bg-white p-5">
        <div className="flex justify-between text-lg font-bold text-brand">
          <span>Subtotal</span>
          <span>{format(totalINR)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">Shipping calculated at checkout</p>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex w-full min-h-[48px] items-center justify-center rounded-full bg-brand text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-dark"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
