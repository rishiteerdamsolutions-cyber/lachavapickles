/** Demo checkout: Pay marks order paid without Razorpay. Set DEMO_PAYMENTS=false to disable. */
export function isDemoPaymentsEnabled(): boolean {
  if (process.env.DEMO_PAYMENTS === "false") return false;
  if (process.env.DEMO_PAYMENTS === "true") return true;
  if (process.env.NEXT_PUBLIC_DEMO_PAYMENTS === "true") return true;
  return (
    !process.env.RAZORPAY_KEY_SECRET?.trim() ||
    !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim()
  );
}
