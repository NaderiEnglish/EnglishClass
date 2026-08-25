import Link from 'next/link';

import { Background } from '../background/Background';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Footer } from '../templates/Footer';
import { Logo } from '../templates/Logo';

const Courses = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <main
      className="min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
      dir={isPersian ? 'rtl' : 'ltr'}
    >
      <Background color="bg-gray-100 dark:bg-gray-900">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />}>
            <li>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-gray-700 dark:text-gray-200">
                  {isPersian ? 'خانه' : 'Home'}
                </Link>

                <ThemeToggle />
              </div>
            </li>
          </NavbarTwoColumns>
        </Section>
      </Background>

      <Section yPadding="pt-16 pb-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-primary-500">
            {isPersian ? 'دوره‌های آموزشی' : 'English Courses'}
          </h1>

          <p className="mt-5 text-xl text-gray-600 dark:text-gray-300">
            {isPersian
              ? 'دوره‌های شخصی‌سازی‌شده زبان انگلیسی برای اهداف مختلف.'
              : 'Personalized English courses designed for different goals.'}
          </p>
        </div>
      </Section>

      <Section yPadding="py-8">
        <div className="space-y-12">
          <article className="rounded-[32px] bg-gray-100 p-8 shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPersian
                ? 'انگلیسی عمومی شخصی‌سازی‌شده'
                : 'Personalized General English'}
            </h2>

            <p className="mt-4 text-xl leading-9">
              {isPersian
                ? 'دوره‌ای برای تقویت مهارت‌های اصلی زبان انگلیسی شامل مکالمه، شنیدار، خواندن و نوشتن، متناسب با سطح و نیاز هر زبان‌آموز.'
                : 'A personalized course focused on improving speaking, listening, reading, and writing skills based on each learner’s level and goals.'}
            </p>
          </article>

          <article className="rounded-[32px] bg-gray-100 p-8 shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPersian ? 'آمادگی آزمون آیلتس' : 'IELTS Preparation Course'}
            </h2>

            <p className="mt-4 text-xl leading-9">
              {isPersian
                ? 'دوره تخصصی آیلتس با تمرکز بر مهارت‌های آزمون، استراتژی‌های پاسخ‌گویی و رسیدن به نمره هدف.'
                : 'A focused IELTS preparation program covering exam skills, strategies, and techniques to achieve your target score.'}
            </p>
          </article>

          <article className="rounded-[32px] bg-gray-100 p-8 shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPersian ? 'آمادگی آزمون تافل' : 'TOEFL Preparation Course'}
            </h2>

            <p className="mt-4 text-xl leading-9">
              {isPersian
                ? 'دوره شخصی‌سازی‌شده برای آمادگی آزمون تافل و تقویت مهارت‌های مورد نیاز برای موفقیت در آزمون.'
                : 'A personalized TOEFL preparation course designed to develop the skills needed for success in the exam.'}
            </p>
          </article>

          <article className="rounded-[32px] bg-gray-100 p-8 shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPersian
                ? 'دوره تقویت مهارت مکالمه انگلیسی'
                : 'English Speaking Course'}
            </h2>

            <p className="mt-4 text-xl leading-9">
              {isPersian
                ? 'دوره‌ای شخصی‌سازی‌شده برای تقویت مهارت مکالمه، افزایش اعتمادبه‌نفس و یادگیری روش‌های طبیعی و روان برای صحبت کردن به زبان انگلیسی.'
                : 'A personalized course focused on improving your speaking skills, building confidence, and helping you express your ideas naturally and fluently in English.'}
            </p>
          </article>
        </div>
      </Section>

      <Section yPadding="py-10">
        <div className="text-center">
          <Link
            href="/registration"
            className="inline-block rounded-md bg-primary-500 px-6 py-4 text-xl font-bold text-white"
          >
            {isPersian ? 'ثبت‌نام دوره‌ها' : 'Register for a Course'}
          </Link>
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default Courses;
