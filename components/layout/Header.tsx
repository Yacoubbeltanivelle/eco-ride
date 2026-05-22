"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/location-vtc", label: "Location VTC" },
  { href: "/achat-occasion", label: "Achat Occasion" },
  { href: "/mandataire-auto", label: "Mandataire" },
  { href: "/simulateur", label: "Simulateur" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="ECO RIDE - Accueil">
          <Image
            src="/logo-full.png"
            alt="ECO RIDE"
            width={170}
            height={36}
            priority
            className="h-9 w-auto max-w-[170px] object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-emerald-600 transition-colors">{l.label}</Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+33100000000" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-emerald-600">
            <Phone className="w-4 h-4" />
            01 00 00 00 00
          </a>
          <Link href="/demande" className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: "var(--eco-green)" }}>
            Demande rapide
          </Link>
        </div>

        <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3"
          >
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-gray-800 border-b border-gray-50">
                {l.label}
              </Link>
            ))}
            <Link href="/demande" onClick={() => setOpen(false)}
              className="mt-2 text-center py-3 rounded-full font-semibold text-white"
              style={{ background: "var(--eco-green)" }}>
              Demande rapide
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
