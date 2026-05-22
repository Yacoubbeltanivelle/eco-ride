"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Sliders, GitCompareArrows, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/catalogue", icon: Car, label: "Catalogue" },
  { href: "/simulateur", icon: Sliders, label: "Simulateur" },
  { href: "/comparer", icon: GitCompareArrows, label: "Comparer" },
  { href: "/demande", icon: Phone, label: "Contact" },
];

export default function MobileBottomNav() {
  const path = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
      style={{
        background: "rgba(5,7,6,0.92)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="eco-nav-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "rgba(73,229,140,0.12)", border: "1px solid rgba(73,229,140,0.25)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors duration-200",
                  active ? "stroke-[2.5]" : "stroke-[1.75]"
                )}
                style={{ color: active ? "var(--eco-green-neon)" : "#6B7280" }}
              />
              <span
                className="text-[10px] font-medium relative z-10 transition-colors duration-200"
                style={{ color: active ? "var(--eco-green-neon)" : "#6B7280" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
