import { useState } from 'react';
import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../templates/Footer';
import { Logo } from '../templates/Logo';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Section } from '../layout/Section';

type CourseType = 'general' | 'ielts' | 'toefl';
type SessionsPerWeek = 2 | 3 | 4;

const Courses = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState<CourseType | ''>('');
  const [sessions, setSessions] = useState<SessionsPerWeek | ''>('');

  const prices = {
    general: {
      2: 100,
      3: 140,
      4: 180,
    },
    ielts: {
      2: 120,
      3: 165,
      4: 210,
    },
    toefl: {
      2: 120,
      3: 165,
      4: 210,
    },
  };

  const calculatePrice = () => {
    if (!course || !sessions) {
      return 0;
    }

    return prices[course][sessions];
  };

  const price = calculatePrice();

  const youtubeVideo = 'https://www.youtube.com/embed/X1WpQInh1Dw';
  const aparatVideo =
    'https://www.aparat.com/video/video/embed/videohash/npu751w/vt/frame';

  const videoUrl = isPersian ? aparatVideo : youtubeVideo;

  return (
    <main
      className="min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
      dir={isPersian ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <Background color="bg-gray-100 dark:bg-gray-900">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />}>
            <li>
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200"
              >
                {isPersian ? 'خانه' : 'Home'}
              </Link>
            </li>

            <li>
              <ThemeToggle />
            </li>
          </NavbarTwoColumns>
        </Section>
      </Background>

      {/* Registration Form */}
      <Section yPadding="pt-12 pb-8">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-gray-100 p-8 shadow-xl dark:bg-gray-800 md:p-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPersian
                ? 'ثبت‌نام و انتخاب برنامه'
                : 'Registration & Course Selection'}
            </h1>

            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              {isPersian
                ? 'اطلاعات خود را وارد کنید و دوره و برنامه هفتگی مورد نظر خود را انتخاب کنید.'
                : 'Enter your information and choose your preferred course and weekly schedule.'}
            </p>
          </div>

          <form className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'نام و نام خانوادگی' : 'Full Name'}
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  isPersian ? 'نام و نام خانوادگی' : 'Enter your full name'
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'شماره تلفن' : 'Phone Number'}
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={
                  isPersian ? 'شماره تلفن خود را وارد کنید' : 'Phone number'
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Course */}
            <div>
              <label
                htmlFor="course"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'دوره مورد نظر' : 'Choose Your Course'}
              </label>

              <select
                id="course"
                value={course}
                onChange={(event) =>
                  setCourse(event.target.value as CourseType)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option value="">
                  {isPersian ? 'انتخاب دوره' : 'Select a course'}
                </option>

                <option value="general">
                  {isPersian
                    ? 'انگلیسی عمومی فشرده شخصی'
                    : 'Personalized Compact General English'}
                </option>

                <option value="ielts">
                  {isPersian
                    ? 'آیلتس فشرده شخصی'
                    : 'Personalized Compact IELTS'}
                </option>

                <option value="toefl">
                  {isPersian ? 'تافل فشرده شخصی' : 'Personalized Compact TOEFL'}
                </option>
              </select>
            </div>

            {/* Sessions */}
            <div>
              <label
                htmlFor="sessions"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'تعداد جلسات در هفته' : 'Sessions Per Week'}
              </label>

              <select
                id="sessions"
                value={sessions}
                onChange={(event) =>
                  setSessions(Number(event.target.value) as SessionsPerWeek)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option value="">
                  {isPersian ? 'انتخاب تعداد جلسات' : 'Select sessions'}
                </option>

                <option value="4">
                  {isPersian
                    ? '۴ جلسه، هر جلسه ۱.۵ ساعت در هفته'
                    : '4 × 1.5-hour sessions per week'}
                </option>

                <option value="3">
                  {isPersian
                    ? '۳ جلسه، هر جلسه ۱.۵ ساعت در هفته'
                    : '3 × 1.5-hour sessions per week'}
                </option>

                <option value="2">
                  {isPersian
                    ? '۲ جلسه، هر جلسه ۱.۵ ساعت در هفته'
                    : '2 × 1.5-hour sessions per week'}
                </option>
              </select>
            </div>

            {/* Price */}
            {price > 0 && (
              <div className="rounded-2xl bg-primary-100 p-5 text-center dark:bg-primary-900">
                <p className="text-lg text-gray-700 dark:text-gray-200">
                  {isPersian ? 'هزینه تقریبی:' : 'Estimated Price:'}
                </p>

                <p className="mt-1 text-4xl font-bold text-primary-700 dark:text-primary-200">
                  ${price}
                </p>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {isPersian ? 'در ماه' : 'per month'}
                </p>
              </div>
            )}

            <div className="pt-2 text-center">
              <Button xl>
                {isPersian ? 'ثبت درخواست' : 'Request This Course'}
              </Button>
            </div>
          </form>
        </div>
      </Section>

      {/* Courses */}
      <Section yPadding="py-8">
        <div className="space-y-12">
          {/* General English */}
          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title={
                    isPersian
                      ? 'معرفی دوره زبان انگلیسی عمومی'
                      : 'Personalized General English Course'
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="w-full md:w-[60%]">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isPersian
                  ? 'دوره شخصی زبان انگلیسی'
                  : 'Personalized General English'}
              </h2>

              <p className="mt-4 text-xl leading-9 text-gray-600 dark:text-gray-300">
                {isPersian
                  ? 'یک دوره کاملاً شخصی‌سازی‌شده برای تقویت مهارت‌های اصلی زبان انگلیسی. محتوای کلاس بر اساس سطح، نیازها و اهداف شما انتخاب می‌شود و تمرکز ویژه‌ای بر مکالمه، واژگان، گرامر و استفاده طبیعی از زبان دارد.'
                  : 'A fully personalized English course designed around your level, needs, and goals. Lessons focus on practical communication, vocabulary, grammar, speaking, and using English naturally in real-life situations.'}
              </p>
            </div>
          </article>

          {/* IELTS */}
          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title={
                    isPersian
                      ? 'معرفی دوره شخصی آیلتس'
                      : 'Personalized IELTS Course'
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="w-full md:w-[60%]">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isPersian ? 'دوره شخصی آیلتس' : 'Personalized IELTS Course'}
              </h2>

              <p className="mt-4 text-xl leading-9 text-gray-600 dark:text-gray-300">
                {isPersian
                  ? 'برنامه‌ای شخصی‌سازی‌شده برای آمادگی آزمون آیلتس، با تمرکز بر مهارت‌های Speaking، Writing، Reading و Listening. نقاط ضعف شما شناسایی شده و تمرین‌ها بر اساس هدف نمره‌ای شما طراحی می‌شوند.'
                  : 'A personalized IELTS preparation program focused on Speaking, Writing, Reading, and Listening. Lessons are adapted to your current level, weaknesses, and target score.'}
              </p>
            </div>
          </article>

          {/* TOEFL */}
          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title={
                    isPersian
                      ? 'معرفی دوره شخصی تافل'
                      : 'Personalized TOEFL Course'
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="w-full md:w-[60%]">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isPersian ? 'دوره شخصی تافل' : 'Personalized TOEFL Course'}
              </h2>

              <p className="mt-4 text-xl leading-9 text-gray-600 dark:text-gray-300">
                {isPersian
                  ? 'دوره‌ای شخصی‌سازی‌شده برای آمادگی آزمون تافل و تقویت مهارت‌های مورد نیاز آزمون. تمرکز کلاس‌ها بر روی مهارت‌های چهارگانه و استراتژی‌های کاربردی برای رسیدن به نمره مورد نظر شماست.'
                  : 'A personalized TOEFL preparation course designed to strengthen the four key skills and develop practical strategies for achieving your target score.'}
              </p>
            </div>
          </article>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Courses;
