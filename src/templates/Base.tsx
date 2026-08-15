'use client';

import { useEffect, useState } from 'react';

import { LanguageSelector } from '../components/LanguageSelector';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Sponsors } from './Sponsors';
import { VerticalFeatures } from './VerticalFeatures';

type Language = 'en' | 'fa';

const Base = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;

    if (savedLanguage === 'en' || savedLanguage === 'fa') {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div
      className="text-gray-600 antialiased"
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      <Meta title={AppConfig.title} description={AppConfig.description} />

      <LanguageSelector onSelect={setLanguage} />

      <Hero />
      <Sponsors />
      <VerticalFeatures />
      <Banner />
      <Footer />
    </div>
  );
};

export { Base };
