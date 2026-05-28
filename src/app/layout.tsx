import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND } from "@/data/brand";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const telugu = Noto_Sans_Telugu({
  weight: ["400", "500", "600", "700"],
  subsets: ["telugu"],
  variable: "--font-telugu",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#141110",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://lachava.vercel.app"
  ),
  title: {
    default: "Lachava | Telangana Pickles",
    template: "%s | Lachava",
  },
  description:
    "Handcrafted Telangana pickles — Avakaya, Gongura, prawn, chicken & more. No preservatives. Ships pan India.",
  icons: {
    icon: [
      { url: BRAND.favicon, sizes: "any" },
      { url: BRAND.faviconPng, type: "image/png", sizes: "512x512" },
    ],
    apple: BRAND.faviconPng,
  },
  openGraph: {
    title: "Lachava Telangana Pickles",
    description: "Ammamma Cheyyi Ruchi — Handcrafted in Nizamabad",
    type: "website",
    images: [{ url: BRAND.logo, width: 1200, height: 630, alt: "Lachava Telangana Pickles" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${jakarta.variable} ${telugu.variable}`}>
      <body className="antialiased bg-surface text-ink min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
