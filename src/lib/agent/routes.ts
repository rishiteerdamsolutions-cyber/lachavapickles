import type { SiteManifest } from "@/types/site-manifest";

/** Paths with dynamic segments (e.g. `/products/[slug]`) are not valid router targets. */
export function routePathForId(manifest: SiteManifest, routeId: string): string | undefined {
  const path = manifest.routes.find((r) => r.route_id === routeId)?.path;
  if (!path || path.includes("[")) return undefined;
  return path;
}

export function fallbackPathForRoute(routeId: string): string | undefined {
  switch (routeId) {
    case "product_detail":
      return "/veg-pickles";
    default:
      return undefined;
  }
}
