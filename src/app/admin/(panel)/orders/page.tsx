"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminOrdersPanel from "@/components/admin/AdminOrdersPanel";

export default function AdminOrdersPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/admin/login");
      });
  }, [router]);

  return <AdminOrdersPanel />;
}
