import Link from 'next/link';
import { useState } from 'react';

import { useLanguage } from '../context/LanguageContext';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isPersian ? 'باز کردن منو' : 'Open menu'}
        aria-expanded={isOpen}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <span className="block h-0.5 w-6 bg-current" />
        <span className="block h-0.5 w-6 bg-current" />
        <span className="block h-0.5 w-6 bg-current" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-14 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-800 ${
            isPersian ? 'left-0' : 'right-0'
          }`}
        >
          <nav>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {isPersian ? 'خانه' : 'Home'}
                </Link>
              </li>

              <li>
                <Link
                  href="/general"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {isPersian ? 'انگلیسی عمومی' : 'General English'}
                </Link>
              </li>

              <li>
                <Link
                  href="/ielts"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  IELTS
                </Link>
              </li>

              <li>
                <Link
                  href="/toefl"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  TOEFL
                </Link>
              </li>

              <li>
                <Link
                  href="/speaking"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {isPersian ? 'مکالمه' : 'Speaking'}
                </Link>
              </li>

              <li>
                <Link
                  href="/free-contents"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {isPersian ? 'مطالب مفید رایگان' : 'Free Useful Contents'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export { Menu };
