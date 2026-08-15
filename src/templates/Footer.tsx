import Link from 'next/link';

import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-lg px-3 py-8 text-center text-gray-600 dark:text-gray-300">
        <p>
          {isPersian
            ? '© تمامی حقوق محفوظ است.'
            : '© All rights reserved.'}
        </p>

        <div className="mt-4">
          <Link
            href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template"
            className="text-primary-500 hover:text-primary-600"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
