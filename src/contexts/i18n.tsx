import React, { createContext, useContext, useMemo, useState } from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";
import hi from "@/locales/hi.json";
import kok from "@/locales/kok.json";

export type Locale = "kok" | "bn" | "hi" | "en";

const dictionaries: Record<Locale, Record<string, string>> = {
  en, bn, hi, kok,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("kok"); // Kokborok default

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key: string, fallback?: string) => {
      const dict = dictionaries[locale] || {};
      return dict[key] ?? dictionaries.en[key] ?? fallback ?? key;
    },
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
