"use client";
import { ShieldCheck, Wrench, Headphones, Star, Calendar, Gauge, Smartphone, Shield, Euro, Car } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Véhicules contrôlés",
    desc: "Révision et CT à jour",
  },
  {
    icon: Wrench,
    title: "Entretien inclus",
    desc: "Selon formule location",
  },
  {
    icon: Headphones,
    title: "Assistance 24/7",
    desc: "Selon formule location",
  },
  {
    icon: Star,
    title: "Avis clients",
    desc: "5/5 sur nos prestations",
  },
  {
    icon: Calendar,
    title: "Choisissez la durée",
    desc: "De 1 mois à plusieurs mois",
  },
  {
    icon: Gauge,
    title: "Kilométrage sur-mesure",
    desc: "Personnalisez les kilomètres chaque mois",
  },
  {
    icon: Smartphone,
    title: "100% numérique",
    desc: "Réservation, contrat et suivi en ligne",
  },
  {
    icon: Shield,
    title: "Assurances incluse",
    desc: "Roulez l'esprit tranquille",
  },
  {
    icon: Euro,
    title: "Sans apport",
    desc: "Aucun paiement à l'avance",
  },
];

export default function WhyEcoRide() {
  return (
    <section className="py-16 px-4" style={{ background: "#EFF6FF" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Pourquoi choisir ECO RIDE ?
            </h2>
            <p className="mt-2 font-semibold" style={{ color: "var(--eco-blue)" }}>
              Les avantages de la location en toute sérénité
            </p>
          </div>
        </ScrollReveal>

        {/* 9 cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {advantages.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.05}>
              <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 border border-blue-100 hover:shadow-md transition-shadow h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "#DBEAFE" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#39BDEB" }} />
                </div>
                <p className="font-bold text-sm text-gray-900 leading-snug">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Banner bas */}
        <ScrollReveal delay={0.3}>
          <div
            className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-blue-100"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "#DBEAFE" }}
            >
              <Car className="w-6 h-6" style={{ color: "#39BDEB" }} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Entretien, taxes et assistance</p>
              <p className="text-xs text-gray-500 mt-0.5">Tout est inclus, pas de frais cachés</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
