import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useState } from 'react';

import { LanguageContext } from '../context/LanguageContext';

type Language = 'en' | 'fa';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [language, setLanguage] = useState<Language | null>(null);

  if (language === null) {
    return (
      <div
        dir="ltr"
        className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900"
      >
        <div className="w-full max-w-md rounded-2xl p-8 text-center shadow-xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Choose Your Language
          </h1>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className="flex-1 rounded-xl bg-primary-600 px-6 py-4 text-lg font-semibold text-white"
            >
              English
            </button>

            <button
              type="button"
              onClick={() => setLanguage('fa')}
              className="flex-1 rounded-xl bg-primary-600 px-6 py-4 text-lg font-semibold text-white"
            >
              فارسی
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div
        dir={language === 'fa' ? 'rtl' : 'ltr'}
        className={language === 'fa' ? 'font-persian' : ''}
      >
        <Component {...pageProps} />
      </div>
    </LanguageContext.Provider>
  );
};

export default MyApp;
