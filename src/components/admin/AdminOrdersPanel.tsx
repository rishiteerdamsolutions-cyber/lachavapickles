"use client";

import { useCallback, useEffect, useState } from "react";
import { Order } from "@/lib/orders-db";
import SendToDtdcButton from "@/components/SendToDtdcButton";
import { formatINR } from "@/lib/currency";

export default function AdminOrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl text-ink">Orders</h1>
      <p className="text-sm text-muted mt-1">
        {orders.length} orders · MongoDB required for persistence
      </p>

      {loading ? (
        <p className="mt-8 text-muted">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-muted">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <article
              key={o.orderId}
              className="rounded-xl border border-border bg-surface-elevated p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{o.displayOrderId}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {new Date(o.createdAt).toLocaleString("en-IN")} ·{" "}
                    <span
                      className={
                        o.paymentStatus === "paid" ? "text-forest" : "text-amber-600"
                      }
                    >
                      {o.paymentStatus}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">
                    {o.customer.name} · {o.customer.phone}
                  </p>
                  <p className="text-xs text-muted">
                    {o.customer.address}, {o.customer.city}, {o.customer.state}{" "}
                    {o.customer.zip}
                  </p>
                </div>
                <p className="text-lg font-semibold text-accent">{formatINR(o.amountINR)}</p>
              </div>

              <ul className="mt-4 text-sm text-muted space-y-1 border-t border-border pt-3">
                {o.items.map((item, i) => (
                  <li key={i}>
                    {item.productName} ({item.variantLabel}) × {item.quantity} — ₹
                    {item.priceINR}
                  </li>
                ))}
              </ul>

              {o.paymentStatus === "paid" && (
                <div className="mt-4 pt-3 border-t border-border">
                  <SendToDtdcButton order={o} onSent={load} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
