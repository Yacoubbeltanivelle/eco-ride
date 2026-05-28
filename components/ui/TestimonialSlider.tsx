"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types/offer";

interface Props {
  items: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialSlider({ items, autoPlay = true, interval = 5000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(c => (c + dir + items.length) % items.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  const item = items[current];

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
        >
          <div className="flex items-start gap-3 mb-4">
            <Quote className="w-8 h-8 shrink-0 opacity-20" style={{ color: "var(--eco-green)" }} />
            <div className="flex gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic text-pretty">
            &ldquo;{item.text}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
              style={{ background: "var(--eco-green)" }}
            >
              {item.nom.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{item.nom}</p>
              <p className="text-gray-500 text-xs">{item.role}</p>
              {item.vehicleUsed && (
                <p className="text-xs font-medium mt-0.5" style={{ color: "var(--eco-green)" }}>
                  {item.vehicleUsed}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        {/* Dots */}
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? "var(--eco-green-neon)" : "#D1D5DB",
              }}
            />
          ))}
        </div>
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:border-sky-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:border-sky-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
