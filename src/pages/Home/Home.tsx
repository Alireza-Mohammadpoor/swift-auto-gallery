import { NavLink } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFeaturedVehicles } from "@/hooks/useVehicles";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { VehicleGridSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { SEO } from "@/components/common/SEO";
import { buildBusinessStructuredData, SITE_NAME } from "@/utils/seo";
import { buildPhoneUrl, buildWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from "@/utils/whatsapp";

export function Home() {
  const { t, language, direction } = useLanguage();
  const { data: featured, isLoading } = useFeaturedVehicles(6);
  const ArrowIcon = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <>
      <SEO
        title={`${SITE_NAME} | اتو گالری سوییفت`}
        description={
          language === "fa"
            ? "اتو گالری سوییفت - فروش و واردات خودرو، ترخیص گمرکی و پلاک منطقه آزاد در جزیره کیش."
            : "Swift Auto Gallery - premium vehicle sales and import services in Kish Island."
        }
        path="/"
        structuredData={buildBusinessStructuredData()}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-swift-border bg-gradient-to-b from-swift-charcoal to-swift-black">
        <div className="container-swift flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <p className="section-label animate-fadeIn">
            {language === "fa" ? "اتو گالری سوییفت" : "SWIFT AUTO GALLERY"}
          </p>
          <h1 className="mt-4 animate-fadeUp text-4xl font-extrabold text-swift-warm sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-2 animate-fadeUp text-lg text-swift-muted" style={{ animationDelay: "0.1s" }}>
            {t.hero.titleEn}
          </p>
          <p
            className="mt-6 max-w-xl animate-fadeUp text-base text-swift-warm/80"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fadeUp" style={{ animationDelay: "0.3s" }}>
            <NavLink to="/vehicles" className="btn-gold">
              {t.hero.ctaVehicles}
              <ArrowIcon size={16} />
            </NavLink>
            <NavLink to="/services" className="btn-outline">
              {t.hero.ctaServices}
            </NavLink>
          </div>
        </div>
      </section>

      {/* Featured vehicles */}
      <section className="container-swift py-16 lg:py-24">
        <div className="mb-10 text-center">
          <p className="section-label">{t.home.featuredTitle}</p>
          <h2 className="mt-2 text-2xl font-bold text-swift-warm sm:text-3xl">{t.home.featuredSubtitle}</h2>
        </div>

        {isLoading ? (
          <VehicleGridSkeleton />
        ) : featured && featured.length > 0 ? (
          <>
            <VehicleGrid vehicles={featured} />
            <div className="mt-10 text-center">
              <NavLink to="/vehicles" className="btn-outline">
                {t.hero.ctaVehicles}
              </NavLink>
            </div>
          </>
        ) : (
          <EmptyState title={t.home.noFeatured} />
        )}
      </section>

      {/* Services */}
      <section className="border-y border-swift-border bg-swift-charcoal py-16 lg:py-24">
        <div className="container-swift">
          <div className="mb-10 text-center">
            <p className="section-label">{t.home.servicesTitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((service) => (
              <div key={service.title} className="surface-card p-6">
                <h3 className="text-lg font-semibold text-swift-gold">{service.title}</h3>
                <p className="mt-2 text-sm text-swift-muted">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-swift py-16 lg:py-24">
        <div className="mb-10 text-center">
          <p className="section-label">{t.home.whyTitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {t.home.whyItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-swift-gold/40 text-swift-gold">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-swift-warm">{item.title}</h3>
              <p className="mt-2 text-sm text-swift-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Import process */}
      <section className="border-y border-swift-border bg-swift-charcoal py-16 lg:py-24">
        <div className="container-swift">
          <div className="mb-10 text-center">
            <p className="section-label">{t.home.processTitle}</p>
          </div>
          <ol className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-5">
            {t.home.processSteps.map((step, idx) => (
              <li key={step} className="surface-card flex flex-col items-center gap-2 p-4 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-swift-black">
                  {idx + 1}
                </span>
                <span className="text-xs text-swift-warm/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="container-swift py-16 text-center lg:py-24">
        <h2 className="text-2xl font-bold text-swift-warm sm:text-3xl">{t.home.ctaTitle}</h2>
        <p className="mt-2 text-swift-muted">{t.home.ctaSubtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href={buildPhoneUrl()} className="btn-gold">
            <Phone size={16} />
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <a
            href={buildWhatsAppUrl(
              language === "fa" ? "سلام، می‌خواستم اطلاعات بیشتری بگیرم." : "Hello, I'd like more information."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <MessageCircle size={16} />
            {t.vehicle.whatsapp}
          </a>
        </div>
      </section>
    </>
  );
}
