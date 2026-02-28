import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Language, translations } from "./translations";

const languageStorageKey = "astitva_language";
const legacyLanguageStorageKey = "transconnect_language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = (localStorage.getItem(languageStorageKey) ||
      localStorage.getItem(legacyLanguageStorageKey)) as Language | null;
    if (saved === "en" || saved === "hi" || saved === "mr") return saved;
    return "en";
  });

  useEffect(() => {
    localStorage.setItem(languageStorageKey, language);
    localStorage.removeItem(legacyLanguageStorageKey);
  }, [language]);

  const setLanguage = (next: Language) => setLanguageState(next);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key] || translations.en[key] || key,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
