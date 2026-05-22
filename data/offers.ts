import type { Offer } from "@/types/offer";

export const mainOffers: Offer[] = [
  {
    id: "location-vtc",
    title: "Location VTC",
    subtitle: "Pour chauffeurs et professionnels",
    description: "Louez un véhicule professionnel avec assurance, entretien et assistance inclus. Idéal pour démarrer ou développer votre activité VTC.",
    icon: "Car",
    href: "/location-vtc",
    features: [
      "Assurance incluse",
      "Entretien pris en charge",
      "Assistance 24/7",
      "1 350 km/semaine inclus",
      "Caution faible",
      "Véhicules contrôlés",
    ],
    cta: "Voir les véhicules",
    badge: "Le plus demandé",
  },
  {
    id: "achat-occasion",
    title: "Achat Occasion",
    subtitle: "Véhicules sélectionnés et contrôlés",
    description: "Achetez en toute confiance un véhicule d'occasion révisé, contrôlé et prêt à rouler. Accompagnement personnalisé.",
    icon: "ShoppingCart",
    href: "/achat-occasion",
    features: [
      "Véhicules révisés",
      "Contrôle technique OK",
      "Carnet de suivi",
      "Accompagnement personnalisé",
      "Financement possible",
      "Reprise étudiée",
    ],
    cta: "Voir les véhicules",
  },
  {
    id: "mandataire-auto",
    title: "Mandataire Auto",
    subtitle: "Votre véhicule neuf au meilleur prix",
    description: "Commandez le véhicule de vos rêves au meilleur tarif. Nous négocions pour vous auprès des réseaux et importateurs.",
    icon: "Search",
    href: "/mandataire-auto",
    features: [
      "Recherche personnalisée",
      "Meilleur prix garanti",
      "Transparence totale",
      "Toutes marques",
      "Véhicules récents",
      "Accompagnement complet",
    ],
    cta: "Faire une demande",
  },
];

export const adminLeads = [
  { id: "1", nom: "Ben Taleb", prenom: "Karim", telephone: "06 12 34 56 78", email: "karim@mail.com", type: "vtc", intent: "location", vehicleLabel: "Tesla Model 3", status: "nouveau", dateContact: "2025-05-18", urgent: true },
  { id: "2", nom: "Moreau", prenom: "Sophie", telephone: "06 98 76 54 32", email: "sophie@mail.com", type: "particulier", intent: "achat", vehicleLabel: "VW Passat GTE", status: "rdv_fixe", dateContact: "2025-05-17", urgent: false },
  { id: "3", nom: "Tahiri", prenom: "Rachid", telephone: "07 11 22 33 44", email: "rachid@mail.com", type: "vtc", intent: "location", vehicleLabel: "Peugeot 508 SW", status: "offre_envoyee", dateContact: "2025-05-16", urgent: false },
  { id: "4", nom: "LogiCar SARL", prenom: "", telephone: "01 23 45 67 89", email: "contact@logicar.fr", type: "entreprise", intent: "location", vehicleLabel: "Flotte 3 véhicules", status: "dossier_incomplet", dateContact: "2025-05-15", urgent: false },
  { id: "5", nom: "Durand", prenom: "Marc", telephone: "06 55 44 33 22", email: "marc@mail.com", type: "particulier", intent: "mandataire", vehicleLabel: "Toyota Corolla Hybride", status: "signe", dateContact: "2025-05-14", urgent: false },
  { id: "6", nom: "Lefebvre", prenom: "Aline", telephone: "07 66 77 88 99", email: "aline@mail.com", type: "pro", intent: "achat", vehicleLabel: "BMW Série 5", status: "a_rappeler", dateContact: "2025-05-13", urgent: true },
];
