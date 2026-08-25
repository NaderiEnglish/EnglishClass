'use client';

import { useEffect } from 'react';

import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { IntroVideo } from './IntroVideo';
import { VerticalFeatures } from './VerticalFeatures';

type Language = 'en' | 'fa';

const Base = () => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;

    if (savedLanguage === 'en' || savedLanguage === 'fa') {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div
      className={`min-h-screen bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-300 ${
        language === 'fa' ? 'font-persian' : ''
      }`}
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      <Meta title={AppConfig.title} description={AppConfig.description} />

      <LanguageSelector onSelect={setLanguage} />

      <Hero />
      <IntroVideo />
      <VerticalFeatures />
      <Banner />
      <Footer />
    </div>
  );
};

export { Base };
