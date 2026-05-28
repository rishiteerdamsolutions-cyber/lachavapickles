"use client";

import ProductListing from "@/components/ProductListing";
import { useLanguage } from "@/context/LanguageContext";
import type { ProductCategory } from "@/types/product";

export default function ProductListingPage({ category }: { category: ProductCategory }) {
  const { t } = useLanguage();
  const title = category === "veg" ? t("listing.veg") : t("listing.nonveg");
  const subtitle = category === "veg" ? t("listing.vegSub") : t("listing.nonvegSub");

  return <ProductListing category={category} title={title} subtitle={subtitle} />;
}
