'use client';

import type { Language } from '@/types';
import { DEFAULT_LANGUAGE_CODE, SUPPORTED_LANGUAGES } from '@/lib/constants';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface LanguageContextType {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  supportedLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguageState] = useState<Language>(
    () => SUPPORTED_LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE_CODE) || SUPPORTED_LANGUAGES[0]
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLangCode = localStorage.getItem('skillleap-lang');
    if (storedLangCode) {
      const lang = SUPPORTED_LANGUAGES.find(l => l.code === storedLangCode);
      if (lang) {
        setSelectedLanguageState(lang);
      }
    }
  }, []);

  const setSelectedLanguage = (language: Language) => {
    setSelectedLanguageState(language);
    if (isMounted) {
      localStorage.setItem('skillleap-lang', language.code);
    }
  };

  // Prevent hydration mismatch by only rendering children after mount
  if (!isMounted) {
    return null; 
  }

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
