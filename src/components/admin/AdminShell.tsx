"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
  Layers,
  Settings,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/combos", label: "Combos", icon: Layers },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-56 shrink-0 border-r border-border bg-ink text-surface flex flex-col">
        <div className="p-5 border-b border-surface/10">
          <p className="font-display text-xl">Lachava</p>
          <p className="text-xs text-surface/50 uppercase tracking-widest mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-accent text-white"
                  : "text-surface/70 hover:bg-surface/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="m-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-surface/60 hover:bg-surface/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
