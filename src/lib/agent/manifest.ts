import { readFile } from "fs/promises";
import path from "path";
import type { SiteManifest } from "@/types/site-manifest";

let cached: SiteManifest | null = null;

export async function loadSiteManifest(): Promise<SiteManifest> {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "public/manifest/site-manifest.json");
  const raw = await readFile(filePath, "utf-8");
  cached = JSON.parse(raw) as SiteManifest;
  return cached;
}
