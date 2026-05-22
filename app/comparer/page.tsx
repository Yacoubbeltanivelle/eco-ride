"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import {
  X,
  Plus,
  Check,
  Minus,
  Clock,
  CheckCircle2,
  Lock,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";
import { formatPrice, formatMileage, fuelLabels } from "@/lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────
type RowDef = {
  label: string;
  fn: (v: Vehicle) => string | null;
  kind?: "bool" | "status" | "price" | "default";
};
type Group = { label: string; rows: RowDef[] };

// ─── row groups ───────────────────────────────────────────────────────────────
const groups: Group[] = [
  {
    label: "Prix",
    rows: [
      {
        label: "Location / semaine",
        kind: "price",
        fn: (v) =>
          v.rentalPriceWeeklyHt
            ? `${formatPrice(v.rentalPriceWeeklyHt)} HT`
            : null,
      },
      {
        label: "Achat TTC",
        kind: "price",
        fn: (v) => (v.salePriceTtc ? formatPrice(v.salePriceTtc) : null),
      },
      {
        label: "Caution",
        kind: "price",
        fn: (v) => (v.depositAmount ? formatPrice(v.depositAmount) : null),
      },
    ],
  },
  {
    label: "Véhicule",
    rows: [
      { label: "Année", fn: (v) => `${v.year}` },
      { label: "Kilométrage", fn: (v) => formatMileage(v.mileageKm) },
      { label: "Énergie", fn: (v) => fuelLabels[v.fuel] ?? v.fuel },
      {
        label: "Boîte",
        fn: (v) =>
          v.transmission === "automatique" ? "Automatique" : "Manuelle",
      },
      {
        label: "Puissance",
        fn: (v) => (v.powerHp ? `${v.powerHp} ch` : null),
      },
      {
        label: "Émissions CO₂",
        fn: (v) => (v.co2 !== undefined ? `${v.co2} g/km` : null),
      },
    ],
  },
  {
    label: "Services",
    rows: [
      {
        label: "Km inclus / semaine",
        fn: (v) =>
          v.includedKmWeekly ? `${v.includedKmWeekly} km` : null,
      },
      {
        label: "VTC compatible",
        kind: "bool",
        fn: (v) => (v.isVtcCompatible ? "oui" : "non"),
      },
      {
        label: "Disponibilité",
        kind: "status",
        fn: (v) => v.status,
      },
    ],
  },
];

// ─── status helpers ───────────────────────────────────────────────────────────
const statusConfig = {
  available: {
    label: "Disponible",
    icon: CheckCircle2,
    color: "text-[#1479BD]",
  },
  reserved: {
    label: "Réservé",
    icon: Lock,
    color: "text-[#8A938E]",
  },
  coming_soon: {
    label: "Bientôt",
    icon: Clock,
    color: "text-[#8A938E]",
  },
} as const;

