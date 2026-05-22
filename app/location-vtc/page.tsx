import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  ArrowRight,
  CheckCircle2,
  Shield,
  Wrench,
  Headphones,
  FileText,
  Star,
  BadgeCheck,
  TrendingUp,
  Phone,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import { getVtcVehicles } from "@/data/vehicles";
import { faqs } from "@/data/faqs";
import VehicleCard from "@/components/vehicles/VehicleCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StickyMobileCTA from "@/components/mobile/StickyMobileCTA";

export const metadata: Metadata = {
  title: "Location de Véhicule VTC — Assurance & Entretien Inclus | ECO RIDE",
  description:
    "Louez un véhicule VTC professionnel chez ECO RIDE. Assurance, entretien et assistance inclus dès 269 €/semaine HT. Compatible Uber, Bolt. Neuilly-sur-Seine.",
};

// ── Static data ──────────────────────────────────────────────────────────────

const stats = [
  { value: "500+", label: "chauffeurs accompagnés" },
  { value: "4.9 / 5", label: "satisfaction moyenne" },
  { value: "dès 269 €", label: "HT / semaine" },
  { value: "48 h", label: "mise à disposition" },
];

const formules = [
  {
    title: "Hebdomadaire",
    from: "269 €",
    unit: "HT / semaine",
    desc: "Idéal pour démarrer. Minimum 1 semaine.",
    features: ["Assurance au tiers", "1 350 km inclus", "Assistance selon formule"],
    best: false,
  },
  {
    title: "Mensuelle",
    from: "920 €",
    unit: "HT / mois",
    desc: "Pour stabiliser votre activité avec un loyer mensuel.",
    features: ["Assurance au tiers", "5 400 km inclus", "Entretien inclus", "Assistance selon formule"],
    best: true,
  },
  {
    title: "Longue durée",
    from: "Sur devis",
    unit: "",
    desc: "Formule sur mesure pour les pros et entreprises.",
    features: ["Conditions personnalisées", "Flotte possible", "Accompagnement dédié"],
    best: false,
  },
];

const steps = [
  {
    n: "01",
    Icon: FileText,
    title: "Envoyez votre demande",
    desc: "Remplissez le formulaire en 2 minutes. Nous analysons votre dossier sous 24 h.",
  },
  {
    n: "02",
    Icon: ClipboardCheck,
    title: "Signature du contrat",
    desc: "Contrat clair, sans frais cachés. Caution et premier loyer à la signature.",
  },
  {
    n: "03",
    Icon: Car,
    title: "Prise en charge",
    desc: "Véhicule prêt et contrôlé sous 48 h. Activez vos courses immédiatement.",
  },
];

const avantages = [
  { Icon: Shield, title: "Assurance incluse", desc: "Couverture au tiers minimum sur toutes les formules" },
  { Icon: Wrench, title: "Entretien compris", desc: "Révisions et CT pris en charge selon formule" },
  { Icon: Headphones, title: "Assistance 24 / 7", desc: "En cas de panne, un relais est prévu" },
  { Icon: BadgeCheck, title: "Compatibilité plateformes", desc: "Véhicules homologués Uber, Bolt, Heetch" },
  { Icon: Zap, title: "Disponibilité rapide", desc: "Mise à disposition sous 48 h selon stock" },
  { Icon: TrendingUp, title: "Sans engagement long", desc: "Flexibilité hebdomadaire ou mensuelle" },
];

const temoignages = [
  {
    name: "Karim B.",
    role: "Chauffeur Uber — Paris 8e",
    rating: 5,
    text: "J'ai lancé mon activité VTC en moins d'une semaine. Le contrat était clair, le véhicule impeccable. Je recommande ECO RIDE sans hésitation.",
  },
  {
    name: "Fatou D.",
    role: "Chauffeur Bolt — Neuilly-sur-Seine",
    rating: 5,
    text: "Passage au mensuel après 2 semaines. L'entretien inclus m'enlève un vrai poids. Équipe réactive et professionnelle.",
  },
  {
    name: "Thomas M.",
    role: "Chauffeur indépendant — Levallois",
    rating: 5,
    text: "Dossier traité rapidement, véhicule disponible le lendemain. Rapport qualité-prix imbattable pour un VTC.",
  },
];

