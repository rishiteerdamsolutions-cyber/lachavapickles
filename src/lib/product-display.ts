import type { Locale } from "@/i18n/translations";
import type { PickleProduct } from "@/types/product";

export function productDisplayName(product: PickleProduct, locale: Locale): string {
  if (locale === "te" && product.nameTelugu?.trim()) return product.nameTelugu.trim();
  return product.name;
}

export function productDisplaySubtitle(product: PickleProduct, locale: Locale): string {
  if (locale === "te" && product.subtitleTelugu?.trim()) return product.subtitleTelugu.trim();
  return product.subtitle;
}

export function productDisplayDescription(product: PickleProduct, locale: Locale): string {
  if (locale === "te" && product.descriptionTelugu?.trim()) return product.descriptionTelugu.trim();
  return product.description;
}
