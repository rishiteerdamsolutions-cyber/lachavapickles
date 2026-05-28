"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { OrderProvider } from "@/context/OrderContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <OrderProvider>{children}</OrderProvider>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
