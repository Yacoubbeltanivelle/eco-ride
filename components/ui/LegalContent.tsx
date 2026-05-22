import { ReactNode } from "react";

export function LegalSection({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-gray-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:mb-1 [&_strong]:font-semibold [&_strong]:text-gray-800">
      {children}
    </div>
  );
}
