import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';
import { Footer } from '../templates/Footer';
import { Logo } from '../templates/Logo';

type CourseType = 'general' | 'ielts' | 'toefl' | 'speaking';
type TrialType = 'level' | 'full';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf1VmXXOhBwJ40UIZGGJLpMGvZqsljksuFEAcPDOOX75kpR5w/formResponse';

type NavbarProps = {
  isPersian: boolean;
};

const Navbar = ({ isPersian }: NavbarProps) => (
  <nav>
    <ul className="flex items-center justify-between">
      <li>
        <Link href="/">
          <Logo xl />
        </Link>
      </li>

      <li className="flex items-center gap-4">
        <Link href="/" className="text-gray-700 dark:text-gray-200">
          {isPersian ? 'خانه' : 'Home'}
        </Link>

        <ThemeToggle />
      </li>
    </ul>
  </nav>
);

const getCourseValue = (course: CourseType, isPersian: boolean) => {
  if (course === 'general') {
    return isPersian ? 'انگلیسی عمومی' : 'General English';
  }

  if (course === 'ielts') {
    return isPersian ? 'آیلتس' : 'IELTS';
  }

  if (course === 'toefl') {
    return isPersian ? 'تافل' : 'TOEFL';
  }

  return isPersian ? 'مکالمه' : 'Speaking';
};

const getTrialValue = (trialType: TrialType, isPersian: boolean) => {
  if (trialType === 'level') {
    return isPersian ? '۲۰ دقیقه تعیین سطح زبان' : '20-minute Level Assessment';
  }

  return isPersian
    ? '۲۰ دقیقه تعیین سطح + ۴۰ دقیقه جلسه رایگان'
    : '20-minute Level Assessment + 40-minute Free Lesson';
};

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!course || !trialType) {
      return;
    }

    setIsSubmitting(true);
    setSuccess(false);

    const submitForm = document.createElement('form');

    submitForm.method = 'POST';
    submitForm.action = GOOGLE_FORM_URL;
    submitForm.target = 'google-form-submit';
    submitForm.style.display = 'none';

    const fields = [
      {
        name: 'entry.441468348',
        value: name,
      },
      {
        name: 'entry.1329118742',
        value: phone,
      },
      {
        name: 'entry.799953698',
        value: country,
      },
      {
        name: 'entry.1774626949',
        value: getCourseValue(course, isPersian),
      },
      {
        name: 'entry.280271934',
        value: getTrialValue(trialType, isPersian),
      },
      {
        name: 'entry.10664830',
        value: additionalInfo,
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
      setTrialType('');
      setAdditionalInfo('');

      submitForm.remove();
    }, 1000);
  };

  let submitText = 'Request Free Trial';

  if (isPersian) {
    submitText = 'درخواست جلسه آزمایشی';
  }

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
          <Navbar isPersian={isPersian} />
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

                  <option value="speaking">
                    {isPersian ? 'دوره مکالمه' : 'Speaking Course'}
                  </option>
                </select>
              </div>

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
                      name="trialType"
                      value="level"
                      checked={trialType === 'level'}
                      onChange={() => setTrialType('level')}
                      className="sr-only"
                    />

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isPersian
                        ? 'تعیین سطح زبان'
                        : '20-Minute Level Assessment'}
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
                      name="trialType"
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

              <div>
                <label
                  htmlFor="additionalInfo"
                  className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                >
                  {isPersian ? 'اطلاعات تکمیلی' : 'Additional Information'}
                </label>

                <textarea
                  id="additionalInfo"
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
        </div>
      </Section>

      <Footer />

      <iframe
        name="google-form-submit"
        title="Google Form submission"
        className="hidden"
      />
    </main>
  );
};

export default TrialSession;
