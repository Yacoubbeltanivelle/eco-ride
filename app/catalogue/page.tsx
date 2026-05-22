"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { X, SlidersHorizontal, ChevronDown, Search, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/vehicles/VehicleCard";
import AdvancedFilterModal from "@/components/catalogue/AdvancedFilterModal";
import { defaultAdvancedFilters } from "@/components/catalogue/types";
import type { AdvancedFilters } from "@/components/catalogue/types";

type QuickFilters = {
  search: string;
  intent: "" | "rental" | "sale";
  fuel: "" | "essence" | "diesel" | "hybride" | "electrique";
};

const fuelChips = [
  { v: "" as const,           l: "Toutes" },
  { v: "electrique" as const, l: "⚡ Élec" },
  { v: "hybride" as const,    l: "🌿 Hybride" },
  { v: "diesel" as const,     l: "Diesel" },
  { v: "essence" as const,    l: "Essence" },
];

const intentChips = [
  { v: "" as const,       l: "Tous" },
  { v: "rental" as const, l: "Location" },
  { v: "sale" as const,   l: "Vente" },
];

const sortOptions = [
  { v: "recommandes", l: "Recommandés" },
  { v: "prix_asc",    l: "Prix croissant" },
  { v: "prix_desc",   l: "Prix décroissant" },
  { v: "annee",       l: "Plus récent" },
  { v: "km",          l: "Moins de km" },
];

function QuickChip<T extends string>({
  option, active, onClick,
}: { option: { v: T; l: string }; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 shrink-0 border"
      style={active
        ? { background: "var(--eco-green)", color: "white", borderColor: "var(--eco-green)" }
        : { background: "white", color: "#374151", borderColor: "#E5E7EB" }
      }
    >
      {option.l}
    </button>
  );
}

