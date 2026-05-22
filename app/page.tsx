import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageCircle, ChevronRight, ShieldCheck, Wrench, Clock, Star, MapPin } from "lucide-react";
import { getFeaturedVehicles } from "@/data/vehicles";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import VehicleCard from "@/components/vehicles/VehicleCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BentoServices from "@/components/ui/BentoServices";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import AnimatedSearchBar from "@/components/ui/AnimatedSearchBar";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "ECO RIDE — Location VTC, Vente Occasion & Mandataire | Neuilly-sur-Seine",
  description: "ECO RIDE : louez un véhicule professionnel, achetez occasion ou commandez en mandataire. Véhicules contrôlés, prix clairs, accompagnement personnalisé.",
};

const trustItems = [
  { icon: ShieldCheck, label: "Véhicules contrôlés", desc: "Révision et CT à jour" },
  { icon: Wrench,      label: "Entretien inclus",    desc: "Selon formule location" },
  { icon: Clock,       label: "Assistance 24/7",     desc: "Selon formule location" },
  { icon: Star,        label: "Avis clients",         desc: "5/5 sur nos prestations" },
];

export default function HomePage() {
  const featured = getFeaturedVehicles();

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
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,7,6,0.85) 0%, rgba(5,7,6,0.55) 50%, rgba(5,7,6,0.6) 100%)" }} />
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
                Location, vente<br />et mandataire<br />
                <span style={{ color: "var(--eco-green-neon)" }}>automobile.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Une mobilité plus simple, plus fiable, plus responsable.<br />
                Véhicules contrôlés · Prix transparents · Accompagnement personnalisé
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
                <a href="https://wa.me/33100000000?text=Bonjour, je souhaite être recontacté par ECO RIDE."
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
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green-neon)" }}>
                Nos services
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Choisissez votre formule
              </h2>
              <p className="text-gray-400 mt-2">Location · Vente · Mandataire — tout ce dont vous avez besoin</p>
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
              <p className="text-gray-500 mt-1">Sélectionnés et contrôlés par notre équipe</p>
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
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-2">Simple en 3 étapes</h2>
            <p className="text-gray-400 mb-10">De la demande à la mise à disposition</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Choisissez", desc: "Parcourez notre catalogue et sélectionnez le véhicule adapté à votre besoin." },
              { n: "02", title: "Envoyez votre dossier", desc: "Transmettez vos documents. On valide rapidement et on vous recontacte sous 24h." },
              { n: "03", title: "Prenez le volant", desc: "RDV fixé, contrat signé, vous roulez. On reste disponibles tout au long de votre contrat." },
            ].map(({ n, title, desc }, i) => (
              <ScrollReveal key={n} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-6 rounded-3xl h-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm mb-4"
                    style={{ background: "var(--eco-green)", color: "white" }}>
                    {n}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ──────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Pourquoi choisir ECO RIDE ?</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map(({ icon: Icon, label, desc }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-2 border border-gray-100 hover:shadow-md transition-shadow h-full">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--eco-mint-soft)" }}>
                  <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
                </div>
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ───────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--eco-mint-soft)" }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--eco-green)" }}>
                Témoignages
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Ils nous font confiance</h2>
              <p className="text-gray-500 mt-2">Ce que disent nos clients</p>
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
            <p className="text-gray-500 mt-2">Tout ce que vous devez savoir</p>
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
            <p className="text-white/80 mb-8 text-lg">Contactez-nous dès maintenant. Réponse sous 24h.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33100000000"
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
