export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  cta: string;
  badge?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: "location" | "achat" | "mandataire" | "documents" | "general";
}

export interface Testimonial {
  id: string;
  nom: string;
  role: string;
  text: string;
  rating: number;
  vehicleUsed?: string;
  avatar?: string;
}
