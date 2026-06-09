import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import { asset } from "@/lib/utils";
import { getSiteSettings } from "@/lib/api/settings";
import { SettingsProvider } from "@/lib/settings-context";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecoride.pro";

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: `${s.seo_site_name} — Location, Vente & Mandataire Automobile | ${s.address_city}`,
      template: `%s${s.seo_title_suffix}`,
    },
    description: s.seo_description,
    keywords: s.seo_keywords.split(",").map((k) => k.trim()),
    authors: [{ name: s.seo_site_name }],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: s.seo_site_name,
      title: `${s.seo_site_name} — Location, Vente & Mandataire Automobile`,
      description: s.seo_description,
      images: s.seo_og_image ? [{ url: s.seo_og_image }] : [],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: asset("/brand/ecoride-icon-blue.svg"), type: "image/svg+xml" }],
      shortcut: asset("/brand/ecoride-icon-blue.svg"),
      apple: asset("/brand/ecoride-icon-blue.png"),
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: s.seo_site_name,
    url: "https://ecoride.pro",
    telephone: s.phone,
    email: s.email_contact,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address_street,
      postalCode: s.address_zip,
      addressLocality: s.address_city,
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(s.latitude) || 48.8845,
      longitude: parseFloat(s.longitude) || 2.2754,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
    ],
    areaServed: [
      { "@type": "City", name: s.address_city },
      { "@type": "State", name: "Île-de-France" },
      { "@type": "City", name: "Paris" },
    ],
    priceRange: "€€",
    description: s.seo_description,
  };

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href={asset("/manifest.json")} />
        <meta name="theme-color" content="#1479BD" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <SettingsProvider value={s}>
          <Header />
          <main className="min-h-screen pt-14 sm:pt-16 pb-20 md:pb-0">{children}</main>
          <Footer settings={s} />
          <MobileBottomNav />
        </SettingsProvider>
      </body>
    </html>
  );
}
