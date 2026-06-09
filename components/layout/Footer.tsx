import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { asset } from "@/lib/utils";
import type { SiteSettings } from "@/lib/api/settings";

interface FooterProps {
  settings?: SiteSettings;
}

const safeUrl = (u?: string): string | undefined =>
  u && /^https?:\/\//i.test(u) ? u : undefined;

export default function Footer({ settings }: FooterProps) {
  const phone = settings?.phone ?? "+33667489562";
  const phoneDisplay = settings?.phone_display ?? "06 67 48 95 62";
  const email = settings?.email_contact ?? "contact@ecoride.pro";
  const addressFull = settings?.address_full ?? "20 bis Rue Louis Philippe, 92200 Neuilly-sur-Seine";
  const hoursWeekday = settings?.hours_weekday ?? "Lun – Sam : 9h – 19h";
  const hoursSunday = settings?.hours_sunday ?? "Dim : sur RDV";

  const showVtc        = settings?.feature_vtc !== false;
  const showMandataire = settings?.feature_mandataire !== false;
  const showOccasion   = settings?.feature_occasion !== false;
  const showSimulator  = settings?.feature_simulator ?? false;
  const showComparator = settings?.feature_comparator !== false;
  const showBlog       = settings?.feature_blog ?? false;

  const instagram = settings?.social_instagram;
  const facebook  = settings?.social_facebook;
  const linkedin  = settings?.social_linkedin;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Colonne marque + contact */}
          <div>
            <div className="mb-4">
              <Image
                src={asset("/brand/ecoride-full-sdl-dark.svg")}
                alt="ECO RIDE - Solution de Location"
                width={200}
                height={56}
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed text-pretty">
              Vente, location et mandat automobile.<br />Une mobilité plus simple, plus fiable, plus responsable.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {phoneDisplay}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> {email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{addressFull.replace(", ", ",\n")}</span>
              </span>
              <span className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-500">{hoursWeekday}<br />{hoursSunday}</span>
              </span>
            </div>
            {(instagram || facebook || linkedin) && (
              <div className="mt-4 flex gap-3">
                {safeUrl(instagram) && (
                  <a href={safeUrl(instagram)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs transition-colors">Instagram</a>
                )}
                {safeUrl(facebook) && (
                  <a href={safeUrl(facebook)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs transition-colors">Facebook</a>
                )}
                {safeUrl(linkedin) && (
                  <a href={safeUrl(linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs transition-colors">LinkedIn</a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {showVtc && <li><Link href="/location-vtc" className="hover:text-white">Louer</Link></li>}
              {showOccasion && <li><Link href="/achat-occasion" className="hover:text-white">Acheter</Link></li>}
              {showMandataire && <li><Link href="/mandataire-auto" className="hover:text-white">Commander</Link></li>}
              {showSimulator && <li><Link href="/simulateur" className="hover:text-white">Simulateur</Link></li>}
              {showComparator && <li><Link href="/comparer" className="hover:text-white">Comparateur</Link></li>}
              {showBlog && <li><Link href="/blog" className="hover:text-white">Blog</Link></li>}
            </ul>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="text-white font-semibold mb-4">Catalogue</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/catalogue?fuel=electrique" className="hover:text-white">Véhicules électriques</Link></li>
              <li><Link href="/catalogue?fuel=hybride" className="hover:text-white">Véhicules hybrides</Link></li>
              {showVtc && <li><Link href="/catalogue?vtc=true" className="hover:text-white">Compatible VTC</Link></li>}
              {showOccasion && <li><Link href="/catalogue?intent=sale" className="hover:text-white">Vente occasion</Link></li>}
              {showVtc && <li><Link href="/catalogue?intent=rental" className="hover:text-white">Location</Link></li>}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informations</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link></li>
              <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p className="text-center text-balance md:text-left">
            © {new Date().getFullYear()} {settings?.company_name ?? "ECO RIDE"}
            {settings?.company_siren && <> — SIREN {settings.company_siren}</>}
            {settings?.company_rcs && <> — RCS {settings.company_rcs}</>}
          </p>
          {(settings?.hosting_name || settings?.hosting_address) && (
            <p className="text-center text-balance md:text-right">
              Hébergement : {settings.hosting_name}{settings.hosting_address && `, ${settings.hosting_address}`}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
