import type { PickleProduct } from "@/types/product";
import { defaultProducts } from "@/data/default-products";

/** Built from default product catalog — /public/products/{slug}.jpg */
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = Object.fromEntries(
  defaultProducts
    .filter((p) => p.imagePath?.trim())
    .map((p) => [p.slug, p.imagePath.trim()])
);

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
