import type { Metadata } from "next";
import { LegalSection } from "@/components/ui/LegalContent";

export const metadata: Metadata = {
  title: "Mentions Légales | ECO RIDE",
  description: "Mentions légales du site ECO RIDE — identification de l'entreprise, hébergeur, responsabilités.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          <strong>Placeholder V0</strong> — Ce contenu est indicatif. Il doit être validé et complété par un juriste avant mise en ligne.
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mentions légales</h1>
        <LegalSection>
          <h2>Éditeur du site</h2>
          <p><strong>Dénomination sociale :</strong> ECO RIDE</p>
          <p><strong>Forme juridique :</strong> [À compléter — SAS, SARL, etc.]</p>
          <p><strong>SIREN :</strong> 838 273 910</p>
          <p><strong>RCS :</strong> Nanterre [à confirmer]</p>
          <p><strong>TVA intracommunautaire :</strong> [À compléter]</p>
          <p><strong>Siège social :</strong> 20 bis Rue Louis Philippe, 92200 Neuilly-sur-Seine</p>
          <p><strong>Téléphone :</strong> 06 67 48 95 62</p>
          <p><strong>Email :</strong> contact@ecoride.pro</p>
          <p><strong>Directeur de publication :</strong> [Nom du dirigeant]</p>

          <h2>Hébergeur</h2>
          <p><strong>OVH SAS</strong><br />2 rue Kellermann<br />59100 Roubaix<br />France<br />www.ovh.com</p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive d'ECO RIDE ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>

          <h2>Limitation de responsabilité</h2>
          <p>ECO RIDE s'efforce de maintenir les informations de ce site à jour et exactes. Cependant, ECO RIDE ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus par une mauvaise utilisation des informations présentées.</p>

          <h2>Liens hypertextes</h2>
          <p>Ce site peut contenir des liens vers des sites tiers. ECO RIDE n'est pas responsable du contenu de ces sites.</p>
        </LegalSection>
      </div>
    </div>
  );
}
