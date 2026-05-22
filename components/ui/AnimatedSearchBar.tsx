"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

const suggestions = [
  "SUV hybride Paris",
  "Berline diesel < 25 000 €",
  "Location longue durée VTC",
  "Tesla Model 3",
  "Toyota Corolla",
  "Mandat vente rapide",
  "Véhicule électrique Île-de-France",
  "Mercedes Classe E",
];

interface Props {
  dark?: boolean;
}

export default function AnimatedSearchBar({ dark = false }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [suggIdx, setSuggIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    if (focused) return;
    const current = suggestions[suggIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setPlaceholder(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setPlaceholder(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, 30);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setSuggIdx(i => (i + 1) % suggestions.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, suggIdx, focused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/catalogue?q=${encodeURIComponent(query.trim())}`);
    else router.push("/catalogue");
  };

  const bg = dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.95)";
  const border = dark
    ? focused ? "1px solid rgba(73,229,140,0.6)" : "1px solid rgba(255,255,255,0.15)"
    : focused ? "1px solid var(--eco-green)" : "1px solid rgba(0,0,0,0.1)";
  const textColor = dark ? "#FFFFFF" : "var(--eco-ink)";
  const placeholderColor = dark ? "rgba(255,255,255,0.4)" : "#9CA3AF";

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <motion.div
        animate={{ boxShadow: focused ? (dark ? "0 0 0 3px rgba(73,229,140,0.15)" : "0 0 0 3px rgba(15,107,58,0.12)") : "none" }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
        style={{ background: bg, border, backdropFilter: "blur(20px)" }}
      >
        <Search className="w-5 h-5 shrink-0 transition-colors duration-200"
          style={{ color: focused ? "var(--eco-green-neon)" : placeholderColor }} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-sm font-medium"
          style={{ color: textColor }}
          placeholder={focused ? "Rechercher un véhicule…" : placeholder || "Rechercher…"}
        />
        <AnimatePresence>
          {(query.length > 0 || focused) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="submit"
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors"
              style={{ background: "var(--eco-green-neon)" }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: "var(--eco-black)" }} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  );
}
