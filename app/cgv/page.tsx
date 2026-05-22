import type { Metadata } from "next";
import { LegalSection } from "@/components/ui/LegalContent";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | ECO RIDE",
  description: "Conditions Générales de Vente et de Location ECO RIDE.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          <strong>Placeholder V0 — À valider par un juriste</strong>. Ces CGV sont indicatives et ne constituent pas un document juridique définitif.
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Conditions Générales de Vente et de Location</h1>
        <LegalSection>
          <h2>1. Objet</h2>
          <p>Les présentes CGV régissent les relations entre ECO RIDE et ses clients dans le cadre de la location de véhicules, de la vente de véhicules d'occasion et du service de mandataire automobile.</p>

          <h2>2. Prix</h2>
          <p>Les prix affichés sont en euros. Pour la location, les prix sont indiqués HT. Pour la vente, les prix sont TTC. Les prix peuvent varier selon les formules et les véhicules.</p>

          <h2>3. Réservation et paiement</h2>
          <p>Toute réservation est soumise à la validation du dossier client et à la disponibilité du véhicule. Un acompte peut être demandé. Le solde est réglé selon les modalités définies au contrat.</p>

          <h2>4. Caution</h2>
          <p>Pour la location, une caution est obligatoire. Son montant est précisé dans l'offre. Elle est restituée à la fin du contrat sous réserve de l'état du véhicule.</p>

          <h2>5. Droit de rétractation</h2>
          <p>Conformément aux articles L221-18 et suivants du Code de la consommation, le client particulier dispose d'un délai de 14 jours pour exercer son droit de rétractation. [Détails à préciser selon l'offre concernée — à valider par un juriste].</p>

          <h2>6. Garanties (vente occasion)</h2>
          <p>Les véhicules d'occasion vendus par ECO RIDE bénéficient de la garantie légale de conformité (art. L217-4 et s. C. conso.) et de la garantie contre les vices cachés (art. 1641 et s. C. civ.). Toute garantie contractuelle supplémentaire est précisée dans l'acte de vente.</p>

          <h2>7. Résiliation</h2>
          <p>Les conditions de résiliation sont précisées dans le contrat de location ou de vente. Pour les abonnements mensuels, une résiliation en ligne est possible conformément à la loi du 1er juin 2023. [À préciser — à valider par un juriste].</p>

          <h2>8. Médiation</h2>
          <p>En cas de litige, le client peut recourir à un médiateur de la consommation. [Coordonnées du médiateur à préciser — à valider par un juriste].</p>

          <h2>9. Droit applicable</h2>
          <p>Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.</p>
        </LegalSection>
      </div>
    </div>
  );
}
