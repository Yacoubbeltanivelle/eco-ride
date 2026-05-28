import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { asset } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
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
              <a href="tel:+33667489562" className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> 06 67 48 95 62</a>
              <a href="mailto:contact@ecoride.pro" className="flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4" /> contact@ecoride.pro</a>
              <span className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>20 bis Rue Louis Philippe,<br />92200 Neuilly-sur-Seine</span></span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/location-vtc" className="hover:text-white">Louer</Link></li>
              <li><Link href="/achat-occasion" className="hover:text-white">Acheter</Link></li>
              <li><Link href="/mandataire-auto" className="hover:text-white">Commander</Link></li>
              <li><Link href="/simulateur" className="hover:text-white">Simulateur</Link></li>
              <li><Link href="/comparer" className="hover:text-white">Comparateur</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Catalogue</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/catalogue?fuel=electrique" className="hover:text-white">Véhicules électriques</Link></li>
              <li><Link href="/catalogue?fuel=hybride" className="hover:text-white">Véhicules hybrides</Link></li>
              <li><Link href="/catalogue?intent=rental" className="hover:text-white">Location</Link></li>
              <li><Link href="/catalogue?intent=sale" className="hover:text-white">Vente occasion</Link></li>
              <li><Link href="/catalogue?vtc=true" className="hover:text-white">Compatible VTC</Link></li>
            </ul>
          </div>

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
          <p className="text-center text-balance md:text-left">© {new Date().getFullYear()} ECO RIDE — SIREN 838 273 910 — RCS Nanterre</p>
          <p className="text-center text-balance md:text-right">Hébergement : OVH SAS, 2 rue Kellermann, 59100 Roubaix</p>
        </div>
      </div>
    </footer>
  );
}
