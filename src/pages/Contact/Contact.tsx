import { Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";
import { buildBusinessStructuredData, SITE_NAME } from "@/utils/seo";
import { buildPhoneUrl, buildWhatsAppUrl, INSTAGRAM_URL, BUSINESS_PHONE_DISPLAY } from "@/utils/whatsapp";

export function Contact() {
  const { t, language } = useLanguage();

  const actions = [
    {
      icon: Phone,
      label: t.contact.call,
      value: BUSINESS_PHONE_DISPLAY,
      href: buildPhoneUrl(),
    },
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: BUSINESS_PHONE_DISPLAY,
      href: buildWhatsAppUrl(
        language === "fa" ? "سلام، می‌خواستم با شما در تماس باشم." : "Hello, I'd like to get in touch."
      ),
      external: true,
    },
    {
      icon: Instagram,
      label: t.contact.instagramCta,
      value: `@${t.contact.instagram}`,
      href: INSTAGRAM_URL,
      external: true,
    },
  ];

  return (
    <>
      <SEO
        title={`${t.contact.title} | ${SITE_NAME}`}
        description={
          language === "fa"
            ? "اطلاعات تماس اتو گالری سوییفت در جزیره کیش - تلفن، واتس‌اپ و اینستاگرام."
            : "Contact Swift Auto Gallery in Kish Island - phone, WhatsApp and Instagram."
        }
        path="/contact"
        structuredData={buildBusinessStructuredData()}
      />

      <section className="container-swift py-14 lg:py-20">
        <div className="mb-12 text-center">
          <p className="section-label">{t.contact.subtitle}</p>
          <h1 className="mt-2 text-3xl font-bold text-swift-warm sm:text-4xl">{t.contact.title}</h1>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="surface-card mb-8 flex items-start gap-3 p-6">
            <MapPin size={20} className="mt-0.5 shrink-0 text-swift-gold" />
            <p className="text-swift-warm/90">{t.contact.address}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="surface-card flex flex-col items-center gap-3 p-6 text-center transition-colors hover:border-swift-gold/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-swift-gold/10 text-swift-gold">
                  <action.icon size={20} />
                </div>
                <p className="text-sm font-semibold text-swift-warm">{action.label}</p>
                <p className="text-xs text-swift-muted" dir="ltr">{action.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
