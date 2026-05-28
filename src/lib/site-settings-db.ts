import { promises as fs } from "fs";
import path from "path";
import { getDb } from "@/lib/mongodb";
import { defaultSiteSettings } from "@/data/default-site-settings";
import { SiteSettings } from "@/types/site-settings";

const COLLECTION = "site_settings";
const DOC_ID = "main";
const FILE_STORE = path.join(process.cwd(), "data", "site-settings.json");

let cache: SiteSettings | null = null;

async function readFile(): Promise<SiteSettings | null> {
  try {
    const raw = await fs.readFile(FILE_STORE, "utf-8");
    return JSON.parse(raw) as SiteSettings;
  } catch {
    return null;
  }
}

async function writeFile(settings: SiteSettings): Promise<void> {
  await fs.mkdir(path.dirname(FILE_STORE), { recursive: true });
  await fs.writeFile(FILE_STORE, JSON.stringify(settings, null, 2), "utf-8");
  cache = settings;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (cache) return cache;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      const doc = await db.collection(COLLECTION).findOne({ id: DOC_ID });
      if (doc) {
        const { id: _id, ...settings } = doc as unknown as { id: string } & SiteSettings;
        void _id;
        cache = settings as SiteSettings;
        return cache;
      }
    } catch (err) {
      console.error("MongoDB site settings fetch failed:", err);
    }
  }

  const fromFile = await readFile();
  if (fromFile) {
    cache = fromFile;
    return fromFile;
  }

  cache = { ...defaultSiteSettings, updatedAt: new Date().toISOString() };
  await writeFile(cache);
  return cache;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const next: SiteSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  cache = next;

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db
        .collection(COLLECTION)
        .updateOne({ id: DOC_ID }, { $set: { id: DOC_ID, ...next } }, { upsert: true });
      return next;
    } catch (err) {
      console.error("MongoDB site settings save failed:", err);
    }
  }

  await writeFile(next);
  return next;
}

export function invalidateSiteSettingsCache(): void {
  cache = null;
}
