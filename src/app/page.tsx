import { getAllProducts } from "@/lib/products-db";
import ShopGrid from "@/components/ShopGrid";

export default async function Home() {
  const products = await getAllProducts();
  return <ShopGrid initialProducts={products} showCombo />;
}
