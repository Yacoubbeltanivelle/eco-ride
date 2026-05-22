import type { FAQ } from "@/types/offer";

export const faqs: FAQ[] = [
  {
    question: "Quels documents fournir pour louer un véhicule VTC / TAXI ?",
    answer: "Vous aurez besoin d'un permis de conduire valide, d'une pièce d'identité, d'un justificatif de domicile de moins de 3 mois, de votre carte VTC ou TAXI.",
    category: "documents",
  },
  {
    question: "L'assurance est-elle incluse dans la location ?",
    answer: "Oui, nous proposons des locations avec ou sans assurance, selon vos besoins.",
    category: "location",
  },
  {
    question: "Puis-je réserver rapidement ?",
    answer: "Oui, sous réserve de disponibilité du véhicule et de complétude de votre dossier. Dès que tous vos documents sont validés, la mise à disposition peut se faire dans les 24h. Contactez-nous pour connaître le délai précis selon le véhicule souhaité.",
    category: "location",
  },
  {
    question: "Quelle est la caution demandée ?",
    answer: "La caution demandée est de 1 200 €. Elle est prélevée au démarrage de la location et restituée en fin de contrat, déduction faite des éventuels dommages constatés. Le paiement de la caution peut être effectué en plusieurs fois.",
    category: "location",
  },
  {
    question: "Puis-je acheter le véhicule après la location ?",
    answer: "Nous ne proposons pas d'option d'achat à l'issue de la location. En revanche, si vous souhaitez acquérir un véhicule, notre équipe peut vous proposer des véhicules d'occasion adaptés à votre budget et à vos besoins.",
    category: "location",
  },
  {
    question: "Proposez-vous un financement pour l'achat ?",
    answer: "Nous ne proposons pas de financement. Toutefois, vous pouvez vous rapprocher de votre banque ou d'un organisme spécialisé pour étudier les solutions de financement adaptées à votre situation.",
    category: "achat",
  },
  {
    question: "Quels délais pour une commande mandataire ?",
    answer: "Les délais varient selon les disponibilités et le modèle souhaité. En général, comptez de quelques semaines. Nous vous informons à chaque étape du processus.",
    category: "mandataire",
  },
];
