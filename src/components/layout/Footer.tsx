import { NavLink } from "react-router-dom";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.jpg";
import { INSTAGRAM_URL, BUSINESS_PHONE_DISPLAY, buildPhoneUrl } from "@/utils/whatsapp";

export function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-swift-border bg-swift-charcoal">
      <div className="container-swift grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Swift Auto Gallery" className="h-9 w-9 object-contain" />
            <span className="text-sm font-bold text-swift-warm">
              {language === "fa" ? "اتو گالری سوییفت" : "SWIFT AUTO GALLERY"}
            </span>
          </div>
          <p className="mt-3 text-sm text-swift-muted">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="section-label mb-4">{t.footer.quickLinks}</h3>
          <ul className="space-y-2 text-sm text-swift-muted">
            <li><NavLink to="/vehicles" className="hover:text-swift-gold">{t.nav.vehicles}</NavLink></li>
            <li><NavLink to="/services" className="hover:text-swift-gold">{t.nav.services}</NavLink></li>
            <li><NavLink to="/about" className="hover:text-swift-gold">{t.nav.about}</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-swift-gold">{t.nav.contact}</NavLink></li>
          </ul>
        </div>

        <div>
          <h3 className="section-label mb-4">{t.footer.services}</h3>
          <ul className="space-y-2 text-sm text-swift-muted">
            {t.services.items.slice(0, 4).map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="section-label mb-4">{t.footer.contact}</h3>
          <ul className="space-y-3 text-sm text-swift-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-swift-gold" />
              <span>{t.contact.address}</span>
            </li>
            <li>
              <a href={buildPhoneUrl()} className="flex items-center gap-2 hover:text-swift-gold">
                <Phone size={16} className="text-swift-gold" />
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-swift-gold"
              >
                <Instagram size={16} className="text-swift-gold" />
                swift.autogallery
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-swift-border py-5 text-center text-xs text-swift-muted">
        © {year} Swift Auto Gallery. {t.footer.rights}
      </div>
    </footer>
  );
}
