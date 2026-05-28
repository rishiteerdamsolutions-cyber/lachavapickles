import { isDemoPaymentsEnabled } from "@/lib/demo-payments";

export type PaymentMode = "demo" | "live";

export function getPaymentMode(): PaymentMode {
  return isDemoPaymentsEnabled() ? "demo" : "live";
}

export function getPaymentModeLabel(): { en: string; te: string } {
  if (getPaymentMode() === "demo") {
    return {
      en: "Demo — orders auto-marked paid (no Razorpay)",
      te: "డెమో — Razorpay లేకుండా ఆర్డర్‌లు paid అవుతాయి",
    };
  }
  return {
    en: "Live — Razorpay payments enabled",
    te: "లైవ్ — Razorpay చెల్లింపులు ఆన్",
  };
}
