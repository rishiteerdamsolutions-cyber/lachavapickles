"use client";

import { useState } from "react";
import { Order } from "@/lib/orders-db";
import { dtdcWhatsAppUrl } from "@/lib/dtdc-whatsapp";
import { Truck } from "lucide-react";

interface Props {
  order: Order;
  onSent?: () => void;
}

export default function SendToDtdcButton({ order, onSent }: Props) {
  const [loading, setLoading] = useState(false);
  const sent = !!order.dtdcSentAt;

  const handleMarkSent = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/orders/dtdc-sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });
      onSent?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={dtdcWhatsAppUrl(order)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-ink hover:border-accent/40 transition-colors"
      >
        <Truck className="h-3.5 w-3.5" />
        WhatsApp DTDC
      </a>
      {!sent && (
        <button
          type="button"
          onClick={handleMarkSent}
          disabled={loading}
          className="rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "…" : "Mark sent"}
        </button>
      )}
      {sent && (
        <span className="inline-flex items-center rounded-lg bg-forest-soft px-3 py-2 text-xs font-medium text-forest">
          DTDC sent
        </span>
      )}
    </div>
  );
}
