import { getAllCombos } from "@/lib/combos-db";
import CombosListing from "@/components/CombosListing";

export default async function CombosPage() {
  const combos = await getAllCombos();
  return <CombosListing combos={combos.filter((c) => c.available !== false)} />;
}
