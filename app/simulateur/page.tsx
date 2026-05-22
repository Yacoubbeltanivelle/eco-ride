"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight,
  Car, Briefcase, Users, User,
  TrendingDown, CreditCard, Award, ShoppingCart,
  Zap, Leaf, Gauge, RefreshCw,
  BarChart2, LayoutGrid, Star, Heart,
  Clock, CalendarDays, Calendar, Search,
  RotateCcw, CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";
import { formatPrice } from "@/lib/utils";

type Answers = {
  usage: string;
  budget: string;
  energie: string;
  besoin: string;
  urgence: string;
};

type Option = { v: string; l: string; sub: string; Icon: LucideIcon };
type Question = { key: keyof Answers; title: string; subtitle: string; options: Option[] };

const questions: Question[] = [
  {
    key: "usage",
    title: "Votre usage principal",
    subtitle: "Pour cibler les véhicules les plus adaptés",
    options: [
      { v: "vtc", l: "Chauffeur VTC", sub: "Homologué VTC", Icon: Car },
      { v: "pro", l: "Professionnel", sub: "Usage entreprise", Icon: Briefcase },
      { v: "famille", l: "Familial", sub: "Espace & confort", Icon: Users },
      { v: "perso", l: "Personnel", sub: "Quotidien", Icon: User },
    ],
  },
  {
    key: "budget",
    title: "Votre budget",
    subtitle: "Location hebdomadaire ou achat",
    options: [
      { v: "eco", l: "Économique", sub: "< 300 €/sem · < 20 k€", Icon: TrendingDown },
      { v: "moyen", l: "Intermédiaire", sub: "300–400 €/sem · 20–30 k€", Icon: CreditCard },
      { v: "premium", l: "Premium", sub: "> 400 €/sem · > 30 k€", Icon: Award },
      { v: "achat", l: "Achat uniquement", sub: "Je veux acheter", Icon: ShoppingCart },
    ],
  },
  {
    key: "energie",
    title: "Énergie préférée",
    subtitle: "Optimisez vos trajets et vos charges",
    options: [
      { v: "electrique", l: "Électrique", sub: "Crit'Air 0 — ZFE OK", Icon: Zap },
      { v: "hybride", l: "Hybride", sub: "Crit'Air 1 — Économique", Icon: Leaf },
      { v: "diesel", l: "Diesel", sub: "Crit'Air 2 — Longue distance", Icon: Gauge },
      { v: "indifferent", l: "Peu importe", sub: "Toutes énergies", Icon: RefreshCw },
    ],
  },
  {
    key: "besoin",
    title: "Votre priorité",
    subtitle: "Ce qui compte le plus dans votre choix",
    options: [
      { v: "economie", l: "Économie", sub: "Fiable & rentable", Icon: BarChart2 },
      { v: "confort", l: "Confort", sub: "Espace & équipements", Icon: LayoutGrid },
      { v: "image", l: "Prestige", sub: "Image & premium", Icon: Star },
      { v: "ecologie", l: "Écologie", sub: "Faible impact CO₂", Icon: Heart },
    ],
  },
  {
    key: "urgence",
    title: "Votre disponibilité",
    subtitle: "Quand souhaitez-vous prendre le volant ?",
    options: [
      { v: "now", l: "Sous 48 h", sub: "Disponible maintenant", Icon: Clock },
      { v: "semaine", l: "Cette semaine", sub: "Dans les 7 jours", Icon: CalendarDays },
      { v: "mois", l: "Ce mois-ci", sub: "Dans le mois", Icon: Calendar },
      { v: "plus", l: "Sans urgence", sub: "Je cherche encore", Icon: Search },
    ],
  },
];

