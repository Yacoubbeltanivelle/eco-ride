import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Phone, MessageCircle, Zap,
  Gauge, Calendar, Users, DoorOpen, Fuel, MapPin,
  FileText, ArrowRight, Settings2,
} from "lucide-react";
import { getVehicleBySlug, getSimilarVehicles, getAllVehicles } from "@/lib/api/vehicles";
import { getSiteSettings } from "@/lib/api/settings";
import VehicleScore from "@/components/vehicles/VehicleScore";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StickyMobileCTA from "@/components/mobile/StickyMobileCTA";
import { faqs } from "@/data/faqs";
import { formatPrice, formatMileage, fuelLabels, statusLabels, statusColors } from "@/lib/utils";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getAllVehicles();
  return all.map(v => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) return {};

  const canonicalUrl = `https://ecoride.pro/vehicules/${v.slug}`;
  const ogImage = v.images[0] ?? "https://ecoride.pro/og-default.jpg";

  return {
    title: v.seoTitle,
    description: v.seoDescription,
    keywords: [
      `${v.brand} ${v.model} ${v.year}`,
      v.intent === "rental" ? "location VTC" : "voiture occasion",
      "Neuilly-sur-Seine",
      "ECO RIDE",
      v.fuel,
      v.category,
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: v.seoTitle,
      description: v.seoDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${v.brand} ${v.model} ${v.year} — ECO RIDE` }],
    },
    robots: { index: v.status !== "sold", follow: true },
  };
}

/* ── Atomic section wrapper ─────────────────────────── */
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-3xl border border-gray-100 p-5", className)}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold mb-4" style={{ color: "var(--eco-black)" }}>
      {children}
    </h2>
  );
}

/* ── Spec chip ─────────────────────────────────────── */
function SpecChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 cursor-default"
      style={{ background: "var(--eco-mint-bg)" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "var(--eco-green)" }} />
      {label}
    </span>
  );
}

/* ── Intent badge ──────────────────────────────────── */
function IntentBadge({ intent }: { intent: string }) {
  const map: Record<string, { label: string; sub: string }> = {
    rental: { label: "Location", sub: "Ce véhicule est disponible à la location" },
    sale:   { label: "Vente",    sub: "Ce véhicule est disponible à la vente" },
    both:   { label: "Location & Vente", sub: "Ce véhicule est disponible en location ou à l'achat" },
  };
  const { label, sub } = map[intent] ?? map["both"];
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-2xl"
      style={{ background: "var(--eco-mint-soft)" }}>
      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "var(--eco-green)" }} />
      <div>
        <p className="text-sm font-bold" style={{ color: "var(--eco-green)" }}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

/* ── Sidebar CTA card (desktop only) ──────────────── */
function DesktopCTASidebar({
  slug, brand, model, intent, rentalPrice, rentalMonthly, salePrice,
}: {
  slug: string; brand: string; model: string; intent: string;
  rentalPrice?: number; rentalMonthly?: number; salePrice?: number;
}) {
  const waMessage = `Bonjour, je suis intéressé par : ${brand} ${model}. Pouvez-vous me recontacter ?`;
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
      {/* Price */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        {rentalPrice && (
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-extrabold" style={{ color: "var(--eco-green)" }}>
              {formatPrice(rentalPrice)}
            </span>
            <span className="text-sm text-gray-400">HT / semaine</span>
          </div>
        )}
        {rentalMonthly && (
          <p className="text-sm text-gray-400">{formatPrice(rentalMonthly)} HT / mois</p>
        )}
        {salePrice && (
          <div className={cn("flex items-baseline gap-1.5", rentalPrice ? "mt-2" : "")}>
            <span className={cn("font-extrabold", rentalPrice ? "text-base text-gray-500" : "text-3xl text-gray-900")}>
              {formatPrice(salePrice)}
            </span>
            <span className="text-sm text-gray-400">TTC</span>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <Link
          href={`/demande?vehicule=${slug}&marque=${encodeURIComponent(brand)}&modele=${encodeURIComponent(model)}&intent=${intent === "sale" ? "achat" : "location"}`}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--eco-green)" }}
        >
          Demander ce véhicule <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="tel:+33667489562"
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-colors hover:bg-gray-100"
          style={{ border: "1.5px solid var(--eco-black)", color: "var(--eco-black)", background: "white" }}
        >
          <Phone className="w-4 h-4" /> Appeler
        </a>
        <a
          href={`https://wa.me/33667489562?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--eco-black)" }}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      {/* Legal note */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Réponse sous 2h en moyenne · Sans engagement
      </p>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */
export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const [similar, settings] = await Promise.all([getSimilarVehicles(slug), getSiteSettings()]);
  const vehicleFaqs = faqs.filter(f => f.category === "location" || f.category === "documents").slice(0, 5);
  const price = vehicle.rentalPriceWeeklyHt
    ? `${formatPrice(vehicle.rentalPriceWeeklyHt)} HT/sem`
    : vehicle.salePriceTtc ? `${formatPrice(vehicle.salePriceTtc)} TTC` : undefined;
  const requiredDocuments = vehicle.requiredDocuments?.length
    ? vehicle.requiredDocuments
    : [
        "Permis de conduire valide",
        "Pièce d'identité",
        "Justificatif de domicile (- 3 mois)",
        "RIB bancaire",
        vehicle.isVtcCompatible ? "Carte VTC ou document d'activité" : null,
        "KBIS si société",
      ].filter(Boolean) as string[];

  const specs = [
    { icon: Calendar,  val: `${vehicle.year}` },
    { icon: Gauge,     val: formatMileage(vehicle.mileageKm) },
    vehicle.powerHp ? { icon: Zap, val: `${vehicle.powerHp} ch` } : null,
    { icon: Fuel,      val: fuelLabels[vehicle.fuel] },
    { icon: Settings2, val: vehicle.transmission === "automatique" ? "Automatique" : "Manuelle" },
    { icon: Users,     val: `${vehicle.seats} places` },
    { icon: DoorOpen,  val: `${vehicle.doors} portes` },
    vehicle.critair ? { icon: MapPin, val: `Crit'Air ${vehicle.critair}` } : null,
    vehicle.co2 !== undefined ? { icon: Fuel, val: vehicle.co2 === 0 ? "0 g CO₂" : `${vehicle.co2} g CO₂/km` } : null,
  ].filter(Boolean) as { icon: React.ElementType; val: string }[];

  const carJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vehicle.brand} ${vehicle.model}${vehicle.version ? ` ${vehicle.version}` : ""} ${vehicle.year}`,
    "brand": { "@type": "Brand", "name": vehicle.brand },
    "model": vehicle.model,
    "vehicleModelDate": vehicle.year,
    "color": vehicle.color ?? undefined,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileageKm,
      "unitCode": "KMT",
    },
    "fuelType": vehicle.fuel,
    "vehicleTransmission": vehicle.transmission,
    "driveWheelConfiguration": "FrontWheelDriveConfiguration",
    "seatingCapacity": vehicle.seats,
    "numberOfDoors": vehicle.doors,
    "image": vehicle.images,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": vehicle.salePriceTtc ?? vehicle.rentalPriceWeeklyHt ?? 0,
      "availability": vehicle.status === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "areaServed": "Neuilly-sur-Seine",
      "seller": {
        "@type": "AutomotiveBusiness",
        "name": "ECO RIDE",
        "telephone": "+33667489562",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Neuilly-sur-Seine",
          "postalCode": "92200",
          "addressCountry": "FR",
        },
      },
    },
  };

  return (
    <div style={{ background: "var(--eco-mint-bg)", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd).replace(/<\/script>/gi, "<\\/script>") }}
      />
      <StickyMobileCTA
        vehicleLabel={`${vehicle.brand} ${vehicle.model}`}
        price={price}
        demandeHref={`/demande?vehicule=${vehicle.slug}&marque=${encodeURIComponent(vehicle.brand)}&modele=${encodeURIComponent(vehicle.model)}&intent=${vehicle.intent === "sale" ? "achat" : "location"}`}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-32 md:pb-16">

        {/* Back */}
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 cursor-pointer transition-colors hover:opacity-70"
          style={{ color: "var(--eco-green)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT COLUMN ──────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Gallery */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden p-3">
              <VehicleGallery images={vehicle.images} alt={`${vehicle.brand} ${vehicle.model}`} />
            </div>

            {/* Hero info block */}
            <Section>
              {/* Status + intent row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={cn("px-3 py-1 rounded-full text-xs font-bold", statusColors[vehicle.status])}>
                  {statusLabels[vehicle.status]}
                </span>
                {vehicle.isVtcCompatible && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "var(--eco-green)" }}>
                    VTC Compatible
                  </span>
                )}
                {vehicle.isEcoHighlighted && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}>
                    Éco
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-1">
                {vehicle.brand}
              </p>
              <h1 className="text-3xl font-extrabold mb-1" style={{ color: "var(--eco-black)" }}>
                {vehicle.model}
              </h1>
              {vehicle.version && (
                <p className="text-sm text-gray-500 mb-4">{vehicle.version}</p>
              )}

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{vehicle.location}</span>
              </div>

              {/* Intent */}
              <IntentBadge intent={vehicle.intent} />

              {/* Price — mobile only (desktop = sidebar) */}
              <div className="mt-5 pt-5 border-t border-gray-100 lg:hidden">
                {vehicle.rentalPriceWeeklyHt && (
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-extrabold" style={{ color: "var(--eco-green)" }}>
                      {formatPrice(vehicle.rentalPriceWeeklyHt)}
                    </span>
                    <span className="text-sm text-gray-400">HT / semaine</span>
                  </div>
                )}
                {vehicle.rentalPriceMonthlyHt && (
                  <p className="text-sm text-gray-400">{formatPrice(vehicle.rentalPriceMonthlyHt)} HT / mois</p>
                )}
                {vehicle.salePriceTtc && (
                  <div className={cn("flex items-baseline gap-1.5", vehicle.rentalPriceWeeklyHt ? "mt-2" : "")}>
                    <span className={cn("font-extrabold", vehicle.rentalPriceWeeklyHt ? "text-base text-gray-500" : "text-3xl text-gray-900")}>
                      {formatPrice(vehicle.salePriceTtc)}
                    </span>
                    <span className="text-sm text-gray-400">TTC</span>
                  </div>
                )}
              </div>
            </Section>

            {/* Description */}
            {vehicle.description && (
              <Section>
                <SectionTitle>Description</SectionTitle>
                <p className="text-sm leading-7 text-gray-600">
                  {vehicle.description}
                </p>
              </Section>
            )}

            {/* Specs */}
            <Section>
              <SectionTitle>Caractéristiques</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {specs.map(({ icon, val }) => (
                  <SpecChip key={val} icon={icon} label={val} />
                ))}
              </div>
            </Section>

            {/* Score (mobile only — desktop is in sidebar) */}
            {vehicle.score && (
              <div className="lg:hidden">
                <VehicleScore score={vehicle.score} />
              </div>
            )}

            {/* Highlights */}
            {Array.isArray(vehicle.highlights) && vehicle.highlights.length > 0 && (
              <Section>
                <SectionTitle>Points forts</SectionTitle>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--eco-mint-soft)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--eco-green)" }} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Eligibility */}
            {Array.isArray(vehicle.eligibilityTags) && vehicle.eligibilityTags.length > 0 && (
              <Section>
                <SectionTitle>Éligibilités & usages</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {vehicle.eligibilityTags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: "var(--eco-mint-bg)", color: "var(--eco-green)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Services inclus */}
            {Array.isArray(vehicle.includedServices) && vehicle.includedServices.length > 0 && (
              <Section>
                <SectionTitle>Services inclus</SectionTitle>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.includedServices.map(s => (
                    <li key={s} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--eco-green)" }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Conditions de location */}
            {vehicle.intent !== "sale" && (vehicle.depositAmount || vehicle.includedKmWeekly || vehicle.rentalMinDuration || vehicle.availabilityNote) && (
              <Section>
                <SectionTitle>Conditions de location</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vehicle.depositAmount && (
                    <div className="flex flex-col gap-1 p-3 rounded-2xl" style={{ background: "var(--eco-mint-bg)" }}>
                      <span className="text-xs text-gray-400">Caution</span>
                      <span className="font-bold text-gray-900">{formatPrice(vehicle.depositAmount)}</span>
                    </div>
                  )}
                  {vehicle.includedKmWeekly && (
                    <div className="flex flex-col gap-1 p-3 rounded-2xl" style={{ background: "var(--eco-mint-bg)" }}>
                      <span className="text-xs text-gray-400">Km inclus</span>
                      <span className="font-bold text-gray-900">{vehicle.includedKmWeekly} km/sem</span>
                    </div>
                  )}
                  {vehicle.rentalMinDuration && (
                    <div className="flex flex-col gap-1 p-3 rounded-2xl" style={{ background: "var(--eco-mint-bg)" }}>
                      <span className="text-xs text-gray-400">Durée min.</span>
                      <span className="font-bold text-gray-900">{vehicle.rentalMinDuration}</span>
                    </div>
                  )}
                  {vehicle.availabilityNote && (
                    <div className="flex flex-col gap-1 p-3 rounded-2xl" style={{ background: "var(--eco-mint-bg)" }}>
                      <span className="text-xs text-gray-400">Disponibilité</span>
                      <span className="font-bold text-gray-900">{vehicle.availabilityNote}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  * Conditions indicatives. Détails confirmés à la signature du contrat.{" "}
                  <em>Placeholder à valider juridiquement.</em>
                </p>
              </Section>
            )}

            {/* Documents nécessaires */}
            <Section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4" style={{ color: "var(--eco-green)" }} />
                <SectionTitle>Documents nécessaires</SectionTitle>
              </div>
              <ul className="flex flex-col gap-2.5">
                {requiredDocuments.map(d => (
                  <li key={d} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--eco-mint-soft)" }}
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: "var(--eco-green)" }} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-4 italic">
                Liste indicative à confirmer par ECO RIDE. Placeholder à valider juridiquement.
              </p>
            </Section>

            {/* FAQ */}
            {vehicleFaqs.length > 0 && (
              <div>
                <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--eco-black)" }}>
                  Questions fréquentes
                </h2>
                <FAQAccordion items={vehicleFaqs} />
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (sticky sidebar) ──────── */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-5">
              <DesktopCTASidebar
                slug={vehicle.slug}
                brand={vehicle.brand}
                model={vehicle.model}
                intent={vehicle.intent}
                rentalPrice={vehicle.rentalPriceWeeklyHt}
                rentalMonthly={vehicle.rentalPriceMonthlyHt}
                salePrice={vehicle.salePriceTtc}
              />
              {vehicle.score && <VehicleScore score={vehicle.score} />}
            </div>
          </div>
        </div>

        {/* Simulateur LOA */}
        {settings.feature_simulator && vehicle.rentalPriceWeeklyHt && (
          <div className="mt-10 rounded-3xl p-6 border border-blue-100" style={{ background: "linear-gradient(135deg, #EFF7F1 0%, #E8F4FF 100%)" }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "var(--eco-blue)", opacity: 0.12 }} />
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--eco-blue)" }}>Simulateur LOA</p>
                <h3 className="text-xl font-extrabold mb-1" style={{ color: "var(--eco-black)" }}>
                  Estimez votre location longue durée
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  À partir de <strong style={{ color: "var(--eco-green)" }}>{formatPrice(vehicle.rentalPriceWeeklyHt)} HT/sem</strong> pour ce véhicule.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "1 semaine", price: vehicle.rentalPriceWeeklyHt, unit: "HT/sem" },
                    { label: "1 mois", price: vehicle.rentalPriceMonthlyHt ?? Math.round(vehicle.rentalPriceWeeklyHt * 3.8), unit: "HT/mois" },
                    { label: "3 mois", price: Math.round((vehicle.rentalPriceMonthlyHt ?? vehicle.rentalPriceWeeklyHt * 3.8) * 0.93), unit: "HT/mois" },
                  ].map(({ label, price: p, unit }) => (
                    <div key={label} className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <p className="font-bold text-base" style={{ color: "var(--eco-green)" }}>{formatPrice(p!)}</p>
                      <p className="text-xs text-gray-400">{unit}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/demande?vehicule=${vehicle.slug}&intent=location`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "var(--eco-green)" }}
                >
                  Demander un devis précis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="mt-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-extrabold" style={{ color: "var(--eco-black)" }}>
                Véhicules similaires
              </h2>
              <Link
                href="/catalogue"
                className="text-sm font-semibold flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: "var(--eco-green)" }}
              >
                Voir tout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
