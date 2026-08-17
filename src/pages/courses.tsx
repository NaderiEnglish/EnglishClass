import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Footer } from '../templates/Footer';
import { Logo } from '../templates/Logo';

type CourseType = 'general' | 'ielts' | 'toefl';
type SessionsPerWeek = 2 | 3 | 4;

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfOkyT9Umn468g__lp5o5uCH3FLZrCB2SNDBHsCuFXW0wkJGQ/formResponse';

const getCourseValue = (course: CourseType, isPersian: boolean): string => {
  if (course === 'general') {
    return isPersian
      ? 'انگلیسی عمومی فشرده شخصی'
      : 'Personalized Compact General English';
  }

  if (course === 'ielts') {
    return isPersian ? 'آیلتس فشرده شخصی' : 'Personalized Compact IELTS';
  }

  return isPersian ? 'تافل فشرده شخصی' : 'Personalized Compact TOEFL';
};

const getSessionsValue = (
  sessions: SessionsPerWeek,
  isPersian: boolean,
): string => {
  if (sessions === 4) {
    return isPersian
      ? '۴ جلسه، هر جلسه ۱.۵ ساعت در هفته'
      : '4 × 1.5-hour sessions per week';
  }

  if (sessions === 3) {
    return isPersian
      ? '۳ جلسه، هر جلسه ۱.۵ ساعت در هفته'
      : '3 × 1.5-hour sessions per week';
  }

  return isPersian
    ? '۲ جلسه، هر جلسه ۱.۵ ساعت در هفته'
    : '2 × 1.5-hour sessions per week';
};

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

const Courses = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [course, setCourse] = useState<CourseType | ''>('');
  const [sessions, setSessions] = useState<SessionsPerWeek | ''>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const price =
    course && sessions ? prices[course][sessions] : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!course || !sessions) {
      return;
    }

    setIsSubmitting(true);
    setSuccess(false);

    const submitForm = document.createElement('form');

    submitForm.method = 'POST';
    submitForm.action = GOOGLE_FORM_URL;
    submitForm.target = 'google-course-submit';
    submitForm.style.display = 'none';

    const fields = [
      {
        name: 'entry.204446778',
        value: name,
      },
      {
        name: 'entry.382792926',
        value: phone,
      },
      {
        name: 'entry.1532462409',
        value: country,
      },
      {
        name: 'entry.641326499',
        value: getCourseValue(course, isPersian),
      },
      {
        name: 'entry.809186138',
        value: getSessionsValue(sessions, isPersian),
      },
    ];

    fields.forEach(({ name: fieldName, value }) => {
      const input = document.createElement('input');

      input.type = 'hidden';
      input.name = fieldName;
      input.value = value;

      submitForm.appendChild(input);
    });

    document.body.appendChild(submitForm);
    submitForm.submit();

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);

      setName('');
      setPhone('');
      setCountry('');
      setCourse('');
      setSessions('');

      submitForm.remove();
    }, 1500);
  };

  const youtubeVideo = 'https://www.youtube.com/embed/X1WpQInh1Dw';

  const aparatVideo =
    'https://www.aparat.com/video/video/embed/videohash/npu751w/vt/frame';

  const videoUrl = isPersian ? aparatVideo : youtubeVideo;

  let buttonText = 'Request This Course';

  if (isPersian) {
    buttonText = 'ثبت درخواست';
  }

  if (isSubmitting) {
    buttonText = isPersian ? 'در حال ارسال...' : 'Sending...';
  }

  return (
    <main
      className="min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
      dir={isPersian ? 'rtl' : 'ltr'}
    >
      <Background color="bg-gray-100 dark:bg-gray-900">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />}>
            <li>
              <Link href="/" className="text-gray-700 dark:text-gray-200">
                {isPersian ? 'خانه' : 'Home'}
              </Link>
            </li>

            <li>
              <ThemeToggle />
            </li>
          </NavbarTwoColumns>
        </Section>
      </Background>

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

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  isPersian ? 'نام و نام خانوادگی' : 'Enter your full name'
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

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
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={
                  isPersian ? 'شماره تلفن' : 'Enter your phone number'
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'کشور محل اقامت' : 'Country of Residence'}
              </label>

              <input
                id="country"
                type="text"
                required
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                placeholder={
                  isPersian ? 'کشور محل اقامت' : 'Enter your country'
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'دوره مورد نظر' : 'Choose Your Course'}
              </label>

              <select
                id="course"
                required
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
                  {isPersian
                    ? 'تافل فشرده شخصی'
                    : 'Personalized Compact TOEFL'}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sessions"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'تعداد جلسات در هفته' : 'Sessions Per Week'}
              </label>

              <select
                id="sessions"
                required
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

            {success && (
              <div className="rounded-2xl bg-green-100 p-4 text-center text-green-800 dark:bg-green-900 dark:text-green-100">
                {isPersian
                  ? 'درخواست شما با موفقیت ارسال شد. به‌زودی با شما تماس خواهیم گرفت.'
                  : 'Your request has been sent successfully. We will contact you soon.'}
              </div>
            )}

            <div className="pt-2 text-center">
              <Button xl type="submit" disabled={isSubmitting}>
                {buttonText}
              </Button>
            </div>
          </form>
        </div>
      </Section>
      <Section yPadding="py-8">
        <div className="space-y-12">
          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title="General English Course Video"
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
                  ? 'یک دوره کاملاً شخصی‌سازی‌شده برای تقویت مهارت‌های اصلی زبان انگلیسی.'
                  : 'A fully personalized English course designed around your level, needs, and goals.'}
              </p>
            </div>
          </article>

          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title="IELTS Course Video"
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
                  ? 'آمادگی شخصی‌سازی‌شده برای آزمون آیلتس.'
                  : 'A personalized IELTS preparation program focused on your target score.'}
              </p>
            </div>
          </article>

          <article className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[40%]">
              <div className="aspect-video overflow-hidden rounded-[28px] shadow-lg">
                <iframe
                  className="size-full"
                  src={videoUrl}
                  title="TOEFL Course Video"
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
                  ? 'دوره‌ای شخصی‌سازی‌شده برای آمادگی آزمون تافل.'
                  : 'A personalized TOEFL preparation course designed for your goals.'}
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Footer />

      <iframe
        name="google-course-submit"
        title="Google Form submission"
        className="hidden"
      />
    </main>
  );
};

export default Courses;
