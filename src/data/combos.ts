export interface ComboPack {
  id: string;
  name: string;
  nameTelugu?: string;
  description: string;
  descriptionTelugu?: string;
  items: string;
  itemsTelugu?: string;
  priceINR: number;
  originalPriceINR: number;
  available?: boolean;
  updatedAt?: string;
}

export const comboPacks: ComboPack[] = [
  {
    id: "telangana-starter",
    name: "Telangana Starter Pack",
    description: "3 bestsellers: Avakaya + Gongura + Tomato (250g each)",
    items: "Avakaya, Gongura, Tomato — 250g each",
    priceINR: 420,
    originalPriceINR: 480,
  },
  {
    id: "nonveg-lovers",
    name: "Non-Veg Lovers Pack",
    description: "Royyala + Kodi + Chepala (250g each)",
    items: "Royyala, Kodi, Chepala — 250g each",
    priceINR: 840,
    originalPriceINR: 920,
  },
  {
    id: "festival-box",
    name: "Grand Festival Box",
    description: "5 assorted pickles of your choice (250g each)",
    items: "Your choice of 5 pickles — 250g each",
    priceINR: 675,
    originalPriceINR: 750,
  },
  {
    id: "spice-warrior",
    name: "Spice Warrior Pack",
    description: "Gongura + Green Chilli + Kodi (all extra spicy)",
    items: "Gongura, Pachchi Mirapakaya, Kodi — 250g each",
    priceINR: 499,
    originalPriceINR: 560,
  },
];
