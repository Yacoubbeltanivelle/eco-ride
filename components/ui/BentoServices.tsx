"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, ShoppingCart, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import VtcPlatformMarks from "@/components/ui/VtcPlatformMarks";

const services = [
  {
    icon: Car,
    href: "/location-vtc",
    title: "Louer un véhicule",
    sub: "Pour professionnels et chauffeurs VTC / Taxi",
    desc: "Assurance, entretien et assistance inclus. Démarrez ou développez votre activité simplement.",
    features: ["Assurance incluse", "Entretien inclus", "7 000 km / mois minimum", "Dès 125 € HT / semaine"],
    cta: "Voir les véhicules",
    accent: "#49E58C",
    span: "lg:col-span-1",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259b4f61?w=800&q=70",
  },
  {
    icon: ShoppingCart,
    href: "/achat-occasion",
    badge: "Le plus demandé",
    title: "Acheter un véhicule",
    sub: "Occasions contrôlées et sélectionnées",
    desc: "Achetez en toute confiance un véhicule révisé, avec suivi et contrôle technique.",
    features: ["Révision à jour", "Contrôle technique validé", "2 clés", "Accompagnement"],
    cta: "Voir les véhicules",
    accent: "var(--eco-blue)",
    span: "lg:col-span-1",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=70",
  },
  {
    icon: Search,
    href: "/mandataire-auto",
    title: "Mandataire Auto",
    sub: "Votre véhicule d'occasion au meilleur prix",
    desc: "Commandez un véhicule récent au meilleur tarif. Nous négocions pour vous auprès des réseaux.",
    features: ["Toutes marques", "Meilleur prix", "Transparence totale", "Accompagnement"],
    cta: "Faire une demande",
    accent: "#C084FC",
    span: "lg:col-span-1",
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {services.map(({ icon: Icon, href, badge, title, sub, desc, features, cta, accent, span, image }, i) => (
        <motion.div
          key={href}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardVariants}
          className={`relative overflow-hidden rounded-3xl group ${span}`}
          style={{ background: "var(--eco-black)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Background photo */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-110 transition-transform duration-700"
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
