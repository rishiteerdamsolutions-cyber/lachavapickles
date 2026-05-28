import ProductListingPage from "@/components/ProductListingPage";

export const metadata = {
  title: "Veg Pickles",
  description: "Avakaya, Gongura, and vegetarian Telangana pickles from Lachava.",
};

export default function VegPicklesPage() {
  return <ProductListingPage category="veg" />;
}