function CatalogueContent() {
  const params = useSearchParams();

  const [quick, setQuick] = useState<QuickFilters>({
    search: params.get("q") || "",
    intent: "",
    fuel: "",
  });
  const [advanced, setAdvanced] = useState<AdvancedFilters>(defaultAdvancedFilters);
  const [pendingAdvanced, setPendingAdvanced] = useState<AdvancedFilters>(defaultAdvancedFilters);
  const [sort, setSort] = useState("recommandes");
  const [showSort, setShowSort] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const q = params.get("q");
    if (q) setQuick(f => ({ ...f, search: q }));
  }, [params]);

  const filtered = useMemo(() => {
    let res = [...vehicles];

    // Quick filters
    if (quick.search) {
      const q = quick.search.toLowerCase();
      res = res.filter(v => `${v.brand} ${v.model} ${v.version}`.toLowerCase().includes(q));
    }
    if (quick.intent) res = res.filter(v => v.intent === quick.intent || v.intent === "both");
    if (quick.fuel)   res = res.filter(v => v.fuel === quick.fuel);

    // Advanced filters
    if (advanced.category)     res = res.filter(v => v.category === advanced.category);
    if (advanced.transmission) res = res.filter(v => v.transmission === advanced.transmission);
    if (advanced.seats > 0)    res = res.filter(v => v.seats >= advanced.seats);
    if (advanced.critair)      res = res.filter(v => v.critair === advanced.critair);
    if (advanced.vtc)          res = res.filter(v => v.isVtcCompatible);
    if (advanced.available)    res = res.filter(v => v.status === "available");
    if (advanced.kmMax < 300000) res = res.filter(v => v.mileageKm <= advanced.kmMax);
    res = res.filter(v => v.year >= advanced.yearMin && v.year <= advanced.yearMax);
    if (advanced.priceMax < 1500) {
      res = res.filter(v =>
        (v.rentalPriceWeeklyHt !== undefined && v.rentalPriceWeeklyHt >= advanced.priceMin && v.rentalPriceWeeklyHt <= advanced.priceMax)
        || v.rentalPriceWeeklyHt === undefined
      );
    }

    // Sort
    if (sort === "prix_asc")  res.sort((a, b) => (a.rentalPriceWeeklyHt ?? a.salePriceTtc ?? 0) - (b.rentalPriceWeeklyHt ?? b.salePriceTtc ?? 0));
    if (sort === "prix_desc") res.sort((a, b) => (b.rentalPriceWeeklyHt ?? b.salePriceTtc ?? 0) - (a.rentalPriceWeeklyHt ?? a.salePriceTtc ?? 0));
    if (sort === "annee")     res.sort((a, b) => b.year - a.year);
    if (sort === "km")        res.sort((a, b) => a.mileageKm - b.mileageKm);

    return res;
  }, [quick, advanced, sort]);

  // Count for the modal preview (uses pendingAdvanced)
  const previewCount = useMemo(() => {
    let res = [...vehicles];
    if (quick.search) {
      const q = quick.search.toLowerCase();
      res = res.filter(v => `${v.brand} ${v.model} ${v.version}`.toLowerCase().includes(q));
    }
    if (quick.intent) res = res.filter(v => v.intent === quick.intent || v.intent === "both");
    if (quick.fuel)   res = res.filter(v => v.fuel === quick.fuel);
    if (pendingAdvanced.category)     res = res.filter(v => v.category === pendingAdvanced.category);
    if (pendingAdvanced.transmission) res = res.filter(v => v.transmission === pendingAdvanced.transmission);
    if (pendingAdvanced.seats > 0)    res = res.filter(v => v.seats >= pendingAdvanced.seats);
    if (pendingAdvanced.vtc)          res = res.filter(v => v.isVtcCompatible);
    if (pendingAdvanced.available)    res = res.filter(v => v.status === "available");
    if (pendingAdvanced.kmMax < 300000) res = res.filter(v => v.mileageKm <= pendingAdvanced.kmMax);
    return res.length;
  }, [quick, pendingAdvanced]);

  const resetAll = () => {
    setQuick({ search: "", intent: "", fuel: "" });
    setAdvanced(defaultAdvancedFilters);
    setPendingAdvanced(defaultAdvancedFilters);
  };

  const advancedActiveCount = [
    advanced.category,
    advanced.transmission,
    advanced.seats > 0,
    advanced.critair,
    advanced.vtc,
    advanced.available,
    advanced.priceMax < 1500,
    advanced.kmMax < 250000,
    advanced.yearMin > 2015,
  ].filter(Boolean).length;

  const quickActiveCount = [quick.intent, quick.fuel, quick.search].filter(Boolean).length;
  const totalActive = advancedActiveCount + quickActiveCount;

  const currentSortLabel = sortOptions.find(s => s.v === sort)?.l ?? "Recommandés";

  return (
    <div className="min-h-screen" style={{ background: "var(--eco-mint-bg)" }}>
      {/* Sticky header */}
      <div
        className="sticky top-16 z-30 px-4 pt-4 pb-3"
        style={{ background: "var(--eco-mint-bg)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto space-y-3">

          {/* Row 1: Title + sort + view */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Catalogue</h1>
              <p className="text-gray-400 text-xs mt-0.5">
                {filtered.length} véhicule{filtered.length !== 1 ? "s" : ""}
                {totalActive > 0 && ` · ${totalActive} filtre${totalActive > 1 ? "s" : ""} actif${totalActive > 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className="p-2 transition-colors"
                  style={{ background: view === "grid" ? "var(--eco-green)" : "transparent", color: view === "grid" ? "white" : "#6B7280" }}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className="p-2 transition-colors"
                  style={{ background: view === "list" ? "var(--eco-green)" : "transparent", color: view === "list" ? "white" : "#6B7280" }}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort(s => !s)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <span className="hidden sm:inline">{currentSortLabel}</span>
                  <span className="sm:hidden">Trier</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showSort && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[180px]"
                    >
                      {sortOptions.map(({ v, l }) => (
                        <button
                          key={v}
                          onClick={() => { setSort(v); setShowSort(false); }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors font-medium flex items-center justify-between gap-3"
                          style={{ color: sort === v ? "var(--eco-green)" : "#374151" }}
                        >
                          {l}
                          {sort === v && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--eco-green)" }} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Row 2: Search + Advanced filter button */}
          <div className="flex gap-2">
            {/* Search bar */}
            <div
              className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border transition-all duration-200"
              style={{ borderColor: searchFocused ? "var(--eco-green)" : "#E5E7EB", boxShadow: searchFocused ? "0 0 0 3px rgba(20,121,189,0.08)" : "none" }}
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Berline diesel, Tesla, SUV hybride…"
                value={quick.search}
                onChange={e => setQuick(f => ({ ...f, search: e.target.value }))}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
              />
              {quick.search && (
                <button onClick={() => setQuick(f => ({ ...f, search: "" }))}>
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Advanced filter button */}
            <button
              onClick={() => { setPendingAdvanced(advanced); setShowModal(true); }}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm border transition-all duration-150 shrink-0"
              style={advancedActiveCount > 0
                ? { background: "var(--eco-green)", color: "white", borderColor: "var(--eco-green)" }
                : { background: "white", color: "#374151", borderColor: "#E5E7EB" }
              }
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
              {advancedActiveCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white"
                  style={{ background: "var(--eco-green-neon)", color: "var(--eco-black)" }}
                >
                  {advancedActiveCount}
                </span>
              )}
            </button>
          </div>

          {/* Row 3: Quick filter chips */}
          <div className="overflow-x-auto pb-0.5 -mx-4 px-4">
            <div className="flex gap-2 items-center min-w-max">
              {intentChips.map(o => (
                <QuickChip key={o.v} option={o} active={quick.intent === o.v} onClick={() => setQuick(f => ({ ...f, intent: o.v }))} />
              ))}
              <div className="w-px h-5 bg-gray-200 shrink-0" />
              {fuelChips.map(o => (
                <QuickChip key={o.v} option={o} active={quick.fuel === o.v} onClick={() => setQuick(f => ({ ...f, fuel: o.v }))} />
              ))}
              {totalActive > 0 && (
                <>
                  <div className="w-px h-5 bg-gray-200 shrink-0" />
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-red-500 bg-red-50 border border-red-100 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" /> Tout effacer
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active advanced filter badges */}
      <AnimatePresence>
        {advancedActiveCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-7xl mx-auto px-4 pt-3 overflow-x-auto"
          >
            <div className="flex gap-2 flex-wrap">
              {advanced.category && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  {advanced.category}
                  <button onClick={() => setAdvanced(f => ({ ...f, category: "" }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {advanced.transmission && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  {advanced.transmission}
                  <button onClick={() => setAdvanced(f => ({ ...f, transmission: "" }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {advanced.vtc && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  VTC ✓
                  <button onClick={() => setAdvanced(f => ({ ...f, vtc: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {advanced.available && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  Disponible
                  <button onClick={() => setAdvanced(f => ({ ...f, available: false }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {advanced.kmMax < 300000 && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  &lt; {(advanced.kmMax / 1000).toFixed(0)} 000 km
                  <button onClick={() => setAdvanced(f => ({ ...f, kmMax: 300000 }))}><X className="w-3 h-3" /></button>
                </span>
              )}
              {advanced.priceMax < 1500 && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                  {advanced.priceMin}–{advanced.priceMax} €/sem
                  <button onClick={() => setAdvanced(f => ({ ...f, priceMin: 100, priceMax: 1500 }))}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pt-5 pb-24">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Aucun véhicule trouvé</p>
            <p className="text-gray-500 text-sm mb-6">Essayez de modifier vos filtres</p>
            <button
              onClick={resetAll}
              className="px-5 py-2.5 rounded-full text-white font-semibold text-sm"
              style={{ background: "var(--eco-green)" }}
            >
              Voir tous les véhicules
            </button>
          </motion.div>
        ) : (
          <div className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
          }>
            {filtered.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} listView={view === "list"} />
            ))}
          </div>
        )}
      </div>

      {/* Advanced filter modal */}
      <AdvancedFilterModal
        open={showModal}
        onClose={() => setShowModal(false)}
        filters={pendingAdvanced}
        onChange={setPendingAdvanced}
        onApply={() => setAdvanced(pendingAdvanced)}
        resultCount={previewCount}
      />
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--eco-mint-bg)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--eco-green)" }} />
      </div>
    }>
      <CatalogueContent />
    </Suspense>
  );
}
