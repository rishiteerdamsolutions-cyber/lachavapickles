"use client";

import { PickleProduct } from "@/types/product";
import PickleProductCard from "./PickleProductCard";
import { useCurrency } from "@/context/CurrencyContext";

export default function HomePrice({ product }: { product: PickleProduct }) {
  const { format } = useCurrency();
  return <PickleProductCard product={product} formatPrice={format} />;
}
