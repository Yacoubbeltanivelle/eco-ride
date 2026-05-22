import type { Metadata } from "next";
import { adminLeads } from "@/data/offers";
import { vehicles } from "@/data/vehicles";
import { leadStatusLabels, leadStatusColors } from "@/lib/utils";
import { Users, Car, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Demo — ECO RIDE",
  description: "Tableau de bord administrateur ECO RIDE (démonstration).",
};

const stats = (available: number, newLeads: number, urgent: number, signed: number) => [
  {
    icon: Users,
    label: "Leads totaux",
    val: adminLeads.length,
    sub: `dont ${newLeads} nouveaux`,
    trend: "+12%",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    icon: AlertCircle,
    label: "Urgents",
    val: urgent,
    sub: "à traiter maintenant",
    trend: urgent > 0 ? "!" : "OK",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
  },
  {
    icon: TrendingUp,
    label: "Signés",
    val: signed,
    sub: "contrats actifs",
    trend: "+8%",
    color: "var(--eco-green)",
    bg: "var(--eco-mint-soft)",
  },
  {
    icon: Car,
    label: "Disponibles",
    val: available,
    sub: `sur ${vehicles.length} véhicules`,
    trend: `${Math.round((available / vehicles.length) * 100)}%`,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
  },
];

export default function AdminDemoPage() {
  const available = vehicles.filter(v => v.status === "available").length;
  const newLeads  = adminLeads.filter(l => l.status === "nouveau").length;
  const urgent    = adminLeads.filter(l => l.urgent).length;
  const signed    = adminLeads.filter(l => l.status === "signe").length;
  const statCards = stats(available, newLeads, urgent, signed);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-7xl mx-auto">

        {/* V0 banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Simulation V0</strong> — Dashboard démonstration.
            {/* TODO_PROD: Filament Admin Laravel pour le back-office complet */}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500 text-sm mt-0.5">ECO RIDE · Démo V0 · {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ icon: Icon, label, val, sub, trend, color, bg }) => (
            <div key={label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: bg, color }}>
                  <ArrowUpRight className="w-3 h-3" />{trend}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{val}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Demandes entrantes</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{adminLeads.length} leads</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--eco-mint-bg)" }}>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Véhicule</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Statut</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminLeads.map((lead, i) => (
                  <tr key={lead.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {lead.urgent && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" title="Urgent" />}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                          style={{ background: "var(--eco-green)" }}>
                          {lead.prenom.charAt(0)}{lead.nom.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{lead.prenom} {lead.nom}</p>
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">{lead.type}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 hidden md:table-cell">{lead.vehicleLabel || "—"}</td>
                    <td className="px-4 py-4 text-xs text-gray-500 hidden md:table-cell">{lead.dateContact}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${leadStatusColors[lead.status]}`}>
                        {leadStatusLabels[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white"
                          style={{ background: "var(--eco-green)" }}>Répondre</button>
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-semibold">Éditer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicles table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Parc véhicules</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{vehicles.length} véhicules</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--eco-mint-bg)" }}>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Véhicule</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden sm:table-cell">Énergie</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Prix/sem</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr key={v.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : ""}`}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-sm text-gray-900">{v.brand} {v.model}</p>
                      <p className="text-xs text-gray-500">{v.year} · {v.mileageKm.toLocaleString("fr-FR")} km</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">{v.fuel}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 hidden md:table-cell">
                      {v.rentalPriceWeeklyHt ? `${v.rentalPriceWeeklyHt} € HT` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        v.status === "available"    ? "bg-green-100 text-green-700"
                        : v.status === "reserved"  ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                      }`}>
                        {v.status === "available" ? "Disponible" : v.status === "reserved" ? "Réservé" : "Bientôt"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
