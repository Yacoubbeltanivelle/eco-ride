"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export default function VehicleGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [lightbox, setLightbox] = useState(false);

  const go = (d: 1 | -1) => {
    setDir(d);
    setCurrent(c => (c + d + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="relative rounded-3xl overflow-hidden h-64 md:h-[420px] bg-gray-100 group">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={`${alt} — photo ${current + 1}`}
                fill
                className="object-cover"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
            {current + 1} / {images.length}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          >
            <Expand className="w-4 h-4 text-white" />
          </button>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                className="relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  outline: i === current ? "2px solid var(--eco-green-neon)" : "2px solid transparent",
                  outlineOffset: "2px",
                  opacity: i === current ? 1 : 0.55,
                }}
              >
                <Image src={src} alt={`Vue ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            >
              <Image src={images[current]} alt={alt} fill className="object-cover" />
            </motion.div>
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xl font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
