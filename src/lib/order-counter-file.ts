import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "order-counter.json");

type CounterStore = Record<string, number>;

export async function nextDailySequenceFromFile(dateKey: string): Promise<number> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });

  let store: CounterStore = {};
  try {
    store = JSON.parse(await fs.readFile(FILE, "utf-8")) as CounterStore;
  } catch {
    store = {};
  }

  const next = (store[dateKey] ?? 0) + 1;
  store[dateKey] = next;
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf-8");
  return next;
}
