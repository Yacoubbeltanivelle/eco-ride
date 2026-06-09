import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageCircle, ChevronRight, MapPin } from "lucide-react";
import { getFeaturedVehicles } from "@/lib/api/vehicles";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import VehicleCard from "@/components/vehicles/VehicleCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BentoServices from "@/components/ui/BentoServices";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import AnimatedSearchBar from "@/components/ui/AnimatedSearchBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import WhyEcoRide from "@/components/ui/WhyEcoRide";

export const metadata: Metadata = {
  title: "ECO RIDE — Location VTC, Vente Occasion & Mandataire | Neuilly-sur-Seine",
  description: "ECO RIDE à Neuilly-sur-Seine : louez un véhicule VTC, achetez occasion ou commandez en mandataire. Véhicules contrôlés, prix transparents, accompagnement personnalisé. Réponse sous 24h.",
  keywords: [
    "location VTC Neuilly-sur-Seine",
    "voiture occasion 92",
    "mandataire automobile Île-de-France",
    "location voiture pro Neuilly",
    "ECO RIDE",
    "VTC berline hybride",
  ],
  alternates: { canonical: "https://ecoride.pro" },
  openGraph: {
    title: "ECO RIDE — Location VTC, Vente Occasion & Mandataire | Neuilly-sur-Seine",
    description: "Véhicules professionnels en location VTC, vente occasion ou mandataire à Neuilly-sur-Seine. Contrôlés, prix clairs, accompagnement personnalisé.",
    url: "https://ecoride.pro",
    type: "website",
    images: [{
      url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      width: 1200,
      height: 630,
      alt: "ECO RIDE — Véhicules premium Neuilly-sur-Seine",
    }],
  },
};


export default async function HomePage() {
  const featured = await getFeaturedVehicles();

  return (
    <div style={{ background: "var(--eco-mint-bg)" }}>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-end overflow-hidden"
        style={{ background: "var(--eco-black)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=80"
            alt="Véhicule ECO RIDE"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,7,6,0.78) 0%, rgba(5,7,6,0.36) 48%, rgba(5,7,6,0.20) 100%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-16 pt-28">
          <div className="max-w-2xl">
            <ScrollReveal delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <MapPin size={12} style={{ color: "var(--eco-green-neon)", flexShrink: 0 }} />
                Neuilly-sur-Seine · Île-de-France
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5 text-balance">
                Achetez, louez<br />et importez<br />
                <span style={{ color: "var(--eco-green-neon)" }}>votre véhicule.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="max-w-xl text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
                <span className="block text-pretty">Une mobilité plus simple, plus fiable, plus responsable.</span>
                <span className="block mt-1 text-sm sm:text-base">
                  <span className="whitespace-nowrap">Véhicules contrôlés&nbsp;· Prix transparents</span>&nbsp;· Accompagnement personnalisé
                </span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <AnimatedSearchBar dark />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Link href="/catalogue"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white text-base transition-transform active:scale-95"
                  style={{ background: "var(--eco-green)" }}>
                  Voir les véhicules <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="https://wa.me/33667489562?text=Bonjour, je souhaite être recontacté par ECO RIDE."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white text-base border border-white/20 transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-px h-8 bg-white animate-bounce" />
        </div>
      </section>

      {/* ─── SERVICES BENTO ────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-black)" }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green-neon)" }}>
                Nos services
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Choisissez votre formule
              </h2>
              <p className="max-w-sm mx-auto text-gray-400 mt-2 text-balance sm:max-w-none">Achat&nbsp;· Location&nbsp;· Mandat&nbsp;· Tout ce dont vous avez besoin</p>
            </div>
          </ScrollReveal>
          <BentoServices />
        </div>
      </section>

      {/* ─── VÉHICULES EN VEDETTE ──────────────────────────────── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "var(--eco-green)" }}>
                Catalogue
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Véhicules disponibles</h2>
              <p className="max-w-sm text-gray-500 mt-1 text-pretty">Sélectionnés et contrôlés par notre équipe</p>
            </div>
            <Link href="/catalogue" className="hidden md:flex items-center gap-1 font-semibold text-sm hover:underline"
              style={{ color: "var(--eco-green)" }}>
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold"
            style={{ background: "var(--eco-green)" }}>
            Voir tout le catalogue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── PROCESSUS ─────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-ink)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green-neon)" }}>
              Comment ça marche
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-2 text-balance">Simple en 3 étapes</h2>
            <p className="text-gray-400 mb-10 text-balance">De la demande à la mise à disposition</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Choisissez", desc: "Parcourez notre catalogue et sélectionnez le véhicule adapté à votre besoin." },
              { n: "02", title: "Envoyez votre dossier", desc: "Transmettez vos documents. Après validation, vous recevez votre contrat sous 24h." },
              { n: "03", title: "Prenez le volant", desc: "Choisissez votre date de départ, et commencez à payer uniquement le jour du départ." },
            ].map(({ n, title, desc }, i) => (
              <ScrollReveal key={n} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-6 rounded-3xl h-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm mb-4"
                    style={{ background: "var(--eco-green)", color: "white" }}>
                    {n}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="max-w-[18rem] mx-auto text-gray-400 text-sm leading-relaxed text-pretty">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI ECO RIDE ─────────────────────────────────── */}
      <WhyEcoRide />

      {/* ─── TÉMOIGNAGES ───────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-mint-soft)" }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green)" }}>
                Témoignages
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Ils nous font confiance</h2>
              <p className="text-gray-500 mt-2 text-balance">Ce que disent nos clients</p>
            </div>
          </ScrollReveal>
          <TestimonialSlider items={testimonials} />
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green)" }}>
              FAQ
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">Questions fréquentes</h2>
            <p className="text-gray-500 mt-2 text-balance">Tout ce que vous devez savoir</p>
          </div>
        </ScrollReveal>
        <FAQAccordion items={faqs} />
        <div className="mt-8 text-center">
          <Link href="/demande"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold"
            style={{ background: "var(--eco-green)" }}>
            Poser une question <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: "var(--eco-green)" }}>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Prêt à démarrer ?</h2>
            <p className="max-w-md mx-auto text-white/80 mb-8 text-lg text-balance">Contactez-nous dès maintenant. Réponse sous 24h.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33667489562"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-transform active:scale-95"
                style={{ background: "white", color: "var(--eco-green)" }}>
                <Phone className="w-5 h-5" /> Appeler maintenant
              </a>
              <Link href="/demande"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-colors">
                Demande en ligne <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