// ─── cell renderer ────────────────────────────────────────────────────────────
function CellValue({ row, vehicle }: { row: RowDef; vehicle: Vehicle }) {
  const raw = row.fn(vehicle);

  if (raw === null)
    return <span className="text-[#8A938E] text-sm">—</span>;

  if (row.kind === "bool") {
    const yes = raw === "oui";
    return (
      <span
        className={`inline-flex items-center gap-1 text-sm font-semibold ${
          yes ? "text-[#1479BD]" : "text-[#8A938E]"
        }`}
      >
        {yes ? (
          <Check className="w-4 h-4 stroke-[2.5]" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
        {yes ? "Oui" : "Non"}
      </span>
    );
  }

  if (row.kind === "status") {
    const key = raw as keyof typeof statusConfig;
    const cfg = statusConfig[key] ?? statusConfig.available;
    const Icon = cfg.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${cfg.color}`}
      >
        <Icon className="w-4 h-4" />
        {cfg.label}
      </span>
    );
  }

  if (row.kind === "price") {
    return (
      <span className="text-sm font-bold text-[#050706]">{raw}</span>
    );
  }

  return <span className="text-sm font-medium text-[#050706]">{raw}</span>;
}

// ─── main page ────────────────────────────────────────────────────────────────
export default function ComparerPage() {
  const [selected, setSelected] = useState<Vehicle[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const toggle = (v: Vehicle) => {
    if (selected.find((s) => s.id === v.id)) {
      setSelected((prev) => prev.filter((s) => s.id !== v.id));
    } else if (selected.length < 3) {
      setSelected((prev) => [...prev, v]);
    }
  };

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="pb-28"
      style={{ background: "var(--eco-mint-bg)" }}
    >
      {/* ── page header ─────────────────────────────────────────────────── */}
      <div className="px-4 pt-8 pb-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#1479BD] mb-2">
            ECO RIDE
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#050706] leading-tight">
            Comparateur
          </h1>
          <p className="text-[#8A938E] text-sm mt-1.5">
            Sélectionnez jusqu'à 3 véhicules pour les comparer côte à côte
          </p>
        </motion.div>
      </div>

      {/* ── vehicle selector ─────────────────────────────────────────────── */}
      <div className="px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#050706] uppercase tracking-wide">
            Véhicules disponibles
          </span>
          {selected.length > 0 && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "var(--eco-green-neon)",
                color: "var(--eco-black)",
              }}
            >
              {selected.length} / 3 sélectionné{selected.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {vehicles.map((v) => {
            const isSelected = !!selected.find((s) => s.id === v.id);
            const isDisabled = selected.length >= 3 && !isSelected;

            return (
              <motion.button
                key={v.id}
                onClick={() => toggle(v)}
                disabled={isDisabled}
                whileHover={isDisabled ? {} : { y: -2 }}
                whileTap={isDisabled ? {} : { scale: 0.97 }}
                className={`relative p-2.5 rounded-2xl border-2 text-left transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1479BD] ${
                  isSelected
                    ? "border-[#1479BD] bg-[#EBF5FB]"
                    : "border-[#CCE9F7] bg-white"
                } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {/* thumbnail */}
                <div className="relative h-14 rounded-xl overflow-hidden bg-[#CCE9F7] mb-2.5">
                  <Image
                    src={v.images[0]}
                    alt={`${v.brand} ${v.model}`}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>

                {/* info */}
                <p className="text-[11px] font-bold text-[#050706] leading-tight truncate">
                  {v.brand} {v.model}
                </p>
                <p className="text-[10px] text-[#8A938E] mt-0.5">{v.year}</p>

                {/* selected badge */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "var(--eco-green)" }}
                    >
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── comparison table ─────────────────────────────────────────────── */}
      <div className="px-4 max-w-7xl mx-auto mt-8" ref={tableRef}>
        <AnimatePresence mode="wait">
          {selected.length >= 2 ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-3xl overflow-hidden"
              style={{
                border: "1.5px solid var(--eco-mint-soft)",
                boxShadow: "0 2px 24px rgba(20,121,189,0.06)",
              }}
            >
              {/* scroll hint on mobile */}
              <div className="flex items-center justify-center gap-2 px-4 py-2.5 md:hidden"
                style={{ background: "var(--eco-mint-soft)" }}>
                <ArrowRight className="w-3.5 h-3.5 text-[#1479BD] rotate-180 flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1479BD] tracking-wide">
                  Faites glisser pour voir tout le tableau
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1479BD] flex-shrink-0" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px]">
                  {/* ── thead: vehicle photos + names ── */}
                  <thead>
                    <tr style={{ background: "var(--eco-black)" }}>
                      <th
                        className="text-left px-4 py-4 min-w-[110px]"
                        aria-label="Critère"
                      />

                      {selected.map((v) => (
                        <th
                          key={v.id}
                          className="px-4 py-4 min-w-[180px] align-top"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-left">
                              {/* thumbnail */}
                              <div className="relative w-full h-20 rounded-xl overflow-hidden bg-[#1B211F] mb-2.5">
                                <Image
                                  src={v.images[0]}
                                  alt={`${v.brand} ${v.model}`}
                                  fill
                                  className="object-cover opacity-90"
                                  sizes="200px"
                                />
                              </div>
                              <p className="font-bold text-white text-sm leading-tight">
                                {v.brand} {v.model}
                              </p>
                              <p className="text-[#8A938E] text-xs mt-0.5">
                                {v.year} · {fuelLabels[v.fuel] ?? v.fuel}
                              </p>
                            </div>

                            <button
                              onClick={() => toggle(v)}
                              aria-label={`Retirer ${v.brand} ${v.model}`}
                              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5 text-[#8A938E]" />
                            </button>
                          </div>
                        </th>
                      ))}

                      {/* add slot */}
                      {selected.length < 3 && (
                        <th className="px-4 py-4 min-w-[120px] align-middle">
                          <div className="flex flex-col items-center justify-center gap-1.5 h-full pt-4">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center"
                              style={{
                                border: "1.5px dashed rgba(255,255,255,0.2)",
                              }}
                            >
                              <Plus className="w-4 h-4 text-[#8A938E]" />
                            </div>
                            <p className="text-[10px] text-[#8A938E] font-medium">
                              Ajouter
                            </p>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>

                  {/* ── tbody: grouped rows ── */}
                  <tbody>
                    {groups.map((group, gi) => (
                      <Fragment key={gi}>
                        {/* group header */}
                        <tr style={{ background: "var(--eco-mint-soft)" }}>
                          <td
                            colSpan={selected.length + (selected.length < 3 ? 2 : 1)}
                            className="px-5 py-2"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1479BD]">
                              {group.label}
                            </span>
                          </td>
                        </tr>

                        {/* group rows */}
                        {group.rows.map((row, ri) => (
                          <tr
                            key={`${gi}-${ri}`}
                            className="border-b last:border-0"
                            style={{ borderColor: "var(--eco-mint-soft)" }}
                          >
                            <td className="px-4 py-3.5 text-xs font-medium text-[#8A938E] whitespace-nowrap">
                              {row.label}
                            </td>

                            {selected.map((v) => (
                              <td key={v.id} className="px-4 py-3.5">
                                <CellValue row={row} vehicle={v} />
                              </td>
                            ))}

                            {selected.length < 3 && <td />}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>

                  {/* ── tfoot: CTAs ── */}
                  <tfoot>
                    <tr style={{ background: "var(--eco-mint-bg)" }}>
                      <td className="px-5 py-4" />

                      {selected.map((v) => (
                        <td key={v.id} className="px-4 py-4">
                          <Link
                            href={`/demande?vehicule=${v.slug}`}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90 cursor-pointer"
                            style={{ background: "var(--eco-green)" }}
                          >
                            Demander
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      ))}

                      {selected.length < 3 && <td />}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-16 rounded-3xl text-center"
              style={{
                background: "white",
                border: "1.5px solid var(--eco-mint-soft)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "var(--eco-mint-soft)" }}
              >
                <ChevronDown className="w-6 h-6 text-[#1479BD]" />
              </div>
              <p className="text-[#050706] font-semibold text-base mb-1">
                Sélectionnez{" "}
                {selected.length === 1 ? "un autre véhicule" : "2 véhicules"}
              </p>
              <p className="text-[#8A938E] text-sm max-w-xs">
                {selected.length === 0
                  ? "Choisissez au moins 2 véhicules dans la liste ci-dessus pour lancer la comparaison."
                  : "Encore un ! Sélectionnez un second véhicule pour démarrer."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── sticky mobile CTA ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected.length === 1 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-20 left-0 right-0 z-40 px-4 md:hidden"
          >
            <div
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl"
              style={{
                background: "var(--eco-black)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#1B211F] flex-shrink-0">
                  <Image
                    src={selected[0].images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold truncate">
                    {selected[0].brand} {selected[0].model}
                  </p>
                  <p className="text-[#8A938E] text-[10px]">
                    Sélectionnez 1 autre véhicule
                  </p>
                </div>
              </div>

              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--eco-green-neon)" }}
              >
                <Check className="w-3.5 h-3.5 text-[#050706] stroke-[2.5]" />
              </div>
            </div>
          </motion.div>
        )}

        {selected.length >= 2 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-20 left-0 right-0 z-40 px-4 md:hidden"
          >
            <button
              onClick={scrollToTable}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm shadow-xl cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "var(--eco-green)" }}
            >
              Voir la comparaison
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
