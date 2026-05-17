import ProductListing from "@/components/ProductListing";

export const metadata = {
  title: "Veg Pickles",
  description: "Avakaya, Gongura, and vegetarian Telangana pickles from Lachava.",
};

export default function VegPicklesPage() {
  return (
    <ProductListing
      category="veg"
      title="Veg pickles"
      subtitle="Avakaya, Gongura, and more — stone-ground, sun-dried"
    />
  );
}
