import Link from 'next/link';

import { Button } from '../button/Button';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';

const Banner = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <Section>
      <div className="rounded-2xl border-2 border-primary-500 bg-white px-6 py-12 text-center text-gray-700 shadow-xl dark:bg-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold">
          {isPersian
            ? 'برای شروع یادگیری زبان انگلیسی آماده‌اید؟'
            : 'Ready to Start Learning English?'}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg">
          {isPersian
            ? 'برای دریافت راهنمایی رایگان و آشنایی با نحوه برگزاری کلاس‌ها با ما تماس بگیرید.'
            : 'Contact us for a free consultation and learn more about our personalized English lessons.'}
        </p>

        <div className="mt-8">
          <Link href="/trialsession">
            <Button xl>
              {isPersian ? 'جلسه آزمایشی رایگان' : 'Start Your Free Trial'}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export { Banner };
