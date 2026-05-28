"use client";

import { useState } from "react";
import type { Order } from "@/lib/orders-db";

export default function OrderAdminNotes({ order, onSaved }: { order: Order; onSaved: () => void }) {
  const [notes, setNotes] = useState(order.adminNotes ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/admin/orders/${order.orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNotes: notes }),
    });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <label className="block text-xs font-semibold text-muted uppercase">Admin notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Internal notes (not shown to customer)"
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
      />
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-2 text-xs font-semibold text-accent hover:underline disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save notes"}
      </button>
    </div>
  );
}
