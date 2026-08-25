import { createContext, useContext } from 'react';

type Language = 'en' | 'fa';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

const useLanguage = () => useContext(LanguageContext);

export { LanguageContext, useLanguage };
