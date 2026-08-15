import { createContext, useContext } from 'react';

type Language = 'en' | 'fa';

type LanguageContextType = {
  language: Language;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
});

const useLanguage = () => useContext(LanguageContext);

export { LanguageContext, useLanguage };
