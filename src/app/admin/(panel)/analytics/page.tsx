"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminAnalyticsPanel from "@/components/admin/AdminAnalyticsPanel";

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/admin/login");
        else setOk(true);
      });
  }, [router]);

  if (!ok) return <p className="p-8 text-muted">Loading…</p>;
  return <AdminAnalyticsPanel />;
}
