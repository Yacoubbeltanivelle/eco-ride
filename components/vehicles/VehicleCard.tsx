"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Gauge, Calendar, ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Vehicle } from "@/types/vehicle";
import { cn, fuelLabels, fuelColors, statusLabels, statusColors, formatPrice, formatMileage } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
  index?: number;
  listView?: boolean;
}

export default function VehicleCard({ vehicle, index = 0, listView = false }: Props) {
  const images = vehicle.images.slice(0, 3);
  const [imgIdx, setImgIdx] = useState(0);
  const [imgDir, setImgDir] = useState<1 | -1>(1);
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const nextImg = (e: React.MouseEvent) => { e.preventDefault(); setImgDir(1); setImgIdx(i => (i + 1) % images.length); };
  const prevImg = (e: React.MouseEvent) => { e.preventDefault(); setImgDir(-1); setImgIdx(i => (i - 1 + images.length) % images.length); };

  if (listView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex"
      >
        {/* Image */}
        <div className="relative w-40 sm:w-52 shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
            sizes="200px"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(0,0,0,0.08))" }} />
          {/* Status badge */}
          <span className={cn("absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm", statusColors[vehicle.status])}>
            {statusLabels[vehicle.status]}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{vehicle.brand}</p>
                <h3 className="font-bold text-gray-900 text-base leading-tight">{vehicle.model}</h3>
                {vehicle.version && <p className="text-xs text-gray-500 mt-0.5 truncate">{vehicle.version}</p>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", fuelColors[vehicle.fuel])}>
                  {fuelLabels[vehicle.fuel]}
                </span>
                <button
                  onClick={e => { e.preventDefault(); setLiked(l => !l); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 transition-colors"
                >
                  <Heart className={cn("w-3.5 h-3.5 transition-colors", liked ? "fill-red-500 text-red-500" : "text-gray-400")} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{vehicle.year}</span>
              <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{formatMileage(vehicle.mileageKm)}</span>
              {vehicle.powerHp && <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{vehicle.powerHp} ch</span>}
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vehicle.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              {vehicle.rentalPriceWeeklyHt && (
                <p className="font-bold text-base leading-none" style={{ color: "var(--eco-green)" }}>
                  {formatPrice(vehicle.rentalPriceWeeklyHt)} <span className="text-xs font-normal text-gray-400">HT/sem</span>
                </p>
              )}
              {vehicle.salePriceTtc && (
                <p className={cn("font-semibold leading-none", vehicle.rentalPriceWeeklyHt ? "text-gray-400 text-xs mt-0.5" : "text-gray-900 text-base")}>
                  {formatPrice(vehicle.salePriceTtc)} <span className="text-xs font-normal text-gray-400">TTC</span>
                </p>
              )}
            </div>
            <Link
              href={`/vehicules/${vehicle.slug}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-white transition-transform active:scale-95"
              style={{ background: "var(--eco-green)" }}
            >
              Voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (premium card)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
    >
      {/* Image zone */}
      <div className="relative h-52 overflow-hidden bg-gray-100 shrink-0">
        <AnimatePresence mode="popLayout" custom={imgDir}>
          <motion.div
            key={imgIdx}
            custom={imgDir}
            initial={{ opacity: 0, x: imgDir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: imgDir * -24 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0"
          >
            <Image
              src={images[imgIdx]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm", statusColors[vehicle.status])}>
            {statusLabels[vehicle.status]}
          </span>
          {vehicle.isVtcCompatible && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm" style={{ background: "var(--eco-green)" }}>
              VTC ✓
            </span>
          )}
        </div>

        {/* Eco badge */}
        {vehicle.isEcoHighlighted && (
          <div className="absolute top-3 right-10">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-sky-700 shadow backdrop-blur-sm">🌿 Éco</span>
          </div>
        )}

        {/* Like */}
        <button
          onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm transition-transform active:scale-90"
        >
          <Heart className={cn("w-4 h-4 transition-colors", liked ? "fill-red-500 text-red-500" : "text-gray-400")} />
        </button>

        {/* Nav arrows */}
        {images.length > 1 && (
          <AnimatePresence>
            {hovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === imgIdx ? 14 : 5, height: 5,
                  background: i === imgIdx ? "var(--eco-green-neon)" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}

        {/* Location bottom-left on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{vehicle.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{vehicle.brand}</p>
            <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{vehicle.model}</h3>
            {vehicle.version && <p className="text-xs text-gray-500 mt-0.5 truncate">{vehicle.version}</p>}
          </div>
          <span className={cn("shrink-0 px-2 py-1 rounded-full text-xs font-semibold", fuelColors[vehicle.fuel])}>
            {fuelLabels[vehicle.fuel]}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{vehicle.year}</span>
          <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{formatMileage(vehicle.mileageKm)}</span>
          {vehicle.powerHp && <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{vehicle.powerHp} ch</span>}
        </div>

        {/* Score bar (if available) */}
        {vehicle.score && (
          <div className="flex gap-1 mb-4">
            {(["economie", "confort", "vtc", "ecologie"] as const).map(k => (
              <div key={k} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(vehicle.score![k] / 5) * 100}%`,
                      background: vehicle.score![k] >= 4 ? "var(--eco-green-neon)" : vehicle.score![k] >= 3 ? "var(--eco-green)" : "#D1D5DB",
                    }}
                  />
                </div>
                <p className="text-[9px] text-gray-400 capitalize leading-none">{k}</p>
              </div>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            {vehicle.rentalPriceWeeklyHt && (
              <p className="font-bold text-lg leading-none" style={{ color: "var(--eco-green)" }}>
                {formatPrice(vehicle.rentalPriceWeeklyHt)}{" "}
                <span className="text-xs font-normal text-gray-400">HT/sem</span>
              </p>
            )}
            {vehicle.salePriceTtc && (
              <p className={cn("font-bold leading-none", vehicle.rentalPriceWeeklyHt ? "text-gray-400 text-sm mt-0.5" : "text-gray-900 text-lg")}>
                {formatPrice(vehicle.salePriceTtc)}{" "}
                <span className="text-xs font-normal text-gray-400">TTC</span>
              </p>
            )}
          </div>
          <Link
            href={`/vehicules/${vehicle.slug}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-transform active:scale-95 hover:opacity-90"
            style={{ background: "var(--eco-green)" }}
          >
            Voir <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
