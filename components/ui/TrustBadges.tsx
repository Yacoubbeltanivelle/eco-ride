import { ShieldCheck, Wrench, HeadphonesIcon, Star } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "Véhicules contrôlés",
    desc: "Révision et CT à jour",
  },
  {
    icon: Wrench,
    label: "Entretien inclus",
    desc: "Selon formule location",
  },
  {
    icon: HeadphonesIcon,
    label: "Assistance 24/7",
    desc: "Selon formule location",
  },
  {
    icon: Star,
    label: "Avis clients 5/5",
    desc: "Sur nos prestations",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map(({ icon: Icon, label, desc }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-4 flex flex-col items-center text-center gap-2 border"
          style={{ borderColor: "var(--eco-mint-soft)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--eco-mint-soft)" }}
          >
            <Icon className="w-5 h-5" style={{ color: "var(--eco-green)" }} />
          </div>
          <p className="font-semibold text-sm" style={{ color: "var(--eco-ink)" }}>
            {label}
          </p>
          <p className="text-xs" style={{ color: "var(--eco-muted)" }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
