import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Learn English with Personalized, Practical Lessons"
    description="Contact us for a free consultation and find the right learning path for your English goals."
  >
    <VerticalFeatureRow
      title="Experienced English Teacher"
      description="IELTS Academic 7.5, PhD in Artificial Intelligence from the University of Tehran, and an online private English teacher with experience teaching more than 200 learners at different levels, including successful preparation for internationally recognized exams. — مدرس با نمره ۷.۵ آیلتس آکادمیک، دارای دکتری هوش مصنوعی از دانشگاه تهران و مدرس خصوصی آنلاین با سابقه آموزش به بیش از ۲۰۰ زبان‌آموز در سطوح مختلف و سابقه موفقیت در آزمون‌های معتبر."
      image="/assets/images/feature.svg"
      imageAlt="Experienced English teacher"
    />

    <VerticalFeatureRow
      title="Fully Personalized English Lessons"
      description="Every lesson is designed around your real needs. Class topics, exercises, and learning materials are personalized so you can learn English exactly where you need it most. — آموزش کاملاً شخصی‌سازی‌شده؛ موضوعات کلاس، تمرین‌ها و فایل‌های آموزشی بر اساس نیازهای واقعی شما طراحی می‌شوند تا انگلیسی را دقیقاً در حوزه‌هایی یاد بگیرید که برایتان کاربرد دارد."
      image="/assets/images/feature2.svg"
      imageAlt="Personalized English lessons"
      reverse
    />

    <VerticalFeatureRow
      title="Build Natural and Confident English Skills"
      description="Your speaking and writing are carefully analyzed, and you learn more natural, fluent, and practical ways to express your own ideas. Beginners can receive learning materials with Persian translations, while reading and listening are developed through real and up-to-date content. The goal is not simply to memorize vocabulary and grammar, but to speak English naturally, fluently, and with confidence. — فایل‌های صوتی و متون نوشتاری شما تحلیل شده و نسخه‌ای طبیعی‌تر، روان‌تر و کاربردی‌تر از جملات خودتان آموزش داده می‌شود. برای زبان‌آموزان مبتدی، فایل‌های آموزشی همراه با ترجمه ارائه می‌شود تا یادگیری سریع‌تر و ساده‌تر باشد. همچنین ریدینگ و لیسنینگ با محتوای واقعی و به‌روز آموزش داده می‌شود تا درک مطلب و تسلط شما به زبان تقویت شود. هدف فقط حفظ کردن لغات و گرامر نیست؛ هدف این است که بتوانید روان، طبیعی و با اعتمادبه‌نفس انگلیسی صحبت کنید."
      image="/assets/images/feature3.svg"
      imageAlt="Natural and confident English communication"
    />
  </Section>
);

export { VerticalFeatures };
