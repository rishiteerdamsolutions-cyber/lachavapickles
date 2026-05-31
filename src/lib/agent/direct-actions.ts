import type { PickleProduct } from "@/types/product";
import { normalizeText } from "@/lib/agent/dom-perception";

type CartBridge = {
  addToCart: (
    item: {
      productId: string;
      productName: string;
      variantId: string;
      variantLabel: string;
      priceINR: number;
    },
    qty?: number
  ) => void;
};

function getCartBridge(): CartBridge {
  const bridge = (window as unknown as { __lachavaAgent?: CartBridge }).__lachavaAgent;
  if (!bridge?.addToCart) {
    throw new Error("Cart is not ready yet. Refresh the page and try again.");
  }
  return bridge;
}

async function fetchProduct(slug: string): Promise<PickleProduct> {
  const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error(`Product not found (${slug}).`);
  }
  const data = (await res.json()) as PickleProduct & { error?: string };
  if (!data || data.error || !data.weightOptions?.length) {
    throw new Error(`Product not found (${slug}).`);
  }
  return data;
}

function pickVariant(product: PickleProduct, weightLabel?: string | null) {
  if (weightLabel?.trim()) {
    const needle = normalizeText(weightLabel);
    const match = product.weightOptions.find(
      (w) =>
        normalizeText(w.id).includes(needle) || normalizeText(w.label).includes(needle)
    );
    if (match) return match;
  }
  return product.weightOptions[0];
}

export async function addProductToCartBySlug(
  slug: string,
  weightLabel?: string | null
): Promise<{ productName: string; variantLabel: string }> {
  const product = await fetchProduct(slug);
  const variant = pickVariant(product, weightLabel);
  const bridge = getCartBridge();

  bridge.addToCart(
    {
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      priceINR: variant.priceINR,
    },
    1
  );

  return { productName: product.name, variantLabel: variant.label };
}
