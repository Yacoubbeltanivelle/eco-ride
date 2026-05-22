"use client";
import { Phone, MessageCircle, ClipboardList } from "lucide-react";

interface Props {
  variant?: "default" | "vehicle" | "location";
  vehicleLabel?: string;
  price?: string;
}

export default function StickyMobileCTA({ vehicleLabel, price }: Props) {
  const waMessage = vehicleLabel
    ? `Bonjour, je suis intéressé par le véhicule : ${vehicleLabel}. Pouvez-vous me recontacter ?`
    : "Bonjour, je souhaite des informations sur vos véhicules.";

  return (
    <div className="md:hidden fixed bottom-[64px] left-0 right-0 z-40 px-4 pb-2">
      <div
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "var(--eco-black)" }}
      >
        {price && (
          <div className="px-4 pt-3 pb-1 flex items-baseline gap-2">
            <span className="text-white/50 text-xs">À partir de</span>
            <span className="text-white font-bold text-lg">{price}</span>
          </div>
        )}
        <div className="flex gap-1 p-2">
          <a
            href="tel:+33667489562"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-white text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <a
            href={`https://wa.me/33667489562?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-white text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="/demande"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: "var(--eco-green)", color: "white" }}
          >
            <ClipboardList className="w-4 h-4" /> Demander
          </a>
        </div>
      </div>
    </div>
  );
}
