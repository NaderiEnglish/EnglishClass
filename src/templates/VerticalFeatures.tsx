import { useLanguage } from '../context/LanguageContext';
import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <Section
      title={
        isPersian
          ? 'آموزش زبان انگلیسی به صورت شخصی‌سازی‌شده و کاربردی'
          : 'Learn English with Personalized, Practical Lessons'
      }
      description={
        isPersian
          ? 'برای راهنمایی رایگان تماس بگیرید و بهترین مسیر یادگیری زبان انگلیسی را متناسب با اهداف خود پیدا کنید.'
          : 'Contact us for a free consultation and find the right learning path for your English goals.'
      }
    >
      <VerticalFeatureRow
        title={
          isPersian
            ? 'مدرس با تجربه زبان انگلیسی'
            : 'Experienced English Teacher'
        }
        description={
          isPersian
            ? 'مدرس با نمره ۷.۵ آیلتس آکادمیک، دارای دکتری هوش مصنوعی از دانشگاه تهران و مدرس خصوصی آنلاین با سابقه آموزش به بیش از ۲۰۰ زبان‌آموز در سطوح مختلف و سابقه موفقیت در آزمون‌های معتبر.'
            : 'IELTS Academic 7.5, PhD in Artificial Intelligence from the University of Tehran, and an online private English teacher with experience teaching more than 200 learners at different levels and helping students prepare successfully for internationally recognized exams.'
        }
        image="/assets/images/feature.svg"
        imageAlt={
          isPersian ? 'مدرس با تجربه زبان انگلیسی' : 'Experienced English teacher'
        }
      />

      <VerticalFeatureRow
        title={
          isPersian
            ? 'آموزش کاملاً شخصی‌سازی‌شده'
            : 'Fully Personalized English Lessons'
        }
        description={
          isPersian
            ? 'موضوعات کلاس، تمرین‌ها و فایل‌های آموزشی بر اساس نیازهای واقعی شما طراحی می‌شوند تا انگلیسی را دقیقاً در حوزه‌هایی یاد بگیرید که برایتان کاربرد دارد.'
            : 'Every lesson is designed around your real needs. Class topics, exercises, and learning materials are personalized so you can learn English exactly where you need it most.'
        }
        image="/assets/images/feature2.svg"
        imageAlt={
          isPersian
            ? 'آموزش کاملاً شخصی‌سازی‌شده'
            : 'Personalized English lessons'
        }
        reverse
      />

      <VerticalFeatureRow
        title={
          isPersian
            ? 'تقویت مهارت‌های طبیعی و بااعتمادبه‌نفس'
            : 'Build Natural and Confident English Skills'
        }
        description={
          isPersian
            ? 'فایل‌های صوتی و متون نوشتاری شما تحلیل شده و نسخه‌ای طبیعی‌تر، روان‌تر و کاربردی‌تر از جملات خودتان آموزش داده می‌شود. برای زبان‌آموزان مبتدی، فایل‌های آموزشی همراه با ترجمه ارائه می‌شود تا یادگیری سریع‌تر و ساده‌تر باشد. ریدینگ و لیسنینگ با محتوای واقعی و به‌روز آموزش داده می‌شود تا درک مطلب و تسلط شما به زبان تقویت شود. هدف فقط حفظ کردن لغات و گرامر نیست؛ هدف این است که بتوانید روان، طبیعی و با اعتمادبه‌نفس انگلیسی صحبت کنید.'
            : 'Your speaking and writing are carefully analyzed, and you learn more natural, fluent, and practical ways to express your own ideas. For beginners, learning materials can be provided with Persian translations to make learning faster and easier. Reading and listening are taught through real and up-to-date content to improve comprehension and overall fluency. The goal is not simply to memorize vocabulary and grammar, but to speak English naturally, fluently, and with confidence.'
        }
        image="/assets/images/feature3.svg"
        imageAlt={
          isPersian
            ? 'تقویت مهارت‌های زبان انگلیسی'
            : 'Natural and confident English communication'
        }
      />
    </Section>
  );
};

export { VerticalFeatures };
