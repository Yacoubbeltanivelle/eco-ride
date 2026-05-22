"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Wrench,
  ClipboardCheck,
  Users,
  ChevronDown,
} from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { faqs } from "@/data/faqs";
import VehicleCard from "@/components/vehicles/VehicleCard";
import TrustBadges from "@/components/ui/TrustBadges";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types/offer";

const engagements = [
  {
    icon: Wrench,
    number: "01",
    title: "Révision complète",
    desc: "Chaque véhicule est révisé avant la vente. Fluides, freins, pneumatiques et 80 points de contrôle vérifiés systématiquement.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Contrôle technique",
    desc: "Contrôle technique valide sur chaque véhicule. Vous roulez sereinement dès la prise en charge, sans démarche supplémentaire.",
  },
  {
    icon: Users,
    number: "03",
    title: "Accompagnement dédié",
    desc: "Immatriculation, assurance, financement : nous vous guidons dans chaque démarche jusqu'à la remise des clés.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AchatOccasionPage() {
  const saleVehicles = vehicles.filter(
    (v) => v.intent === "sale" || v.intent === "both"
  );
  const faqAchat = faqs.filter(
    (f) => f.category === "achat" || f.category === "general"
  );

  return (
    <div style={{ background: "var(--eco-mint-bg)" }} className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{ background: "var(--eco-black)" }}
      >
        {/* Subtle green glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--eco-green)" }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide uppercase"
            style={{
              background: "rgba(73,229,140,0.12)",
              color: "var(--eco-green-neon)",
              border: "1px solid rgba(73,229,140,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--eco-green-neon)" }} />
            Véhicules contrôlés — Neuilly-sur-Seine
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5"
          >
            Achat occasion<br />
            <span style={{ color: "var(--eco-green-neon)" }}>en toute confiance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Chaque véhicule vendu par ECO RIDE est révisé, contrôlé et livré avec
            son carnet de suivi. Prix transparents. 2 clés remises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/catalogue?intent=sale"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white transition-opacity hover:opacity-90 active:scale-95"
              style={{ background: "var(--eco-green)" }}
            >
              Voir les véhicules à vendre
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demande?intent=achat"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-colors"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ──────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--eco-ink)" }}>
              Nos engagements
            </h2>
            <p className="text-sm" style={{ color: "var(--eco-muted)" }}>
              Ce qui différencie chaque véhicule ECO RIDE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagements.map(({ icon: Icon, number, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 border flex flex-col gap-4"
                style={{ borderColor: "var(--eco-mint-soft)" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--eco-mint-soft)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                  </div>
                  <span
                    className="text-3xl font-black leading-none"
                    style={{ color: "var(--eco-mint-soft)" }}
                  >
                    {number}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--eco-ink)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--eco-muted)" }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÉHICULES ────────────────────────────────────────────── */}
      <section className="py-4 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--eco-ink)" }}>
                Disponibles à la vente
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--eco-muted)" }}>
                {saleVehicles.length} véhicule{saleVehicles.length > 1 ? "s" : ""} en stock
              </p>
            </div>
            <Link
              href="/catalogue?intent=sale"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--eco-green)" }}
            >
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saleVehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/catalogue?intent=sale"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white"
              style={{ background: "var(--eco-green)" }}
            >
              Voir tout le catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────── */}
      <section className="py-8 px-4 border-y" style={{ borderColor: "var(--eco-mint-soft)" }}>
        <div className="max-w-5xl mx-auto">
          <TrustBadges />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-extrabold tracking-tight mb-2" style={{ color: "var(--eco-ink)" }}>
              Questions fréquentes
            </h2>
            <p className="text-sm" style={{ color: "var(--eco-muted)" }}>
              Tout ce que vous devez savoir avant d'acheter
            </p>
          </motion.div>
          <FAQInline items={faqAchat} />
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "var(--eco-black)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto text-center"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--eco-green-neon)" }}
          >
            Passons à l'action
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
            Un véhicule vous intéresse ?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Organisez une visite ou posez vos questions directement à notre équipe.
          </p>
          <Link
            href="/demande?intent=achat"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
          >
            Prendre contact <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/* ── FAQ inline ── */
function FAQInline({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border overflow-hidden cursor-pointer"
          style={{ borderColor: "var(--eco-mint-soft)" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 cursor-pointer"
          >
            <span className="font-medium text-sm" style={{ color: "var(--eco-ink)" }}>
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 shrink-0 transition-transform duration-200",
                open === i && "rotate-180"
              )}
              style={{ color: "var(--eco-muted)" }}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p
                  className="px-5 pb-4 text-sm leading-relaxed border-t"
                  style={{ color: "var(--eco-muted)", borderColor: "var(--eco-mint-soft)" }}
                >
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
