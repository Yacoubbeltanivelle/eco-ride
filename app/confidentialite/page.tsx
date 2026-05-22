import type { Metadata } from "next";
import { LegalSection } from "@/components/ui/LegalContent";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | ECO RIDE",
  description: "Politique de confidentialité et traitement des données personnelles ECO RIDE — conformément au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          <strong>Placeholder V0 — À valider par un juriste</strong> avant mise en ligne. Conformité RGPD à vérifier.
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Politique de confidentialité</h1>
        <LegalSection>
          <h2>1. Responsable du traitement</h2>
          <p>ECO RIDE — 20 bis Rue Louis Philippe, 92200 Neuilly-sur-Seine — contact@ecoride.pro</p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes dans le cadre de nos services :</p>
          <ul>
            <li>Données d'identité : nom, prénom</li>
            <li>Coordonnées : téléphone, email, adresse</li>
            <li>Documents : permis de conduire, pièce d'identité (en production uniquement)</li>
            <li>Données de navigation : cookies analytiques (avec consentement)</li>
          </ul>

          <h2>3. Finalités</h2>
          <ul>
            <li>Traitement de vos demandes de location, achat ou mandataire</li>
            <li>Gestion de la relation client</li>
            <li>Envoi d'informations sur nos offres (avec consentement)</li>
            <li>Amélioration de nos services</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>Le traitement repose sur l'exécution d'un contrat, le consentement de l'utilisateur ou l'intérêt légitime d'ECO RIDE selon les cas. [À préciser par un juriste].</p>

          <h2>5. Durée de conservation</h2>
          <p>Les données sont conservées le temps nécessaire à la gestion de votre relation avec ECO RIDE, et au maximum [durée à définir] après la fin du contrat. [À valider par un juriste].</p>

          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement ("droit à l'oubli")</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p>Pour exercer vos droits : contact@ecoride.pro</p>
          <p>Vous pouvez également adresser une réclamation à la CNIL : www.cnil.fr</p>

          <h2>7. Sécurité</h2>
          <p>ECO RIDE met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, utilisation abusive ou accès non autorisé.</p>
        </LegalSection>
      </div>
    </div>
  );
}
