import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";

export const metadata: Metadata = {
  title: {
    default: "ECO RIDE — Location, Vente & Mandataire Automobile | Neuilly-sur-Seine",
    template: "%s | ECO RIDE",
  },
  description:
    "ECO RIDE : location de véhicules VTC, vente de voitures d'occasion et mandataire automobile à Neuilly-sur-Seine. Véhicules contrôlés, prix transparents, accompagnement personnalisé.",
  keywords: ["location VTC", "voiture occasion", "mandataire automobile", "Neuilly-sur-Seine", "location voiture pro"],
  authors: [{ name: "ECO RIDE" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "ECO RIDE",
    title: "ECO RIDE — Location, Vente & Mandataire Automobile",
    description: "Location de véhicules VTC, vente occasion et mandataire automobile à Neuilly-sur-Seine.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/brand/ecoride-icon-blue.svg", type: "image/svg+xml" }],
    shortcut: "/brand/ecoride-icon-blue.svg",
    apple: "/brand/ecoride-icon-blue.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1479BD" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <Header />
        <main className="min-h-screen pt-16 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
