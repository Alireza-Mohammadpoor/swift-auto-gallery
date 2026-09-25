import { Car, FileCheck, IdCard, MessageSquare, Handshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";
import { SITE_NAME } from "@/utils/seo";
import { buildPhoneUrl, buildWhatsAppUrl } from "@/utils/whatsapp";

const icons = [Car, FileCheck, IdCard, MessageSquare, Handshake];

export function Services() {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title={`${t.services.title} | ${SITE_NAME}`}
        description={
          language === "fa"
            ? "خدمات واردات خودرو، ترخیص گمرکی و پلاک منطقه آزاد کیش در اتو گالری سوییفت."
            : "Vehicle import, customs clearance and Kish free-zone plate services at Swift Auto Gallery."
        }
        path="/services"
      />

      <section className="container-swift py-14 lg:py-20">
        <div className="mb-12 text-center">
          <p className="section-label">{t.services.title}</p>
          <h1 className="mt-2 text-3xl font-bold text-swift-warm sm:text-4xl">{t.services.subtitle}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={service.title} className="surface-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-swift-gold/10 text-swift-gold">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-swift-warm">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-swift-muted">{service.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold text-swift-warm">{t.services.ctaTitle}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href={buildPhoneUrl()} className="btn-gold">
              {t.contact.call}
            </a>
            <a
              href={buildWhatsAppUrl(
                language === "fa" ? "سلام، درباره خدمات واردات می‌خواستم بپرسم." : "Hello, I'd like to ask about your import services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {t.contact.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
