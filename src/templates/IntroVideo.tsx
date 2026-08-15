import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';

const IntroVideo = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <Section
      title={isPersian ? 'معرفی دوره و مدرس' : 'Introduction'}
      description={
        isPersian
          ? 'در این ویدیو با روش تدریس و نحوه برگزاری کلاس‌ها آشنا شوید.'
          : 'Learn more about the teaching approach and how the classes work.'
      }
    >
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <video
            className="h-auto w-full"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/assets/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Section>
  );
};

export { IntroVideo };
