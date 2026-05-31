import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  return <ShopGrid showCombo showFilters />;
}
