import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { Menu } from '../components/Menu';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <Background color="bg-gray-100 dark:bg-gray-900">
      <Section yPadding="py-6">
        <NavbarTwoColumns
          logo={
            <div className="flex flex-col items-center">
              <Logo xl />

              <a
                href="tel:+989397975094"
                className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                📞 +98 939 797 5094
              </a>
            </div>
          }
        >
          <li>
            <ThemeToggle />
          </li>

          <li>
            <Menu />
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {isPersian ? (
                <>
                  {'آموزش زبان انگلیسی\n'}
                  <span className="text-primary-500">
                    به روشی ساده و کاربردی
                  </span>
                </>
              ) : (
                <>
                  {'Learn English\n'}
                  <span className="text-primary-500">the practical way</span>
                </>
              )}
            </>
          }
          description={
            isPersian
              ? 'آموزش خصوصی و کاملاً شخصی‌سازی‌شده زبان انگلیسی برای زبان‌آموزان در سطوح مختلف، آیلتس و تافل.'
              : 'Personalized private English lessons for learners at different levels, including IELTS and TOEFL preparation.'
          }
          button={
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/trialsession">
                <Button xl>
                  🎁 {isPersian ? 'جلسه آزمایشی رایگان' : 'Free Trial Session'}
                </Button>
              </Link>
              <Link href="/courses">
                <Button xl>
                  📚 {isPersian ? 'مشاهده دوره‌ها' : 'View Courses'}
                </Button>
              </Link>
              <Link href="/registration">
                <Button xl>
                  🚀 {isPersian ? 'ثبت نام دوره‌ها' : 'Courses Registration'}
                </Button>
              </Link>
            </div>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };
