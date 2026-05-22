import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Search,
  CheckCircle2,
  Star,
  Clock,
  Users,
  TrendingDown,
  Shield,
  FileText,
  Handshake,
  Zap,
  Building2,
} from "lucide-react";
import { faqs } from "@/data/faqs";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StickyMobileCTA from "@/components/mobile/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Mandataire Automobile — Votre Véhicule d'Occasion au Meilleur Prix | ECO RIDE",
  description:
    "ECO RIDE, mandataire automobile : commandez votre véhicule récent au meilleur prix. Toutes marques, transparence totale, accompagnement personnalisé.",
};

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Votre demande",
    desc: "Décrivez le véhicule souhaité : marque, modèle, motorisation, options, budget. Tout commence par un échange.",
  },
  {
    n: "02",
    icon: Users,
    title: "Recherche réseau",
    desc: "Nous identifions les meilleures opportunités auprès de nos partenaires importateurs et réseaux partenaires.",
  },
  {
    n: "03",
    icon: FileText,
    title: "Offre transparente",
    desc: "Vous recevez une proposition claire : prix TTC, délais, commission ECO RIDE. Zéro frais caché.",
  },
  {
    n: "04",
    icon: Zap,
    title: "Livraison clé en main",
    desc: "Nous gérons toutes les démarches. Vous récupérez votre véhicule prêt à rouler.",
  },
];

const advantages = [
  { icon: TrendingDown, label: "Prix sous le marché", desc: "Souvent inférieurs aux prix concession grâce à notre réseau d'importateurs." },
  { icon: Handshake, label: "Toutes marques", desc: "Citroën, Peugeot, Renault, Toyota, Tesla, Volkswagen et bien d'autres." },
  { icon: Shield, label: "Transparence totale", desc: "Notre commission est annoncée dès le départ. Aucun frais surprise." },
  { icon: Users, label: "Accompagnement A à Z", desc: "Un interlocuteur dédié du premier échange jusqu'à la remise des clés." },
  { icon: FileText, label: "Démarches gérées", desc: "Immatriculation, garanties, suivi du dossier : on s'occupe de tout." },
  { icon: Clock, label: "Délais optimisés", desc: "Notre réseau actif nous permet de raccourcir les délais de commande." },
];

const stats = [
  { value: "−15%", label: "en moyenne vs concession" },
  { value: "4 sem.", label: "délai moyen livraison" },
  { value: "100%", label: "transparence tarifaire" },
];

const mandataireTestimonial = {
  nom: "Marc D.",
  role: "Client mandataire",
  vehicleUsed: "Toyota Corolla Hybride",
  text: "ECO RIDE m'a trouvé une Toyota Corolla Hybride d'occasion à un prix inférieur à ce que j'avais trouvé en concession. Transparence totale sur les frais.",
  rating: 5,
};

export default function MandataireAutoPage() {
  return (
    <div style={{ background: "var(--eco-mint-bg)" }}>

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative px-4 pt-16 pb-12 overflow-hidden"
        style={{ background: "var(--eco-black)" }}
      >
        {/* Subtle green radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(20,121,189,0.28) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{
              background: "rgba(57,189,235,0.12)",
              color: "var(--eco-green-neon)",
              border: "1px solid rgba(57,189,235,0.25)",
            }}
          >
            <Search className="w-3 h-3" />
            Commande personnalisée
          </span>

          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]"
            style={{ color: "var(--eco-white)" }}
          >
            Votre véhicule d'occasion,{" "}
            <span style={{ color: "var(--eco-green-neon)" }}>au meilleur prix</span>
          </h1>

          <p
            className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            ECO RIDE recherche, négocie et commande le véhicule idéal pour vous — toutes
            marques, sans intermédiaire superflu, commission transparente dès le départ.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/demande?intent=mandataire"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
            >
              Faire une demande
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+33667489562"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "var(--eco-white)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <Phone className="w-4 h-4" />
              Nous appeler
            </a>
          </div>

          {/* Key stats */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="font-bold" style={{ color: "var(--eco-green-neon)" }}>
                  {value}
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--eco-green)" }}
          >
            Le processus
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: "var(--eco-ink)" }}
          >
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps — mobile: vertical stack, desktop: horizontal */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "var(--eco-mint-soft)" }}
          />

          {steps.map(({ n, icon: Icon, title, desc }) => (
            <div key={n} className="relative flex flex-col items-center text-center gap-3">
              {/* Step circle */}
              <div
                className="relative z-10 w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-sm"
                style={{ background: "var(--eco-white)", border: "1px solid var(--eco-mint-soft)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                <span
                  className="text-xs font-black tracking-wider"
                  style={{ color: "var(--eco-green-neon)" }}
                >
                  {n}
                </span>
              </div>
              <h3 className="font-bold text-sm" style={{ color: "var(--eco-ink)" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--eco-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ADVANTAGES ────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Pourquoi nous choisir
            </p>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Nos engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {advantages.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "var(--eco-white)",
                  border: "1px solid var(--eco-mint-soft)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--eco-mint-soft)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: "var(--eco-ink)" }}>
                  {label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--eco-muted)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-3xl p-7 flex flex-col gap-5"
            style={{
              background: "var(--eco-white)",
              border: "1px solid var(--eco-mint-soft)",
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: mandataireTestimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "var(--eco-green)" }} />
              ))}
            </div>

            <blockquote
              className="text-base leading-relaxed font-medium"
              style={{ color: "var(--eco-ink)" }}
            >
              &ldquo;{mandataireTestimonial.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
              >
                {mandataireTestimonial.nom[0]}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--eco-ink)" }}>
                  {mandataireTestimonial.nom}
                </p>
                <p className="text-xs" style={{ color: "var(--eco-muted)" }}>
                  {mandataireTestimonial.role} · {mandataireTestimonial.vehicleUsed}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--eco-green)" }}
          >
            Questions fréquentes
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: "var(--eco-ink)" }}
          >
            FAQ Mandataire
          </h2>
        </div>
        <FAQAccordion items={faqs} category="mandataire" />
      </section>

      {/* ─── VTC / PRO SPOTLIGHT ───────────────────────────────────── */}
      <section className="py-8 px-4 max-w-2xl mx-auto">
        <div
          className="rounded-3xl px-6 py-7 flex flex-col md:flex-row md:items-center gap-5"
          style={{ background: "var(--eco-black)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(57,189,235,0.12)" }}
          >
            <Building2 className="w-6 h-6" style={{ color: "var(--eco-green-neon)" }} />
          </div>
          <div className="flex-1">
            <p
              className="font-bold text-base mb-1"
              style={{ color: "var(--eco-white)" }}
            >
              Vous êtes chauffeur VTC ou professionnel ?
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              Recevez une proposition dédiée à votre activité en moins de 24h.
            </p>
          </div>
          <Link
            href="/demande?intent=mandataire&type=vtc"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
          >
            Demande pro <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 mt-4"
        style={{ background: "var(--eco-green)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "var(--eco-white)",
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Sans engagement
          </div>
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3"
            style={{ color: "var(--eco-white)" }}
          >
            Prêt à trouver votre véhicule ?
          </h2>
          <p
            className="text-sm mb-7 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Décrivez votre projet en 2 minutes. Nous vous répondons sous 24h avec une
            offre personnalisée et transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/demande?intent=mandataire"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-white)", color: "var(--eco-green)" }}
            >
              Faire une demande
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+33667489562"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "var(--eco-white)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Phone className="w-4 h-4" />
              Nous appeler
            </a>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────── */}
      <StickyMobileCTA />
    </div>
  );
}
