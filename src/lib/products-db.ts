import { promises as fs } from "fs";
import path from "path";
import { getDb } from "@/lib/mongodb";
import { defaultProducts } from "@/data/default-products";
import { PickleProduct } from "@/types/product";

const COLLECTION = "products";
const FILE_STORE = path.join(process.cwd(), "data", "products-store.json");

let memoryCache: PickleProduct[] | null = null;

async function readFileStore(): Promise<PickleProduct[]> {
  try {
    const raw = await fs.readFile(FILE_STORE, "utf-8");
    return JSON.parse(raw) as PickleProduct[];
  } catch {
    return [];
  }
}

async function writeFileStore(products: PickleProduct[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_STORE), { recursive: true });
  await fs.writeFile(FILE_STORE, JSON.stringify(products, null, 2), "utf-8");
  memoryCache = products;
}

async function seedIfEmpty(products: PickleProduct[]): Promise<PickleProduct[]> {
  if (products.length > 0) return products;
  const seeded = defaultProducts.map((p) => ({
    ...p,
    updatedAt: new Date().toISOString(),
  }));
  return seeded;
}

export async function getAllProducts(): Promise<PickleProduct[]> {
  if (memoryCache?.length) return memoryCache;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const col = db.collection(COLLECTION);
      let products = (await col
        .find({})
        .sort({ displayOrder: 1 })
        .toArray()) as unknown as PickleProduct[];
      if (products.length === 0) {
        const seeded = await seedIfEmpty([]);
        await col.insertMany(seeded);
        products = seeded;
      }
      memoryCache = products;
      return products;
    } catch (err) {
      console.error("MongoDB products fetch failed, using file store:", err);
    }
  }

  let products = await readFileStore();
  products = await seedIfEmpty(products);
  if (products.length && !(await fileExists())) {
    await writeFileStore(products);
  } else if (products.length) {
    const stored = await readFileStore();
    if (stored.length === 0) await writeFileStore(products);
    else products = stored;
  }
  memoryCache = products;
  return products;
}

async function fileExists(): Promise<boolean> {
  try {
    await fs.access(FILE_STORE);
    return true;
  } catch {
    return false;
  }
}

export async function saveAllProducts(products: PickleProduct[]): Promise<void> {
  const withTs = products.map((p) => ({
    ...p,
    updatedAt: new Date().toISOString(),
  }));
  memoryCache = withTs;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const col = db.collection(COLLECTION);
      await col.deleteMany({});
      if (withTs.length) await col.insertMany(withTs);
      return;
    } catch (err) {
      console.error("MongoDB products save failed, using file store:", err);
    }
  }

  await writeFileStore(withTs);
}

export async function upsertProduct(product: PickleProduct): Promise<PickleProduct> {
  const products = await getAllProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  const updated = { ...product, updatedAt: new Date().toISOString() };
  if (idx >= 0) products[idx] = updated;
  else products.push(updated);
  await saveAllProducts(products);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await saveAllProducts(filtered);
  return true;
}

export function invalidateProductsCache(): void {
  memoryCache = null;
}
