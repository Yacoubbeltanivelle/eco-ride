import type { Metadata } from "next";
import { LegalSection } from "@/components/ui/LegalContent";

export const metadata: Metadata = {
  title: "Politique Cookies | ECO RIDE",
  description: "Gestion des cookies sur le site ECO RIDE.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          <strong>Placeholder V0</strong> — En production, intégrer un gestionnaire de consentement cookies conforme CNIL (ex : Axeptio, Didomi, CookieYes).
          {/* TODO_PROD: Bannière cookie CNIL avec opt-in/opt-out */}
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Politique Cookies</h1>
        <LegalSection>
          <h2>Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite sur un site web. Il permet de reconnaître votre navigateur et de mémoriser certaines informations.</p>

          <h2>Cookies utilisés sur ce site</h2>
          <h3>Cookies essentiels</h3>
          <p>Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés. Aucun consentement requis.</p>

          <h3>Cookies analytiques</h3>
          <p>Permettent de mesurer l'audience du site (ex : Google Analytics). Déposés uniquement avec votre consentement.</p>

          <h3>Cookies marketing</h3>
          <p>Permettent d'afficher des publicités personnalisées (ex : Facebook Pixel). Déposés uniquement avec votre consentement.</p>

          <h2>Gérer vos préférences</h2>
          <p>Vous pouvez à tout moment modifier vos préférences de cookies via le bouton "Gérer les cookies" disponible en bas de page, ou via les paramètres de votre navigateur.</p>

          <h2>Contact</h2>
          <p>Pour toute question : contact@ecoride.pro</p>
        </LegalSection>
      </div>
    </div>
  );
}
