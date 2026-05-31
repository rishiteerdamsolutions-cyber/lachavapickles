export function formatINRDecimal(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatINRDecimal(min);
  return `${formatINRDecimal(min)} – ${formatINRDecimal(max)}`;
}
