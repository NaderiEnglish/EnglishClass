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

type TrialType = 'level' | 'full';
type CourseType = 'general' | 'ielts' | 'toefl';

const TrialSession = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [course, setCourse] = useState<CourseType | ''>('');
  const [trialType, setTrialType] = useState<TrialType | ''>('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch('/api/trial-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          country,
          course,
          trialType,
          additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isPersian
              ? 'ارسال درخواست با مشکل مواجه شد.'
              : 'Unable to send your request.'),
        );
      }

      setSuccess(true);

      setName('');
      setPhone('');
      setCountry('');
      setCourse('');
      setTrialType('');
      setAdditionalInfo('');
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : isPersian
            ? 'ارسال درخواست با مشکل مواجه شد.'
            : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Registration */}
      <Section yPadding="pt-12 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[32px] bg-gray-100 p-8 shadow-xl dark:bg-gray-800 md:p-10">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {isPersian
                  ? 'جلسه آزمایشی رایگان'
                  : 'Free Trial Session'}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {isPersian
                  ? 'یک جلسه کوتاه برای تعیین سطح و آشنایی با روش آموزش.'
                  : 'A short session to determine your level and experience our teaching approach.'}
              </p>
            </div>

            {/* Trial Options */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {isPersian ? 'نوع جلسه آزمایشی' : 'Choose Your Trial Session'}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Level Assessment */}
                <button
                  type="button"
                  onClick={() => setTrialType('level')}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    trialType === 'level'
                      ? 'border-primary-500 bg-primary-100 dark:bg-primary-900'
                      : 'border-gray-300 bg-white hover:border-primary-400 dark:border-gray-600 dark:bg-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        trialType === 'level'
                          ? 'border-primary-500'
                          : 'border-gray-400'
                      }`}
                    >
                      {trialType === 'level' && (
                        <div className="size-2.5 rounded-full bg-primary-500" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isPersian
                          ? 'تعیین سطح زبان'
                          : 'Level Assessment'}
                      </h3>

                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {isPersian
                          ? '۲۰ دقیقه برای بررسی سطح فعلی زبان انگلیسی شما.'
                          : '20 minutes to determine your current English level.'}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Full Trial */}
                <button
                  type="button"
                  onClick={() => setTrialType('full')}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    trialType === 'full'
                      ? 'border-primary-500 bg-primary-100 dark:bg-primary-900'
                      : 'border-gray-300 bg-white hover:border-primary-400 dark:border-gray-600 dark:bg-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        trialType === 'full'
                          ? 'border-primary-500'
                          : 'border-gray-400'
                      }`}
                    >
                      {trialType === 'full' && (
                        <div className="size-2.5 rounded-full bg-primary-500" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isPersian
                          ? 'تعیین سطح + جلسه آزمایشی'
                          : 'Level Assessment + Trial Lesson'}
                      </h3>

                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {isPersian
                          ? '۲۰ دقیقه تعیین سطح + ۴۰ دقیقه جلسه آموزشی رایگان.'
                          : '20 minutes for level assessment + 40 minutes of free trial lesson.'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={
                    isPersian
                      ? 'نام و نام خانوادگی خود را وارد کنید'
                      : 'Enter your full name'
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
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={
                    isPersian
                      ? 'شماره تلفن خود را وارد کنید'
                      : 'Enter your phone number'
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Country */}
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
                    isPersian
                      ? 'کشور محل اقامت خود را وارد کنید'
                      : 'Enter your country of residence'
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
                  {isPersian ? 'دوره مورد نظر' : 'Course Choice'}
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
                    {isPersian ? 'انگلیسی عمومی' : 'General English'}
                  </option>

                  <option value="ielts">
                    {isPersian ? 'آمادگی آیلتس' : 'IELTS Preparation'}
                  </option>

                  <option value="toefl">
                    {isPersian ? 'آمادگی تافل' : 'TOEFL Preparation'}
                  </option>
                </select>
              </div>

              {/* Additional Information */}
              <div>
                <label
                  htmlFor="additionalInfo"
                  className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                >
                  {isPersian
                    ? 'اطلاعات تکمیلی'
                    : 'Additional Information'}
                </label>

                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(event) =>
                    setAdditionalInfo(event.target.value)
                  }
                  rows={5}
                  placeholder={
                    isPersian
                      ? 'اگر اطلاعات، هدف یا درخواست خاصی دارید، اینجا بنویسید...'
                      : 'Tell us anything else about your goals, needs, or preferences...'
                  }
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition focus:border-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* Success Message */}
              {success && (
                <div className="rounded-2xl bg-green-100 p-4 text-center text-green-800 dark:bg-green-900 dark:text-green-100">
                  {isPersian
                    ? 'درخواست شما با موفقیت ارسال شد. به‌زودی با شما تماس خواهیم گرفت.'
                    : 'Your request has been sent successfully. We will contact you soon.'}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-2xl bg-red-100 p-4 text-center text-red-800 dark:bg-red-900 dark:text-red-100">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-4 text-center">
                <Button xl>
                  {isSubmitting
                    ? isPersian
                      ? 'در حال ارسال...'
                      : 'Sending...'
                    : isPersian
                      ? 'درخواست جلسه آزمایشی'
                      : 'Request Free Trial'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default TrialSession;