const docs = [
  "Permis de conduire valide (+2 ans)",
  "Pièce d'identité en cours de validité",
  "Justificatif de domicile (-3 mois)",
  "Carte VTC ou justificatif d'activité",
  "RIB",
  "KBIS si société",
];

const infos: { label: string; value: string }[] = [
  { label: "Caution", value: "1 200 € – 2 500 €" },
  { label: "Durée minimum", value: "1 semaine" },
  { label: "Km inclus / sem.", value: "1 350 km" },
  { label: "Mise à disposition", value: "Sous 48 h" },
  { label: "Plateformes", value: "Uber, Bolt, Heetch…" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LocationVtcPage() {
  const vtcVehicles = getVtcVehicles();

  return (
    <div style={{ background: "var(--eco-mint-bg)" }}>
      <StickyMobileCTA variant="location" />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{ background: "var(--eco-black)" }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(73,229,140,0.18), transparent)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(73,229,140,0.1)", color: "var(--eco-green-neon)" }}
          >
            <Car className="w-3.5 h-3.5" />
            Pour chauffeurs VTC et professionnels
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Votre véhicule VTC,
            <br />
            <span style={{ color: "var(--eco-green-neon)" }}>tout inclus.</span>
          </h1>

          <p
            className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Démarrez ou développez votre activité sans contrainte. Assurance, entretien et
            assistance inclus. Compatible avec toutes les plateformes.
          </p>

          {/* Platform chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {["Uber", "Bolt", "Heetch"].map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalogue?intent=rental&vtc=true"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
            >
              Voir les véhicules <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demande?intent=location"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white",
              }}
            >
              Faire une demande
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Stats bar ─────────────────────────────────────────────────── */}
      <section className="px-4 py-6" style={{ background: "var(--eco-black)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden"
            style={{
              background: "var(--eco-graphite)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-6 px-3 text-center"
              >
                <span
                  className="text-2xl md:text-3xl font-extrabold tabular-nums"
                  style={{ color: "var(--eco-green-neon)" }}
                >
                  {s.value}
                </span>
                <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark-to-mint transition */}
      <div
        aria-hidden
        style={{
          height: 48,
          background: "linear-gradient(to bottom, var(--eco-black), var(--eco-mint-bg))",
        }}
      />

      {/* ── 3. Formules ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Nos formules
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Choisissez votre rythme
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {formules.map((f) => (
              <div
                key={f.title}
                className="relative flex flex-col rounded-3xl p-6"
                style={{
                  background: "white",
                  border: f.best
                    ? "2px solid var(--eco-green-neon)"
                    : "1px solid var(--eco-mint-soft)",
                  boxShadow: f.best
                    ? "0 8px 40px rgba(73,229,140,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {f.best && (
                  <span
                    className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
                  >
                    Recommandé
                  </span>
                )}

                <h3
                  className="font-extrabold text-xl mb-1"
                  style={{ color: "var(--eco-ink)" }}
                >
                  {f.title}
                </h3>

                <p className="text-2xl font-extrabold mb-1" style={{ color: "var(--eco-green)" }}>
                  {f.from}
                  {f.unit && (
                    <span
                      className="text-sm font-normal ml-1"
                      style={{ color: "var(--eco-muted)" }}
                    >
                      {f.unit}
                    </span>
                  )}
                </p>

                <p className="text-sm mb-5" style={{ color: "var(--eco-muted)" }}>
                  {f.desc}
                </p>

                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {f.features.map((ft) => (
                    <li
                      key={ft}
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: "var(--eco-ink)" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--eco-green)" }}
                      />
                      {ft}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demande?intent=location"
                  className="text-center py-3.5 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 block cursor-pointer"
                  style={{
                    background: f.best ? "var(--eco-green)" : "var(--eco-mint-soft)",
                    color: f.best ? "white" : "var(--eco-green)",
                  }}
                >
                  Demander cette formule
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Comment ça marche ─────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-mint-soft)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Processus
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Comment ça marche
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map(({ n, Icon, title, desc }) => (
              <div
                key={n}
                className="rounded-3xl p-6 flex flex-col gap-4"
                style={{
                  background: "white",
                  border: "1px solid var(--eco-mint-soft)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0"
                    style={{ background: "var(--eco-green)", color: "white" }}
                  >
                    {n}
                  </span>
                  <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1.5"
                    style={{ color: "var(--eco-ink)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--eco-muted)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Avantages inclus ──────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Inclus dans chaque formule
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Ce qui est compris
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {avantages.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "white",
                  border: "1px solid var(--eco-mint-soft)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--eco-mint-soft)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--eco-ink)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--eco-muted)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Véhicules VTC ─────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-mint-soft)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--eco-green)" }}
              >
                Flotte disponible
              </p>
              <h2
                className="text-3xl font-extrabold"
                style={{ color: "var(--eco-ink)" }}
              >
                Véhicules VTC
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--eco-muted)" }}>
                Compatibles avec les principales plateformes VTC
              </p>
            </div>
            <Link
              href="/catalogue?intent=rental&vtc=true"
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-green)", color: "white" }}
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vtcVehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link
              href="/catalogue?intent=rental&vtc=true"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-green)", color: "white" }}
            >
              Voir tous les véhicules <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Éligibilité ───────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Dossier
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Conditions d'éligibilité
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Documents */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "white",
                border: "1px solid var(--eco-mint-soft)",
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: "var(--eco-ink)" }}>
                Documents demandés
              </h3>
              <ul className="flex flex-col gap-3">
                {docs.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: "var(--eco-ink)" }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: "var(--eco-green)" }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs mt-4" style={{ color: "var(--eco-muted)" }}>
                Liste indicative à confirmer selon votre profil.
              </p>
            </div>

            {/* Infos pratiques */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "white",
                border: "1px solid var(--eco-mint-soft)",
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: "var(--eco-ink)" }}>
                Informations pratiques
              </h3>
              <dl className="flex flex-col">
                {infos.map((info, i) => (
                  <div
                    key={info.label}
                    className="flex justify-between items-center py-3 text-sm"
                    style={{
                      borderBottom:
                        i < infos.length - 1 ? "1px solid var(--eco-mint-soft)" : "none",
                    }}
                  >
                    <dt style={{ color: "var(--eco-muted)" }}>{info.label}</dt>
                    <dd className="font-semibold" style={{ color: "var(--eco-ink)" }}>
                      {info.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs mt-4" style={{ color: "var(--eco-muted)" }}>
                Conditions indicatives. Confirmées à la signature du contrat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Témoignages ───────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-mint-soft)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Avis clients
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              Ce que disent nos chauffeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {temoignages.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl p-6 flex flex-col gap-4"
                style={{
                  background: "white",
                  border: "1px solid var(--eco-mint-soft)",
                }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: "var(--eco-green-neon)" }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--eco-ink)" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 pt-3"
                  style={{ borderTop: "1px solid var(--eco-mint-soft)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "var(--eco-mint-soft)",
                      color: "var(--eco-green)",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--eco-ink)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--eco-muted)" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--eco-green)" }}
            >
              Questions fréquentes
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--eco-ink)" }}
            >
              FAQ Location VTC
            </h2>
          </div>
          <FAQAccordion items={faqs} category="location" />
        </div>
      </section>

      {/* ── 10. CTA final ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{ background: "var(--eco-black)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 110%, rgba(73,229,140,0.12), transparent)",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Prêt à démarrer votre activité ?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Rejoignez les 500+ chauffeurs qui font confiance à ECO RIDE.
            Dossier traité sous 24 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/demande?intent=location"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
            >
              Faire une demande <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+33100000000"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white",
              }}
            >
              <Phone className="w-4 h-4" /> Nous appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
