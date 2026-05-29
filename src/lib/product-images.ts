import type { PickleProduct } from "@/types/product";

/**
 * Static product photos in /public/products/{slug}.jpeg
 * Filenames match product slug for admin and deploy clarity.
 */
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  avakaya: "/products/avakaya.jpeg",
  "tomato-pickle": "/products/tomato-pickle.jpeg",
  "nimmakaya-pickle": "/products/nimmakaya-pickle.jpeg",
  "usirikaya-pickle": "/products/usirikaya-pickle.jpeg",
  "kakarakaya-pickle": "/products/kakarakaya-pickle.jpeg",
  "naatu-kodi-pickle": "/products/naatu-kodi-pickle.jpeg",
  "chepala-pickle": "/products/chepala-pickle.jpeg",
};

/** Original workspace filenames → product slug */
export const SOURCE_FILENAME_TO_SLUG: Record<string, string> = {
  "mango.jpeg": "avakaya",
  "tomato.jpeg": "tomato-pickle",
  "lemon.jpeg": "nimmakaya-pickle",
  "amla.jpeg": "usirikaya-pickle",
  "bitterguard.jpeg": "kakarakaya-pickle",
  "chicken.jpeg": "naatu-kodi-pickle",
  "fish.jpeg": "chepala-pickle",
};

export function getDefaultImageForSlug(slug: string): string {
  return PRODUCT_IMAGE_BY_SLUG[slug] ?? "";
}

export function resolveProductImage(product: PickleProduct): string | null {
  const path = product.imagePath?.trim() || getDefaultImageForSlug(product.slug);
  return path || null;
}

export function applyDefaultImages(products: PickleProduct[]): PickleProduct[] {
  return products.map((p) => {
    const imagePath = p.imagePath?.trim() || getDefaultImageForSlug(p.slug);
    return imagePath === p.imagePath ? p : { ...p, imagePath };
  });
}
