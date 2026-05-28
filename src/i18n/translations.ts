export type Locale = "en" | "te";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  te: "తెలుగు",
};

type Messages = Record<string, { en: string; te: string }>;

export const messages: Messages = {
  "nav.veg": { en: "Veg", te: "వెజ్" },
  "nav.nonveg": { en: "Non-Veg", te: "నాన్-వెజ్" },
  "nav.combos": { en: "Combos", te: "కాంబోలు" },
  "nav.story": { en: "Story", te: "మా కథ" },
  "nav.contact": { en: "Contact", te: "సంప్రదించండి" },
  "nav.shop": { en: "Shop", te: "కొనండి" },
  "nav.shopPickles": { en: "Shop pickles", te: "పచ్చళ్ళు కొనండి" },
  "nav.cart": { en: "Cart", te: "బస్కెట్" },

  "hero.badge": { en: "Nizamabad · Telangana", te: "నిజామాబాద్ · తెలంగాణ" },
  "hero.title": {
    en: "Pickles made the way your ammamma still does",
    te: "మీ అమ్మమ్మ ఇంకా చేసే విధంగా పచ్చళ్ళు",
  },
  "hero.subtitle": {
    en: "Avakaya, Gongura, Royyala & more — stone-ground spices, cold-pressed sesame oil, zero shortcuts.",
    te: "అవకాయ, గోంగూర, రొయ్యల & మరిన్ని — రాతిలో రుద్దిన మసాలా, వేరుశనగ నూనె, ఎటువంటి షార్ట్‌కట్ లేదు.",
  },
  "hero.ctaVeg": { en: "Shop veg pickles", te: "వెజ్ పచ్చళ్ళు కొనండి" },
  "hero.ctaNonVeg": { en: "Non-veg range", te: "నాన్-వెజ్ రేంజ్" },

  "trust.homestyle": { en: "Homestyle recipes", te: "ఇంటి వంటకాలు" },
  "trust.noPreservatives": { en: "No artificial preservatives", te: "కృత్రిమ పదార్థాలు లేవు" },
  "trust.sunDried": { en: "Sun-dried spices", te: "ఎండబెట్టిన మసాలా" },
  "trust.stoneGround": { en: "Stone-ground masala", te: "రాతిలో రుద్దిన మసాలా" },
  "trust.shipping": { en: "Pan-India shipping", te: "భారతదేశం మొత్తం డెలివరీ" },
  "trust.fssai": { en: "FSSAI certified", te: "FSSAI సర్టిఫైడ్" },

  "home.storyTitle": { en: "Maa intlo puttina ruchi", te: "మా ఇంట్లో పుట్టిన రుచి" },
  "home.storySubtitle": { en: "Born in our kitchen", te: "మా వంటగదిలో పుట్టింది" },
  "home.featured": { en: "Featured pickles", te: "ప్రధాన పచ్చళ్ళు" },
  "home.viewAll": { en: "View all", te: "అన్నీ చూడండి" },
  "home.combos": { en: "Combo packs", te: "కాంబో ప్యాక్‌లు" },
  "home.process": { en: "How we make it", te: "మేము ఎలా చేస్తాం" },

  "product.from": { en: "From", te: "నుండి" },
  "product.outOfStock": { en: "Out of stock", te: "స్టాక్ అయిపోయింది" },
  "product.addToCart": { en: "Add to cart", te: "బస్కెట్‌లో వేయండి" },
  "product.selectWeight": { en: "Choose size", te: "సైజ్ ఎంచుకోండి" },

  "cart.title": { en: "Your cart", te: "మీ బస్కెట్" },
  "cart.empty": { en: "Your cart is empty", te: "బస్కెట్ ఖాళీగా ఉంది" },
  "cart.checkout": { en: "Checkout", te: "ఆర్డర్ చేయండి" },
  "cart.continue": { en: "Continue shopping", te: "ఇంకా కొనండి" },
  "cart.total": { en: "Total", te: "మొత్తం" },

  "checkout.title": { en: "Checkout", te: "ఆర్డర్" },
  "checkout.placeOrder": { en: "Place order", te: "ఆర్డర్ పెట్టండి" },
  "checkout.demoNote": {
    en: "Demo mode — order is marked paid instantly (no Razorpay).",
    te: "డెమో మోడ్ — Razorpay లేకుండా ఆర్డర్ వెంటనే paid అవుతుంది.",
  },
  "checkout.liveNote": {
    en: "Secure payment via Razorpay.",
    te: "Razorpay ద్వారా సురక్షిత చెల్లింపు.",
  },

  "success.title": { en: "Order confirmed", te: "ఆర్డర్ నిర్ధారించబడింది" },
  "success.thanks": { en: "Thank you", te: "ధన్యవాదాలు" },

  "footer.rights": { en: "All rights reserved.", te: "అన్ని హక్కులు రిజర్వ్." },

  "listing.veg": { en: "Veg pickles", te: "వెజ్ పచ్చళ్ళు" },
  "listing.nonveg": { en: "Non-veg pickles", te: "నాన్-వెజ్ పచ్చళ్ళు" },
  "listing.vegSub": {
    en: "Avakaya, Gongura, and more — stone-ground, sun-dried",
    te: "అవకాయ, గోంగూర — రాతిలో రుద్దిన మసాలా",
  },
  "listing.nonvegSub": {
    en: "Prawn, chicken, fish — homestyle non-veg",
    te: "రొయ్యల, కోడి, చేప — ఇంటి వంట రుచి",
  },
  "listing.all": { en: "All products", te: "అన్ని ఉత్పత్తులు" },

  "admin.dashboard": { en: "Dashboard", te: "డాష్‌బోర్డ్" },
  "admin.orders": { en: "Orders", te: "ఆర్డర్‌లు" },
  "admin.products": { en: "Products", te: "ఉత్పత్తులు" },
  "admin.combos": { en: "Combos", te: "కాంబోలు" },
  "admin.settings": { en: "Site settings", te: "సైట్ సెట్టింగ్‌లు" },
};

export function t(key: string, locale: Locale): string {
  const entry = messages[key];
  if (!entry) return key;
  return entry[locale];
}
