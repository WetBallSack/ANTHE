import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from './translations';

export type Language = 'en' | 'zh' | 'ja';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to read initial language from localStorage or default to browser language or 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('anthe_locale');
      if (stored === 'en' || stored === 'zh' || stored === 'ja') {
        return stored;
      }
    } catch (e) {
      // Ignored
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('anthe_locale', lang);
    } catch (e) {
      // Ignored
    }
  };

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'zh') {
      document.title = '天御 | 硬件级蓝牙物理网桥系统';
    } else if (language === 'ja') {
      document.title = 'ANTHE | 物理Bluetooth HIDネットワークブリッジ';
    } else {
      document.title = 'ANTHE | Hardware-in-the-Loop Assistive Solution';
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
