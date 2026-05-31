import { getNextDailyOrderSequence } from "@/lib/orders-db";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Month segment: first letter of the English month name + MM
 * Jan → J01, Feb → F02, Mar → M03, May → M05, Nov → N11, Dec → D12
 *
 * Full format: YY + monthCode + DD + NNNN
 * e.g. 26M05310001 = 2026 May 31, order #1
 */
export function monthCode(month: number): string {
  if (month < 1 || month > 12) throw new Error(`Invalid month: ${month}`);
  const letter = MONTH_NAMES[month - 1][0];
  return `${letter}${String(month).padStart(2, "0")}`;
}

export function formatLachavaOrderId(
  year: number,
  month: number,
  day: number,
  sequence: number
): string {
  const yy = String(year).slice(-2);
  const dd = String(day).padStart(2, "0");
  const seq = String(sequence).padStart(4, "0");
  return `${yy}${monthCode(month)}${dd}${seq}`;
}

export function orderIdDateParts(date: Date = new Date()): {
  year: number;
  month: number;
  day: number;
  dateKey: string;
} {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  const dateKey = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;

  return { year, month, day, dateKey };
}

export async function generateDisplayOrderId(): Promise<string> {
  const { year, month, day, dateKey } = orderIdDateParts();
  const sequence = await getNextDailyOrderSequence(dateKey);
  return formatLachavaOrderId(year, month, day, sequence);
}
