export const INR_TO_USD = 0.012;

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatUSD(amountINR: number): string {
  return `$${(amountINR * INR_TO_USD).toFixed(2)}`;
}
