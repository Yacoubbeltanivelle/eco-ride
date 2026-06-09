"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Suspense } from "react";
import { submitLead } from "@/lib/api/leads";

const steps = ["Votre besoin", "Véhicule", "Dates", "Profil", "Récapitulatif", "Confirmation"];

function DemandeForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [data, setData] = useState({
    intent: params.get("intent") || "",
    type: params.get("type") || "",
    vehicule: params.get("vehicule") || "",
    budget: "",
    duree: "",
    dateDebut: "",
    marque: params.get("marque") || "",
    modele: params.get("modele") || "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    message: "",
    rgpd: false,
  });

  const update = (k: string, v: string | boolean) => setData(d => ({ ...d, [k]: v }));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const phoneRegex = /^\+?[0-9 .\-]{8,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!data.intent && !!data.type;
      case 1:
        return data.marque.trim().length >= 2;
      case 2:
        return data.intent === "location"
          ? !!data.duree
          : true;
      case 3:
        return (
          data.prenom.trim().length >= 2 &&
          data.nom.trim().length >= 2 &&
          phoneRegex.test(data.telephone.trim()) &&
          emailRegex.test(data.email.trim()) &&
          data.rgpd
        );
      default:
        return true;
    }
  };

  const stepHint = (): string | null => {
    if (step === 0) {
      const missing: string[] = [];
      if (!data.intent) missing.push("votre besoin (location / achat / mandataire)");
      if (!data.type) missing.push("votre profil (VTC / particulier / pro / entreprise)");
      return missing.length > 0 ? `Requis : ${missing.join(" · ")}` : null;
    }
    if (step === 1 && data.marque.trim().length < 2) {
      return "Indiquez au moins la marque du véhicule souhaité.";
    }
    if (step === 2 && data.intent === "location" && !data.duree) {
      return "Indiquez la durée souhaitée pour votre location.";
    }
    if (step === 3) {
      const missing: string[] = [];
      if (data.prenom.trim().length < 2) missing.push("prénom");
      if (data.nom.trim().length < 2) missing.push("nom");
      if (!phoneRegex.test(data.telephone.trim())) missing.push("téléphone valide (ex : 06 12 34 56 78)");
      if (!emailRegex.test(data.email.trim())) missing.push("email valide");
      if (!data.rgpd) missing.push("consentement RGPD");
      return missing.length > 0 ? `Champs requis : ${missing.join(" · ")}` : null;
    }
    return null;
  };

  const handleNext = async () => {
    if (step === steps.length - 2) {
      await handleSubmit();
    } else {
      setStep(s => Math.min(s + 1, steps.length - 1));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead({
      firstName: data.prenom,
      lastName: data.nom,
      email: data.email,
      phone: data.telephone,
      intent: data.intent as "location" | "achat" | "mandataire",
      clientType: (data.type as "vtc" | "particulier" | "pro" | "entreprise") || undefined,
      vehicleBrand: data.marque || undefined,
      vehicleModel: data.modele || undefined,
      vehicleSlug: data.vehicule || undefined,
      budget: data.budget || undefined,
      startDate: data.dateDebut || undefined,
      duration: data.duree || undefined,
      message: data.message || undefined,
      sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
      rgpdConsent: data.rgpd,
    });

    setSubmitting(false);

    if (result.ok) {
      setLeadId(result.data.id);
      setStep(steps.length - 1);
    } else {
      setSubmitError(result.error.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (step === steps.length - 1) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--eco-mint-soft)" }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: "var(--eco-green)" }} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Demande envoyée !</h2>
        <p className="text-gray-500 mb-2">Votre demande a bien été reçue.</p>
        <p className="text-gray-500 mb-8">Notre équipe vous recontacte sous 24h.</p>
        <div className="bg-gray-50 rounded-2xl p-5 max-w-sm mx-auto text-left mb-6 text-sm text-gray-700">
          <p><strong>Besoin :</strong> {data.intent || "Non précisé"}</p>
          <p><strong>Type client :</strong> {data.type || "Non précisé"}</p>
          <p><strong>Véhicule :</strong> {data.marque} {data.modele || "Non précisé"}</p>
          <p><strong>Nom :</strong> {data.prenom} {data.nom}</p>
          <p><strong>Contact :</strong> {data.telephone} — {data.email}</p>
          {leadId && <p className="mt-3 text-xs text-gray-400">Réf : {leadId}</p>}
        </div>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white" style={{ background: "var(--eco-green)" }}>
          Retour à l'accueil
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {steps.slice(0, -1).map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? "bg-sky-600 text-white" : i === step ? "text-white" : "bg-gray-200 text-gray-500"}`}
              style={i === step ? { background: "var(--eco-green)" } : {}}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < steps.length - 2 && <div className={`h-0.5 w-6 ${i < step ? "bg-sky-600" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">{steps[step]}</h1>

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Je souhaite :</label>
          {[
            { v: "location", l: "Louer un véhicule (VTC / pro / particulier)" },
            { v: "achat", l: "Acheter un véhicule d'occasion" },
            { v: "mandataire", l: "Commander un véhicule via mandataire" },
          ].map(({ v, l }) => (
            <label key={v} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${data.intent === v ? "border-sky-500 bg-sky-50" : "border-gray-200 bg-white"}`}>
              <input type="radio" name="intent" value={v} checked={data.intent === v} onChange={() => update("intent", v)} className="accent-sky-600" />
              <span className="font-medium text-gray-800">{l}</span>
            </label>
          ))}
          <label className="text-sm font-medium text-gray-700 mt-2 mb-1 block">Je suis :</label>
          {[
            { v: "vtc", l: "Chauffeur VTC" },
            { v: "particulier", l: "Particulier" },
            { v: "pro", l: "Professionnel indépendant" },
            { v: "entreprise", l: "Entreprise" },
          ].map(({ v, l }) => (
            <label key={v} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${data.type === v ? "border-sky-500 bg-sky-50" : "border-gray-200 bg-white"}`}>
              <input type="radio" name="type" value={v} checked={data.type === v} onChange={() => update("type", v)} className="accent-sky-600" />
              <span className="font-medium text-gray-800">{l}</span>
            </label>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Véhicule souhaité (marque)</label>
            <input value={data.marque} onChange={e => update("marque", e.target.value)} placeholder="Ex: Toyota, Tesla, Mercedes…"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Modèle</label>
            <input value={data.modele} onChange={e => update("modele", e.target.value)} placeholder="Ex: Corolla, Model 3, Classe E…"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Budget (optionnel)</label>
            <select value={data.budget} onChange={e => update("budget", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm bg-white">
              <option value="">Non précisé</option>
              <option value="moins_300_sem">Moins de 300 €/semaine</option>
              <option value="300_400_sem">300 – 400 €/semaine</option>
              <option value="plus_400_sem">Plus de 400 €/semaine</option>
              <option value="moins_20000">Moins de 20 000 €</option>
              <option value="20000_30000">20 000 – 30 000 €</option>
              <option value="plus_30000">Plus de 30 000 €</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Date souhaitée (approximative)</label>
            <input type="date" value={data.dateDebut} onChange={e => update("dateDebut", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Durée souhaitée</label>
            <select value={data.duree} onChange={e => update("duree", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm bg-white">
              <option value="">Non précisé</option>
              <option value="1_semaine">1 semaine</option>
              <option value="1_mois">1 mois</option>
              <option value="3_mois">3 mois</option>
              <option value="6_mois">6 mois</option>
              <option value="1_an">1 an et plus</option>
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Prénom *</label>
              <input value={data.prenom} onChange={e => update("prenom", e.target.value)} placeholder="Votre prénom"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Nom *</label>
              <input value={data.nom} onChange={e => update("nom", e.target.value)} placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Téléphone *</label>
            <input type="tel" value={data.telephone} onChange={e => update("telephone", e.target.value)} placeholder="06 00 00 00 00"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
            <input type="email" value={data.email} onChange={e => update("email", e.target.value)} placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Message (optionnel)</label>
            <textarea value={data.message} onChange={e => update("message", e.target.value)} placeholder="Informations complémentaires…" rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-sky-500 text-sm resize-none" />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={data.rgpd} onChange={e => update("rgpd", e.target.checked)} className="accent-sky-600 mt-0.5 w-4 h-4" />
            <span className="text-xs text-gray-500 leading-relaxed">
              J'accepte que mes informations soient utilisées pour être recontacté au sujet de ma demande par ECO RIDE. Ces données ne seront pas partagées à des tiers.{" "}
              <a href="/confidentialite" className="text-sky-600 underline">Politique de confidentialité</a>
            </span>
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Récapitulatif</h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Besoin</dt><dd className="font-semibold text-gray-900 capitalize">{data.intent || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Profil</dt><dd className="font-semibold text-gray-900 capitalize">{data.type || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Véhicule</dt><dd className="font-semibold text-gray-900">{data.marque} {data.modele || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Budget</dt><dd className="font-semibold text-gray-900">{data.budget || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Date</dt><dd className="font-semibold text-gray-900">{data.dateDebut || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Durée</dt><dd className="font-semibold text-gray-900">{data.duree || "—"}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Nom</dt><dd className="font-semibold text-gray-900">{data.prenom} {data.nom}</dd></div>
            <div className="flex justify-between border-b border-gray-50 pb-2"><dt className="text-gray-500">Téléphone</dt><dd className="font-semibold text-gray-900">{data.telephone || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="font-semibold text-gray-900">{data.email || "—"}</dd></div>
          </dl>
          {submitError && (
            <p className="text-sm text-red-600 mt-4 p-3 bg-red-50 rounded-xl">{submitError}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button type="button" onClick={prev} disabled={submitting}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-gray-700 bg-gray-100 disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
        <button type="button" onClick={handleNext}
          disabled={!canProceed() || submitting}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--eco-green)" }}>
          {submitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
          ) : (
            <>{step === steps.length - 2 ? "Envoyer ma demande" : "Continuer"} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      {!submitting && stepHint() && (
        <p className="text-xs text-amber-600 text-center mt-3">{stepHint()}</p>
      )}
    </div>
  );
}

export default function DemandePage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="max-w-xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Faire une demande</h1>
        <p className="text-gray-500 mt-2">Réponse sous 24h par téléphone ou email</p>
      </div>
      <Suspense fallback={<div className="text-center py-8 text-gray-500">Chargement…</div>}>
        <DemandeForm />
      </Suspense>
    </div>
  );
}
