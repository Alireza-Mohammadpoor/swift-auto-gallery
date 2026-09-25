// import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
// import { translations } from "./translations";
// import type { Direction, Language } from "@/types/language";

// interface LanguageContextValue {
//   language: Language;
//   direction: Direction;
//   t: typeof translations["fa"];
//   setLanguage: (lang: Language) => void;
//   toggleLanguage: () => void;
// }

// const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// const STORAGE_KEY = "swift-auto-gallery-lang";

// function getInitialLanguage(): Language {
//   if (typeof window === "undefined") return "fa";
//   const stored = window.localStorage.getItem(STORAGE_KEY);
//   return stored === "en" || stored === "fa" ? stored : "fa";
// }

// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [language, setLanguageState] = useState<Language>(getInitialLanguage);

//   const direction: Direction = language === "fa" ? "rtl" : "ltr";

//   useEffect(() => {
//     document.documentElement.lang = language;
//     document.documentElement.dir = direction;
//     window.localStorage.setItem(STORAGE_KEY, language);
//   }, [language, direction]);

//   const setLanguage = (lang: Language) => setLanguageState(lang);
//   const toggleLanguage = () => setLanguageState((prev) => (prev === "fa" ? "en" : "fa"));

//   const value = useMemo(
//     () => ({
//       language,
//       direction,
//       t: translations[language],
//       setLanguage,
//       toggleLanguage,
//     }),
//     [language, direction]
//   );

//   return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
// }

// export function useLanguage() {
//   const ctx = useContext(LanguageContext);
//   if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
//   return ctx;
// }


import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations } from "./translations";
import type { Direction, Language } from "@/types/language";

type Translation = (typeof translations)[Language];

interface LanguageContextValue {
  language: Language;
  direction: Direction;
  t: Translation;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "swift-auto-gallery-lang";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "fa";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return stored === "en" || stored === "fa" ? stored : "fa";
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(getInitialLanguage);

  const direction: Direction = language === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "fa" ? "en" : "fa"));
  };

  const value: LanguageContextValue = useMemo(
    () => ({
      language,
      direction,
      t: translations[language],
      setLanguage,
      toggleLanguage,
    }),
    [language, direction]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error(
      "useLanguage must be used within LanguageProvider"
    );
  }

  return ctx;
}