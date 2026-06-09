import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Bell } from "lucide-react";
import { getSiteSettings } from "@/lib/api/settings";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: `Blog${s.seo_title_suffix}`,
    description: `Actualités, conseils et guides automobiles par ${s.seo_site_name} — location VTC, achat occasion et mandataire à ${s.address_city}.`,
  };
}

export default async function BlogPage() {
  const s = await getSiteSettings();

  return (
    <div className="min-h-screen" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-32">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 hover:opacity-70 transition-opacity"
          style={{ color: "var(--eco-green)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--eco-mint-soft)", border: "1px solid rgba(15,107,58,0.12)" }}
          >
            <BookOpen className="w-7 h-7" style={{ color: "var(--eco-green)" }} />
          </div>
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: "var(--eco-black)" }}>
            Blog ECO RIDE
          </h1>
          <p className="text-lg text-gray-500 text-balance max-w-xl mx-auto">
            Conseils, actualités et guides pour les chauffeurs VTC, acquéreurs de véhicules premium et mandataires automobile.
          </p>
        </div>

        {/* Coming soon card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6"
            style={{ background: "rgba(245,158,11,0.10)", color: "#92400E" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            En cours de rédaction
          </span>
          <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--eco-black)" }}>
            Les premiers articles arrivent bientôt
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-balance max-w-md mx-auto">
            Guides VTC, comparatifs hybrides/électriques, conseils financement, actualités marché automobile à Neuilly-sur-Seine.
          </p>

          {/* Thèmes prévus */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-left">
            {[
              "🚗 Débuter en VTC",
              "⚡ Électrique vs Hybride",
              "📋 Mandataire : guide complet",
              "🔧 Entretien premium",
              "💰 Financement LOA",
              "📍 Neuilly & Île-de-France",
            ].map(theme => (
              <div
                key={theme}
                className="px-3 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "var(--eco-mint-bg)", color: "var(--eco-ink)" }}
              >
                {theme}
              </div>
            ))}
          </div>

          {/* CTA email */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--eco-mint-soft)", border: "1px solid rgba(15,107,58,0.10)" }}
          >
            <Bell className="w-5 h-5 mx-auto mb-2" style={{ color: "var(--eco-green)" }} />
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--eco-black)" }}>
              Être notifié à la publication
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Recevez les premiers articles directement par email.
            </p>
            <Link
              href={`mailto:${s.email_contact}?subject=Blog ECO RIDE — Je souhaite être notifié`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "var(--eco-green)" }}
            >
              M&apos;inscrire aux notifications
            </Link>
          </div>
        </div>

        {/* CTA retour catalogue */}
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">En attendant, découvrez nos véhicules disponibles</p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white"
            style={{ background: "var(--eco-green)" }}
          >
            Voir le catalogue
          </Link>
        </div>

      </div>
    </div>
  );
}
