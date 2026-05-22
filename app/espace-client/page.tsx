import type { Metadata } from "next";
import Link from "next/link";
import { User, FileText, Calendar, Heart, Car, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace Client — ECO RIDE",
  description: "Suivez vos demandes, dossiers et réservations dans votre espace client ECO RIDE.",
};

const mockReservations = [
  { id: "1", vehicle: "Peugeot 508 SW 2021", status: "En cours", dateDebut: "12/05/2025", dateFin: "12/07/2025", type: "Location", prix: "289 €/sem" },
  { id: "2", vehicle: "Toyota Corolla Hybride 2022", status: "Terminée", dateDebut: "01/01/2025", dateFin: "28/02/2025", type: "Location", prix: "269 €/sem" },
];

const mockDocuments = [
  { id: "1", name: "Contrat de location - Peugeot 508", date: "12/05/2025", status: "Signé" },
  { id: "2", name: "Facture mai 2025", date: "01/05/2025", status: "Payée" },
  { id: "3", name: "Attestation d'assurance", date: "12/05/2025", status: "Valide" },
];

export default function EspaceClientPage() {
  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Demo notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          <strong>Simulation V0</strong> — Cet espace client est une démonstration. En production, il nécessitera une authentification sécurisée.
          {/* TODO_PROD: Authentification Laravel Sanctum, profil client réel, documents réels */}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ background: "var(--eco-green)" }}>
            K
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 text-xl">Karim Ben Taleb</h1>
            <p className="text-gray-500 text-sm">Chauffeur VTC · karim@mail.com · 06 12 34 56 78</p>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Car, label: "Mes véhicules", active: true },
            { icon: FileText, label: "Mes documents", active: false },
            { icon: Calendar, label: "Mes RDV", active: false },
            { icon: Heart, label: "Favoris", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <div key={label} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-pointer transition-colors ${active ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
              <Icon className={`w-5 h-5 ${active ? "text-emerald-600" : "text-gray-400"}`} />
              <span className={`text-xs font-semibold ${active ? "text-emerald-700" : "text-gray-600"}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Reservations */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 text-xl mb-4">Mes demandes / contrats</h2>
          <div className="flex flex-col gap-3">
            {mockReservations.map(r => (
              <div key={r.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{r.vehicle}</p>
                    <p className="text-sm text-gray-500">{r.type} · {r.dateDebut} → {r.dateFin}</p>
                    <p className="text-sm text-emerald-700 font-semibold">{r.prix}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === "En cours" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 text-xl mb-4">Mes documents</h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {mockDocuments.map((d, i) => (
              <div key={d.id} className={`flex items-center justify-between px-5 py-4 ${i < mockDocuments.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.date}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">{d.status}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 px-1">
            {/* TODO_PROD: Upload sécurisé des documents (permis, pièce d'identité) via API Laravel + stockage sécurisé */}
            V0 — Documents simulés. En production, vous pourrez uploader et consulter vos documents sécurisés.
          </p>
        </div>

        {/* Next step */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Documents à fournir</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
            {["Permis de conduire ✅", "Pièce d'identité ✅", "Justificatif domicile ⏳", "Carte VTC ⏳"].map(d => (
              <li key={d} className="flex items-center gap-2">{d}</li>
            ))}
          </ul>
          <Link href="/demande" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: "var(--eco-green)" }}>
            Compléter mon dossier <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
