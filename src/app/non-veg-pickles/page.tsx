import ProductListingPage from "@/components/ProductListingPage";

export const metadata = {
  title: "Non-Veg Pickles",
  description: "Prawn, chicken, and non-vegetarian Telangana pickles from Lachava.",
};

export default function NonVegPicklesPage() {
  return <ProductListingPage category="non-veg" />;
}
