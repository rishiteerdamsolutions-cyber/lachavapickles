import ProductListing from "@/components/ProductListing";

export const metadata = {
  title: "Non-Veg Pickles",
  description: "Prawn, chicken, and non-vegetarian Telangana pickles from Lachava.",
};

export default function NonVegPicklesPage() {
  return (
    <ProductListing
      category="non-veg"
      title="Non-veg pickles"
      subtitle="Royyala, chicken & more — refrigerate after opening"
    />
  );
}
