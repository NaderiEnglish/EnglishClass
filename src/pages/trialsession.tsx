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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [course, setCourse] = useState<CourseType | ''>('');
  const [trialType, setTrialType] = useState<TrialType | ''>('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/tejeco', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          course,
          trial_type: trialType,
          additional_info: additionalInfo,
          _subject: 'New Naderi English Trial Session Request',
          _template: 'table',
          _replyto: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setCountry('');
      setCourse('');
      setTrialType('');
      setAdditionalInfo('');
    } catch {
      setError(
        isPersian
          ? 'ارسال درخواست با مشکل مواجه شد. لطفاً دوباره تلاش کنید.'
          : 'Unable to send your request. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  let submitButtonText = 'Request Free Trial';

  if (isSubmitting) {
    submitButtonText = isPersian ? 'در حال ارسال...' : 'Sending...';
  } else if (isPersian) {
    submitButtonText = 'درخواست جلسه آزمایشی';
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

      <Section yPadding="pt-12 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[32px] bg-gray-100 p-8 shadow-xl dark:bg-gray-800 md:p-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {isPersian ? 'جلسه آزمایشی رایگان' : 'Free Trial Session'}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {isPersian
                  ? 'سطح زبان خود را مشخص کنید و با روش آموزش آشنا شوید.'
                  : 'Determine your English level and experience the teaching approach.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                  name="name"
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

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                >
                  {isPersian ? 'ایمیل' : 'Email Address'}
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={
                    isPersian ? 'آدرس ایمیل' : 'Enter your email address'
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
                  name="phone"
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
                  name="country"
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
                  name="course"
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
                      ? 'دوره شخصی انگلیسی عمومی'
                      : 'Personal General English'}
                  </option>

                  <option value="ielts">
                    {isPersian ? 'دوره شخصی آیلتس' : 'Personal IELTS'}
                  </option>

                  <option value="toefl">
                    {isPersian ? 'دوره شخصی تافل' : 'Personal TOEFL'}
                  </option>
                </select>
              </div>

              {/* Trial Type */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  {isPersian ? 'نوع جلسه آزمایشی' : 'Choose Your Trial Session'}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                      trialType === 'level'
                        ? 'border-primary-500 bg-primary-100 dark:bg-primary-900'
                        : 'border-gray-300 bg-white hover:border-primary-400 dark:border-gray-600 dark:bg-gray-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="trial_type"
                      value="level"
                      checked={trialType === 'level'}
                      onChange={() => setTrialType('level')}
                      className="sr-only"
                    />

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isPersian ? 'تعیین سطح زبان' : 'Level Assessment'}
                    </h3>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {isPersian
                        ? '۲۰ دقیقه برای تعیین سطح زبان انگلیسی.'
                        : '20 minutes to determine your English level.'}
                    </p>
                  </label>

                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                      trialType === 'full'
                        ? 'border-primary-500 bg-primary-100 dark:bg-primary-900'
                        : 'border-gray-300 bg-white hover:border-primary-400 dark:border-gray-600 dark:bg-gray-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="trial_type"
                      value="full"
                      checked={trialType === 'full'}
                      onChange={() => setTrialType('full')}
                      className="sr-only"
                    />

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isPersian
                        ? 'تعیین سطح + جلسه رایگان'
                        : 'Assessment + Free Lesson'}
                    </h3>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {isPersian
                        ? '۲۰ دقیقه تعیین سطح + ۴۰ دقیقه جلسه رایگان.'
                        : '20 minutes assessment + 40-minute free lesson.'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label
                  htmlFor="additionalInfo"
                  className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                >
                  {isPersian ? 'اطلاعات تکمیلی' : 'Additional Information'}
                </label>

                <textarea
                  id="additionalInfo"
                  name="additional_info"
                  value={additionalInfo}
                  onChange={(event) => setAdditionalInfo(event.target.value)}
                  rows={5}
                  placeholder={
                    isPersian
                      ? 'هر اطلاعات یا درخواست دیگری که دارید بنویسید...'
                      : 'Tell us anything else about your goals or needs...'
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
              <div className="pt-2 text-center">
                <Button xl type="submit">
                  {submitButtonText}
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
