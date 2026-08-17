import Link from 'next/link';
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

const Courses = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState<CourseType | ''>('');
  const [sessions, setSessions] = useState<SessionsPerWeek | ''>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!course || !sessions) {
      setError(
        isPersian
          ? 'لطفاً دوره و تعداد جلسات را انتخاب کنید.'
          : 'Please select a course and number of sessions.',
      );

      return;
    }

    setIsSubmitting(true);
    setSuccess(false);
    setError('');

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
        value: email,
      },
      {
        name: 'entry.641326499',
        value:
          course === 'general'
            ? 'Personalized Compact General English'
            : course === 'ielts'
              ? 'Personalized Compact IELTS'
              : 'Personalized Compact TOEFL',
      },
      {
        name: 'entry.809186138',
        value:
          sessions === 2
            ? '2 × 1.5-hour sessions per week'
            : sessions === 3
              ? '3 × 1.5-hour sessions per week'
              : '4 × 1.5-hour sessions per week',
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
      setEmail('');
      setCourse('');
      setSessions('');

      submitForm.remove();
    }, 1500);
  };

  const youtubeVideo = 'https://www.youtube.com/embed/X1WpQInh1Dw';

  const aparatVideo =
    'https://www.aparat.com/video/video/embed/videohash/npu751w/vt/frame';

  const videoUrl = isPersian ? aparatVideo : youtubeVideo;

  let submitText = isPersian ? 'ثبت درخواست' : 'Request This Course';

  if (isSubmitting) {
    submitText = isPersian ? 'در حال ارسال...' : 'Sending...';
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
                ? 'اطلاعات خود را وارد کنید و دوره مورد نظر خود را انتخاب کنید.'
                : 'Enter your information and choose your preferred course.'}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                {isPersian ? 'نام و نام خانوادگی' : 'Full Name'}
              </label>

              <input
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
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

            {error && (
              <div className="rounded-2xl bg-red-100 p-4 text-center text-red-800 dark:bg-red-900 dark:text-red-100">
                {error}
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
              <Button xl type="submit">
                {submitText}
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
                  ? 'یک دوره کاملاً شخصی‌سازی‌شده برای تقویت مهارت‌های اصلی زبان انگلیسی. محتوای کلاس بر اساس سطح، نیازها و اهداف شما انتخاب می‌شود.'
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
                  ? 'برنامه‌ای شخصی‌سازی‌شده برای آمادگی آزمون آیلتس با تمرکز روی Speaking، Writing، Reading و Listening.'
                  : 'A personalized IELTS preparation program focused on Speaking, Writing, Reading, and Listening.'}
              </p>
            </div>
          </article>

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
                  ? 'دوره‌ای شخصی‌سازی‌شده برای آمادگی آزمون تافل و تقویت مهارت‌های چهارگانه.'
                  : 'A personalized TOEFL preparation course designed to strengthen the four key skills.'}
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Footer />

      <iframe
        name="google-course-submit"
        title="Google Course Form Submission"
        className="hidden"
      />
    </main>
  );
};

export default Courses;
