import HomeContent from "@/components/HomeContent";
import { getAllProducts } from "@/lib/products-db";
import { getAllCombos } from "@/lib/combos-db";
import { getSiteSettings } from "@/lib/site-settings-db";

export default async function Home() {
  const [all, combos, settings] = await Promise.all([
    getAllProducts(),
    getAllCombos(),
    getSiteSettings(),
  ]);
  const featured = all.filter((p) => p.featured && p.available).slice(0, 6);

  return (
    <HomeContent
      featured={featured}
      combos={combos.filter((c) => c.available !== false).slice(0, 4)}
      settings={settings}
    />
  );
}
