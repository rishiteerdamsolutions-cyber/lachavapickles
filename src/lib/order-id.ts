export function generateDisplayOrderId(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const seq = Math.floor(1000 + Math.random() * 9000);
  return `LCH-${yy}${mm}${dd}-${seq}`;
}
