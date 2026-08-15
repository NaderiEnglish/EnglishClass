'use client';

import { useEffect, useState } from 'react';

type Language = 'en' | 'fa';

type LanguageSelectorProps = {
  onSelect: (language: Language) => void;
};

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');

    if (!savedLanguage) {
      setVisible(true);
    }
  }, []);

  const selectLanguage = (language: Language) => {
    localStorage.setItem('language', language);
    setVisible(false);
    onSelect(language);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Choose Your Language
        </h2>

        <p className="mb-8 text-lg text-gray-600">
          زبان مورد نظر خود را انتخاب کنید
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => selectLanguage('en')}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            🇬🇧 English
          </button>

          <button
            type="button"
            onClick={() => selectLanguage('fa')}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            🇮🇷 فارسی
          </button>
        </div>
      </div>
    </div>
  );
};

export { LanguageSelector };
