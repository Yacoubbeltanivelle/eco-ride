"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Car, ShoppingCart, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import VtcPlatformMarks from "@/components/ui/VtcPlatformMarks";
import { useSettings } from "@/lib/settings-context";

const ALL_SERVICES = [
  {
    icon: Car,
    href: "/location-vtc",
    feature: "feature_vtc" as const,
    title: "Louer un véhicule",
    sub: "Pour professionnels et chauffeurs VTC / Taxi",
    desc: "Assurance, entretien et assistance inclus. Démarrez ou développez votre activité simplement.",
    features: ["Assurance incluse", "Entretien inclus", "7 000 km / mois minimum", "Dès 125 € HT / semaine"],
    cta: "Voir les véhicules",
    accent: "#49E58C",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  },
  {
    icon: ShoppingCart,
    href: "/achat-occasion",
    feature: "feature_occasion" as const,
    badge: "Le plus demandé",
    title: "Acheter un véhicule",
    sub: "Occasions contrôlées et sélectionnées",
    desc: "Achetez en toute confiance un véhicule révisé, avec suivi et contrôle technique.",
    features: ["Révision à jour", "Contrôle technique validé", "2 clés", "Accompagnement"],
    cta: "Voir les véhicules",
    accent: "var(--eco-blue)",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=70",
  },
  {
    icon: Search,
    href: "/mandataire-auto",
    feature: "feature_mandataire" as const,
    title: "Mandataire Auto",
    sub: "Votre véhicule d'occasion au meilleur prix",
    desc: "Commandez un véhicule récent au meilleur tarif. Nous négocions pour vous auprès des réseaux.",
    features: ["Toutes marques", "Meilleur prix", "Transparence totale", "Accompagnement"],
    cta: "Faire une demande",
    accent: "#C084FC",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=70",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function BentoServices() {
  const settings = useSettings();
  const services = ALL_SERVICES.filter(s => settings[s.feature] !== false);
  const colCount = services.length === 1 ? "lg:grid-cols-1" : services.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${colCount} gap-4`}>
      {services.map(({ icon: Icon, href, badge, title, sub, desc, features, cta, accent, image }, i) => (
        <motion.div
          key={href}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="relative overflow-hidden rounded-3xl group"
          style={{ background: "var(--eco-black)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Background photo */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,7,6,0.98) 40%, rgba(5,7,6,0.6) 100%)" }} />
          </div>

          <div className="relative z-10 p-6 flex flex-col h-full min-h-[280px]">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon className="w-5 h-5 text-white" />
            </div>

            <h3 className="font-extrabold text-xl text-white mb-1">{title}</h3>
            <p className="text-sm font-medium mb-2 text-pretty" style={{ color: accent }}>{sub}</p>
            {badge && (
              <span className="self-start px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: "rgba(73,229,140,0.15)", color: "var(--eco-green-neon)", border: "1px solid rgba(73,229,140,0.3)" }}>
                {badge}
              </span>
            )}
            <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 text-pretty">{desc}</p>

            {href === "/location-vtc" && (
              <VtcPlatformMarks compact className="mb-5" />
            )}

            <ul className="flex flex-col gap-1.5 mb-6">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-pretty">{f}</span>
                </li>
              ))}
            </ul>

            <Link href={href}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: accent, color: "var(--eco-black)" }}>
              {cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hover glow border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}40` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
