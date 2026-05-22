import type { FAQ } from "@/types/offer";

export const faqs: FAQ[] = [
  {
    question: "Quels documents fournir pour louer un véhicule VTC ?",
    answer: "Vous aurez besoin d'un permis de conduire valide, d'une pièce d'identité, d'un justificatif de domicile de moins de 3 mois, de votre carte VTC ou document équivalent, et d'un RIB pour le prélèvement de la caution. Un extrait KBIS est demandé pour les sociétés.",
    category: "documents",
  },
  {
    question: "L'assurance est-elle incluse dans la location ?",
    answer: "Oui, chaque formule de location inclut au minimum une assurance au tiers. Selon la formule choisie, une assurance tous risques peut être incluse ou proposée en option. Les détails exacts sont précisés dans votre contrat.",
    category: "location",
  },
  {
    question: "Puis-je réserver rapidement ?",
    answer: "Oui, sous réserve de disponibilité du véhicule et de complétude de votre dossier. Dès que tous vos documents sont validés, la mise à disposition peut se faire rapidement. Contactez-nous pour connaître le délai précis selon le véhicule souhaité.",
    category: "location",
  },
  {
    question: "Quelle est la caution demandée ?",
    answer: "La caution varie selon le véhicule, généralement entre 1 200 € et 2 500 €. Elle est prélevée au démarrage de la location et restituée en fin de contrat, déduction faite des éventuels dommages constatés.",
    category: "location",
  },
  {
    question: "Le véhicule est-il compatible avec Uber / Bolt ?",
    answer: "La plupart de nos véhicules sont compatibles avec les plateformes VTC (Uber, Bolt, etc.). La compatibilité exacte est indiquée sur chaque fiche véhicule. N'hésitez pas à nous demander une confirmation selon votre plateforme cible.",
    category: "location",
  },
  {
    question: "Puis-je acheter le véhicule après la location ?",
    answer: "Selon les formules, une option d'achat peut être proposée à l'issue de la période de location. Cette possibilité est à discuter directement avec notre équipe lors de la signature du contrat.",
    category: "location",
  },
  {
    question: "Quels sont les frais en cas de dépassement kilométrique ?",
    answer: "Les dépassements kilométriques sont facturés selon le barème précisé dans votre contrat. Nous vous conseillons de choisir la formule correspondant à votre usage réel pour éviter les frais supplémentaires.",
    category: "location",
  },
  {
    question: "Quelles garanties sur les véhicules d'occasion ?",
    answer: "Chaque véhicule d'occasion vendu par ECO RIDE fait l'objet d'un contrôle technique et d'une révision. Selon le véhicule, une garantie contractuelle peut être proposée. Les détails sont précisés sur chaque fiche véhicule.",
    category: "achat",
  },
  {
    question: "Proposez-vous un financement pour l'achat ?",
    answer: "Nous pouvons vous orienter vers des partenaires financiers. La mise en place d'un financement dépend de votre situation. Contactez-nous pour étudier les solutions adaptées.",
    category: "achat",
  },
  {
    question: "Comment fonctionne le service mandataire ?",
    answer: "Notre service mandataire vous permet de commander un véhicule récent au meilleur tarif, sans passer par un réseau officiel. Nous recherchons le véhicule selon vos critères et négocions les conditions pour vous. Ce service est transparent et rémunéré par une commission claire.",
    category: "mandataire",
  },
  {
    question: "Quels délais pour une commande mandataire ?",
    answer: "Les délais varient selon les disponibilités et le modèle souhaité. En général, comptez de quelques semaines à plusieurs mois. Nous vous informons à chaque étape du processus.",
    category: "mandataire",
  },
  {
    question: "Vos véhicules sont-ils compatibles avec les zones à faibles émissions (ZFE) ?",
    answer: "Nos véhicules hybrides (Crit'Air 1) et électriques (Crit'Air 0) sont compatibles avec toutes les ZFE en vigueur. Les véhicules diesel Crit'Air 2 peuvent circuler dans la plupart des ZFE actuelles, mais nous vous recommandons de vérifier les restrictions locales.",
    category: "general",
  },
];
