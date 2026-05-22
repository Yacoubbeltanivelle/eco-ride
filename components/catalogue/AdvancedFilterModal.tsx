"use client";
import { useEffect } from "react";
import { X, RotateCcw, Check, Fuel, Settings2, Users, MapPin, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DualRangeSlider from "./DualRangeSlider";
import type { AdvancedFilters } from "./types";

const categoryOptions: { v: AdvancedFilters["category"]; l: string }[] = [
  { v: "", l: "Toutes" },
  { v: "berline", l: "Berline" },
  { v: "suv", l: "SUV" },
  { v: "citadine", l: "Citadine" },
  { v: "van", l: "Van" },
  { v: "electrique", l: "Électrique" },
  { v: "hybride", l: "Hybride" },
];

const transmissionOptions: { v: AdvancedFilters["transmission"]; l: string }[] = [
  { v: "", l: "Toutes" },
  { v: "automatique", l: "Automatique" },
  { v: "manuelle", l: "Manuelle" },
];

const seatsOptions = [
  { v: 0, l: "Tous" },
  { v: 2, l: "2+" },
  { v: 5, l: "5+" },
  { v: 7, l: "7+" },
];

const critairOptions: { v: AdvancedFilters["critair"]; l: string }[] = [
  { v: "", l: "Tous" },
  { v: "1", l: "Crit'Air 1" },
  { v: "2", l: "Crit'Air 2" },
  { v: "E", l: "Électrique" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  onChange: (f: AdvancedFilters) => void;
  onApply: () => void;
  resultCount: number;
}

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm" style={{ color: "var(--eco-green)" }}>{icon}</span>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
    </div>
  );
}

function ChipRow<T extends string | number>({
  options, value, onChange,
}: {
  options: readonly { v: T; l: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ v, l }) => {
        const active = value === v;
        return (
          <button
            key={String(v)}
            onClick={() => onChange(v)}
            className="px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-150 flex items-center gap-1.5"
            style={active
              ? { background: "var(--eco-green)", color: "white", borderColor: "var(--eco-green)" }
              : { background: "white", color: "#374151", borderColor: "#E5E7EB" }
            }
          >
            {active && <Check className="w-3 h-3" />}
            {l}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ label, sub, value, onChange }: { label: string; sub?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center justify-between w-full py-3 border-b border-gray-100 last:border-0"
    >
      <div className="text-left">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <div
        className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
        style={{ background: value ? "var(--eco-green)" : "#D1D5DB" }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
          style={{ left: value ? "calc(100% - 22px)" : "2px" }}
        />
      </div>
    </button>
  );
}

export default function AdvancedFilterModal({ open, onClose, filters, onChange, onApply, resultCount }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = <K extends keyof AdvancedFilters>(key: K, val: AdvancedFilters[K]) =>
    onChange({ ...filters, [key]: val });

  const activeCount = [
    filters.category,
    filters.transmission,
    filters.seats > 0,
    filters.critair,
    filters.vtc,
    filters.available,
    filters.priceMax < 1500,
    filters.kmMax < 250000,
    filters.yearMin > 2015,
  ].filter(Boolean).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel — bottom sheet on mobile, right drawer on desktop */}
          <motion.div
            key="panel"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col md:inset-y-0 md:right-0 md:left-auto md:w-[420px]"
            style={{
              maxHeight: "90dvh",
              background: "white",
              borderRadius: "24px 24px 0 0",
            }}
          >
            {/* Handle (mobile) */}
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                <h2 className="text-lg font-bold text-gray-900">Filtres avancés</h2>
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center"
                    style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}>
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">

              {/* Catégorie */}
              <div>
                <SectionTitle icon={<Car className="w-4 h-4" />} label="Catégorie" />
                <ChipRow
                  options={categoryOptions}
                  value={filters.category}
                  onChange={v => set("category", v)}
                />
              </div>

              {/* Transmission */}
              <div>
                <SectionTitle icon={<Settings2 className="w-4 h-4" />} label="Transmission" />
                <ChipRow
                  options={transmissionOptions}
                  value={filters.transmission}
                  onChange={v => set("transmission", v)}
                />
              </div>

              {/* Budget location (€/sem) */}
              <div>
                <SectionTitle icon={<Fuel className="w-4 h-4" />} label="Budget location (€ HT/sem)" />
                <DualRangeSlider
                  min={100}
                  max={1500}
                  step={50}
                  valueMin={filters.priceMin}
                  valueMax={filters.priceMax}
                  onChangeMin={v => set("priceMin", v)}
                  onChangeMax={v => set("priceMax", v)}
                  formatValue={v => `${v} €`}
                />
              </div>

              {/* Kilométrage max */}
              <div>
                <SectionTitle icon={<Fuel className="w-4 h-4" />} label="Kilométrage maximum" />
                <DualRangeSlider
                  min={0}
                  max={300000}
                  step={10000}
                  valueMin={0}
                  valueMax={filters.kmMax}
                  onChangeMin={() => {}}
                  onChangeMax={v => set("kmMax", v)}
                  formatValue={v => v >= 300000 ? "Illimité" : `${(v / 1000).toFixed(0)} 000 km`}
                />
              </div>

              {/* Année */}
              <div>
                <SectionTitle icon={<Car className="w-4 h-4" />} label="Année" />
                <DualRangeSlider
                  min={2010}
                  max={2025}
                  step={1}
                  valueMin={filters.yearMin}
                  valueMax={filters.yearMax}
                  onChangeMin={v => set("yearMin", v)}
                  onChangeMax={v => set("yearMax", v)}
                  formatValue={v => String(v)}
                />
              </div>

              {/* Places */}
              <div>
                <SectionTitle icon={<Users className="w-4 h-4" />} label="Nombre de places" />
                <ChipRow
                  options={seatsOptions}
                  value={filters.seats}
                  onChange={v => set("seats", v)}
                />
              </div>

              {/* Crit'Air */}
              <div>
                <SectionTitle icon={<MapPin className="w-4 h-4" />} label="Crit'Air" />
                <ChipRow
                  options={critairOptions}
                  value={filters.critair}
                  onChange={v => set("critair", v)}
                />
              </div>

              {/* Toggles */}
              <div>
                <SectionTitle icon={<Check className="w-4 h-4" />} label="Options" />
                <div className="bg-gray-50 rounded-2xl px-4">
                  <Toggle
                    label="Compatible VTC"
                    sub="Uber, Bolt, Heetch…"
                    value={filters.vtc}
                    onChange={v => set("vtc", v)}
                  />
                  <Toggle
                    label="Disponible maintenant"
                    sub="Uniquement les véhicules libres"
                    value={filters.available}
                    onChange={v => set("available", v)}
                  />
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => onChange({
                  category: "", transmission: "", seats: 0, critair: "",
                  priceMin: 100, priceMax: 1500, kmMax: 300000,
                  yearMin: 2010, yearMax: 2025,
                  vtc: false, available: false,
                })}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Réinitialiser
              </button>
              <button
                onClick={() => { onApply(); onClose(); }}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--eco-green)" }}
              >
                Voir {resultCount} véhicule{resultCount > 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
