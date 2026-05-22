import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--eco-mint-bg)" }}>
      <div className="text-center">
        <p className="text-8xl font-extrabold mb-4" style={{ color: "var(--eco-green)" }}>404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page introuvable</h1>
        <p className="text-gray-500 mb-8">Cette page n'existe pas ou a été déplacée.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white"
          style={{ background: "var(--eco-green)" }}>
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