function computeScore(vehicle: Vehicle, answers: Answers): number {
  let s = 0;
  if (answers.usage === "vtc" && vehicle.isVtcCompatible) s += 3;
  if (answers.energie === vehicle.fuel) s += 2;
  if (answers.energie === "indifferent") s += 1;
  if (answers.energie === "hybride" && (vehicle.fuel === "hybride" || vehicle.fuel === "electrique")) s += 1;
  if (answers.besoin === "economie" && vehicle.score && vehicle.score.economie >= 4) s += 2;
  if (answers.besoin === "confort" && vehicle.score && vehicle.score.confort >= 4) s += 2;
  if (answers.besoin === "ecologie" && (vehicle.fuel === "electrique" || vehicle.fuel === "hybride")) s += 2;
  if (answers.besoin === "image" && ["Mercedes", "BMW", "Audi", "Volvo"].includes(vehicle.brand)) s += 2;
  if (answers.urgence === "now" && vehicle.status === "available") s += 2;
  if (answers.budget === "eco" && vehicle.rentalPriceWeeklyHt && vehicle.rentalPriceWeeklyHt < 300) s += 1;
  if (answers.budget === "achat" && vehicle.intent !== "rental") s += 2;
  return s;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

// ─── Option card ──────────────────────────────────────────────────────────────

function OptionCard({
  v, l, sub, Icon, onSelect,
}: { v: string; l: string; sub: string; Icon: LucideIcon; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-start gap-3 p-4 rounded-3xl border-2 text-left cursor-pointer transition-all duration-200 active:scale-95 focus-visible:outline-2"
      style={{
        background: hovered ? "var(--eco-mint-soft)" : "white",
        borderColor: hovered ? "var(--eco-green)" : "rgba(0,0,0,0.07)",
        outlineColor: "var(--eco-green)",
      }}
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-200"
        style={{ background: hovered ? "rgba(20,121,189,0.12)" : "var(--eco-mint-soft)" }}
      >
        <Icon size={18} style={{ color: "var(--eco-green)" }} />
      </div>
      <div>
        <p className="font-bold text-sm leading-tight" style={{ color: "var(--eco-ink)" }}>{l}</p>
        <p className="text-xs mt-0.5 leading-snug" style={{ color: "var(--eco-muted)" }}>{sub}</p>
      </div>
    </button>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <motion.div
            animate={{
              scale: i === current ? 1.15 : 1,
              background: i <= current ? "var(--eco-green)" : "rgba(0,0,0,0.08)",
              color: i <= current ? "white" : "var(--eco-muted, #8A938E)",
            }}
            transition={{ duration: 0.25 }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          >
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </motion.div>
          {i < total - 1 && (
            <motion.div
              animate={{ background: i < current ? "var(--eco-green)" : "rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-1 h-0.5 mx-1.5"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({ vehicle: v, score, rank }: { vehicle: Vehicle; score: number; rank: number }) {
  const isTop = rank === 0;

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border-2 transition-shadow hover:shadow-md"
      style={{ borderColor: isTop ? "var(--eco-green)" : "rgba(0,0,0,0.06)" }}
    >
      {isTop && (
        <div
          className="px-5 py-2 text-xs font-bold tracking-wide flex items-center gap-1.5"
          style={{ background: "var(--eco-green)", color: "white" }}
        >
          <Star size={12} className="fill-white" />
          Meilleure correspondance
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank bubble */}
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 mt-0.5"
            style={{
              background: isTop ? "var(--eco-green)" : "var(--eco-mint-soft)",
              color: isTop ? "white" : "var(--eco-muted)",
            }}
          >
            {rank + 1}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--eco-muted)" }}
                >
                  {v.brand}
                </p>
                <h3 className="font-extrabold text-base leading-tight" style={{ color: "var(--eco-ink)" }}>
                  {v.model}
                </h3>
                {v.version && (
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--eco-muted)" }}>
                    {v.version}
                  </p>
                )}
              </div>
              {/* Match stars */}
              <div className="flex gap-0.5 shrink-0 pt-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    size={12}
                    style={{
                      fill: k < Math.min(score, 5) ? "var(--eco-green-neon)" : "transparent",
                      color: k < Math.min(score, 5) ? "var(--eco-green-neon)" : "rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Price tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {v.rentalPriceWeeklyHt && (
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
                >
                  {formatPrice(v.rentalPriceWeeklyHt)} HT/sem
                </span>
              )}
              {v.salePriceTtc && (
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(0,0,0,0.04)", color: "var(--eco-ink)" }}
                >
                  {formatPrice(v.salePriceTtc)} TTC
                </span>
              )}
              {v.isVtcCompatible && (
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
                >
                  VTC ✓
                </span>
              )}
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--eco-muted)" }}
              >
                {v.fuel}
              </span>
            </div>

            {/* Score bars */}
            {v.score && (
              <div className="flex gap-2 mb-4">
                {(["economie", "confort", "vtc", "ecologie"] as const).map((k) => (
                  <div key={k} className="flex-1">
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(v.score![k] / 5) * 100}%` }}
                        transition={{ duration: 0.6, delay: rank * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: v.score![k] >= 4 ? "var(--eco-green-neon)" : "var(--eco-green)",
                        }}
                      />
                    </div>
                    <p className="text-[9px] mt-0.5 capitalize" style={{ color: "var(--eco-muted)" }}>
                      {k}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex gap-2">
              <Link
                href={`/vehicules/${v.slug}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-opacity hover:opacity-90 active:scale-95"
                style={{ background: "var(--eco-green)" }}
              >
                Voir ce véhicule
                <ArrowRight size={14} />
              </Link>
              <Link
                href={`/demande?vehicule=${v.slug}`}
                className="px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer transition-colors hover:opacity-80"
                style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
              >
                Demander
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SimulateurPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    usage: "", budget: "", energie: "", besoin: "", urgence: "",
  });
  const [done, setDone] = useState(false);

  const currentQ = questions[step];

  const select = (v: string) => {
    const newAnswers = { ...answers, [currentQ.key]: v };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const reset = () => {
    setDir(1);
    setStep(0);
    setAnswers({ usage: "", budget: "", energie: "", besoin: "", urgence: "" });
    setDone(false);
  };

  const recommendations = done
    ? [...vehicles]
        .filter((v) => v.status !== "reserved")
        .map((v) => ({ vehicle: v, score: computeScore(v, answers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

  // ── Results ────────────────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="min-h-screen px-4 pt-10 pb-24" style={{ background: "var(--eco-mint-bg)" }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5"
              style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
            >
              <CheckCircle2 size={13} />
              Analyse personnalisée terminée
            </div>
            <h1 className="text-2xl font-extrabold mb-2" style={{ color: "var(--eco-ink)" }}>
              Vos recommandations
            </h1>
            <p className="text-sm" style={{ color: "var(--eco-muted)" }}>
              Sélection basée sur vos critères personnels
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {recommendations.map(({ vehicle, score }, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <ResultCard vehicle={vehicle} score={score} rank={i} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-60"
              style={{ color: "var(--eco-muted)" }}
            >
              <RotateCcw size={14} />
              Recommencer le simulateur
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Quiz ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen px-4 pt-8 pb-24 overscroll-contain"
      style={{ background: "var(--eco-mint-bg)" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-7">
          {step > 0 ? (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-opacity hover:opacity-60"
              style={{ color: "var(--eco-muted)" }}
            >
              <ArrowLeft size={16} />
              Retour
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--eco-muted)" }}>
            {step + 1} / {questions.length}
          </span>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator current={step} total={questions.length} />
        </div>

        {/* Question + options */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="mb-6">
              <h1 className="text-xl font-extrabold leading-tight mb-1" style={{ color: "var(--eco-ink)" }}>
                {currentQ.title}
              </h1>
              <p className="text-sm" style={{ color: "var(--eco-muted)" }}>
                {currentQ.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map(({ v, l, sub, Icon }) => (
                <OptionCard key={v} v={v} l={l} sub={sub} Icon={Icon} onSelect={() => select(v)} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
