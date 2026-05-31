"use client";

import { PickleProduct } from "@/types/product";
import PickleProductCard from "./PickleProductCard";

export default function HomePrice({ product }: { product: PickleProduct }) {
  return <PickleProductCard product={product} />;
}
