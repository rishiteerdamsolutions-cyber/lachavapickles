export interface BilingualText {
  en: string;
  te: string;
}

export interface SiteSettings {
  hero: {
    badge: BilingualText;
    title: BilingualText;
    subtitle: BilingualText;
    ctaVeg: BilingualText;
    ctaNonVeg: BilingualText;
  };
  story: {
    title: BilingualText;
    subtitle: BilingualText;
    body1: BilingualText;
    body2: BilingualText;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: BilingualText;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  announcement: BilingualText;
  updatedAt?: string;
}

export function pickText(text: BilingualText, locale: "en" | "te"): string {
  const value = locale === "te" ? text.te : text.en;
  return value.trim() || text.en;
}
