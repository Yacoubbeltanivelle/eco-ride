"use client";

import { createContext, useContext } from "react";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/api/settings";

const SettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SettingsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SiteSettings;
}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  return useContext(SettingsContext);
}
