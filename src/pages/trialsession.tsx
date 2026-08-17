import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';
import { Footer } from '../templates/Footer';
import { Logo } from '../templates/Logo';

type CourseType = 'general' | 'ielts' | 'toefl';
type SessionsPerWeek = 2 | 3 | 4;

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfOkyT9Umn468g__lp5o5uCH3FLZrCB2SNDBHsCuFXW0wkJGQ/formResponse';

const getCourseValue = (
  course: CourseType,
  isPersian: boolean,
): string => {
  const values = {
    general: isPersian
      ? 'انگلیسی عمومی فشرده شخصی'
      : 'Personalized Compact General English',
    ielts: isPersian
      ? 'آیلتس فشرده شخصی'
      : 'Personalized Compact IELTS',
    toefl: isPersian
      ? 'تافل فشرده شخصی'
      : 'Personalized Compact TOEFL',
  };

  return values[course];
};

const getSessionsValue = (
  sessions: SessionsPerWeek,
  isPersian: boolean,
): string => {
  const values = {
    2: isPersian
      ? '۲ جلسه، هر جلسه ۱.۵ ساعت در هفته'
      : '2 × 1.5-hour sessions per week',
    3: isPersian
      ? '۳ جلسه، هر جلسه ۱.۵ ساعت در هفته'
      : '3 × 1.5-hour sessions per week',
    4: isPersian
      ? '۴ جلسه، هر جلسه ۱.۵ ساعت در هفته'
      : '4 × 1.5-hour sessions per week',
  };

  return values[sessions];
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

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price =
    course && sessions ? prices[course][sessions] : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!course || !sessions) {
      setError(
        isPersian
          ? 'لطفاً دوره و تعداد جلسات را انتخاب کنید.'
          : 'Please select a course and sessions.',
      );

      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const form = document.createElement('form');

    form.method = 'POST';
    form.action = GOOGLE_FORM_URL;
    form.target = 'google-course-submit';
    form.style.display = 'none';

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

    fields.forEach(({ name, value }) => {
      const input = document.createElement('input');

      input.type = 'hidden';
      input.name = name;
      input.value = value;

      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    window.setTimeout(() => {
      form.remove();

      setIsSubmitting(false);
      setSuccess(true);

      setName('');
      setPhone('');
      setCountry('');
      setCourse('');
      setSessions('');
    }, 1500);
  };

  let buttonText = isPersian
    ? 'ثبت درخواست'
    : 'Request This Course';

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
          <nav className="flex items-center justify-between">
            <Link href="/">
              <Logo xl />
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-700 dark:text-gray-200">
                {isPersian ? 'خانه' : 'Home'}
              </Link>

              <ThemeToggle />
            </div>
          </nav>
        </Section>
      </Background>

      <Section yPadding="pt-12 pb-20">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-gray-100 p-8 shadow-xl dark:bg-gray-800 md:p-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {isPersian
                ? 'ثبت‌نام دوره'
                : 'Course Registration'}
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {isPersian
                ? 'اطلاعات خود را وارد کنید و دوره مورد نظر را انتخاب کنید.'
                : 'Enter your information and select your course.'}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isPersian ? 'نام کامل' : 'Full Name'}
              className="w-full rounded-xl border px-4 py-3 dark:bg-gray-900"
            />

            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isPersian ? 'شماره تلفن' : 'Phone Number'}
              className="w-full rounded-xl border px-4 py-3 dark:bg-gray-900"
            />

            <input
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={
                isPersian ? 'کشور محل اقامت' : 'Country'
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-gray-900"
            />

            <select
              required
              value={course}
              onChange={(e) =>
                setCourse(e.target.value as CourseType)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-gray-900"
            >
              <option value="">
                {isPersian ? 'انتخاب دوره' : 'Select Course'}
              </option>

              <option value="general">
                Personalized Compact General English
              </option>

              <option value="ielts">
                Personalized Compact IELTS
              </option>

              <option value="toefl">
                Personalized Compact TOEFL
              </option>
            </select>

            <select
              required
              value={sessions}
              onChange={(e) =>
                setSessions(Number(e.target.value) as SessionsPerWeek)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-gray-900"
            >
              <option value="">
                {isPersian ? 'تعداد جلسات' : 'Sessions'}
              </option>

              <option value="2">
                2 × 1.5-hour sessions per week
              </option>

              <option value="3">
                3 × 1.5-hour sessions per week
              </option>

              <option value="4">
                4 × 1.5-hour sessions per week
              </option>
            </select>

            {price > 0 && (
              <div className="rounded-xl bg-primary-100 p-5 text-center">
                <p>
                  {isPersian ? 'هزینه ماهانه:' : 'Monthly Price:'}
                </p>

                <p className="text-4xl font-bold">
                  ${price}
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-100 p-4 text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-green-100 p-4 text-green-700">
                {isPersian
                  ? 'درخواست شما ارسال شد.'
                  : 'Request sent successfully.'}
              </div>
            )}

            <div className="text-center">
              <Button xl type="submit">
                {buttonText}
              </Button>
            </div>
          </form>
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
