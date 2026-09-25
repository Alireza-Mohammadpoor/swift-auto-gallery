import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";
import { SITE_NAME } from "@/utils/seo";
import logo from "@/assets/logo.jpg";

export function About() {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title={`${t.about.title} | ${SITE_NAME}`}
        description={t.about.body}
        path="/about"
      />

      <section className="container-swift py-14 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <img src={logo} alt="Swift Auto Gallery" className="mx-auto h-20 w-20 object-contain" />
          <p className="section-label mt-6">{t.about.title}</p>
          <h1 className="mt-2 text-3xl font-bold text-swift-warm sm:text-4xl">{t.about.subtitle}</h1>
          <p className="mt-6 text-lg leading-relaxed text-swift-warm/80">{t.about.body}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {(language === "fa"
            ? ["فروش خودرو", "واردات و ترخیص", "پلاک منطقه آزاد"]
            : ["Vehicle Sales", "Import & Clearance", "Free Zone Plates"]
          ).map((item) => (
            <div key={item} className="surface-card p-6 text-center">
              <p className="text-sm font-semibold text-swift-gold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
