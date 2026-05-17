"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminProductsPanel from "@/components/admin/AdminProductsPanel";

export default function AdminProductsPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/admin/login");
      });
  }, [router]);

  return <AdminProductsPanel />;
}
