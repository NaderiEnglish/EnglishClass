import { useLanguage } from '../context/LanguageContext';
import { Section } from '../layout/Section';

const IntroVideo = () => {
  const { language } = useLanguage();
  const isPersian = language === 'fa';

  return (
    <Section
      title={isPersian ? 'معرفی مدرس و کلاس‌ها' : 'Meet Your Teacher'}
      description={
        isPersian
          ? 'در این ویدیو با روش تدریس و نحوه برگزاری کلاس‌ها آشنا شوید.'
          : 'Learn more about the teaching approach and how the classes work.'
      }
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="aspect-[16/9]">
            {isPersian ? (
              <iframe
                className="size-full"
                src="https://www.aparat.com/video/video/embed/videohash/zcmnb14/vt/frame"
                title="معرفی مدرس و کلاس‌های زبان انگلیسی"
                allowFullScreen
              />
            ) : (
              <iframe
                className="size-full"
                src="https://www.aparat.com/video/video/embed/videohash/zcmnb14/vt/frame"
                title="Introduction to English classes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export { IntroVideo };
