import { promises as fs } from "fs";
import path from "path";
import { getDb } from "@/lib/mongodb";
import { comboPacks as defaultCombos } from "@/data/combos";
import type { ComboPack } from "@/data/combos";

const COLLECTION = "combos";
const FILE_STORE = path.join(process.cwd(), "data", "combos-store.json");

let cache: ComboPack[] | null = null;

async function readFile(): Promise<ComboPack[]> {
  try {
    const raw = await fs.readFile(FILE_STORE, "utf-8");
    return JSON.parse(raw) as ComboPack[];
  } catch {
    return [];
  }
}

async function writeFile(combos: ComboPack[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_STORE), { recursive: true });
  await fs.writeFile(FILE_STORE, JSON.stringify(combos, null, 2), "utf-8");
  cache = combos;
}

export async function getAllCombos(): Promise<ComboPack[]> {
  if (cache?.length) return cache;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      let combos = (await db.collection(COLLECTION).find({}).toArray()) as unknown as ComboPack[];
      if (combos.length === 0) {
        combos = defaultCombos.map((c) => ({ ...c, updatedAt: new Date().toISOString() }));
        await db.collection(COLLECTION).insertMany(combos);
      }
      cache = combos;
      return combos;
    } catch (err) {
      console.error("MongoDB combos fetch failed:", err);
    }
  }

  let combos = await readFile();
  if (combos.length === 0) {
    combos = defaultCombos;
    await writeFile(combos);
  }
  cache = combos;
  return combos;
}

export async function saveAllCombos(combos: ComboPack[]): Promise<void> {
  cache = combos;
  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const col = db.collection(COLLECTION);
      await col.deleteMany({});
      if (combos.length) await col.insertMany(combos);
      return;
    } catch (err) {
      console.error("MongoDB combos save failed:", err);
    }
  }
  await writeFile(combos);
}

export function invalidateCombosCache(): void {
  cache = null;
}
