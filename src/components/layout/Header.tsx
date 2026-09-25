import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.jpg";
import { buildPhoneUrl } from "@/utils/whatsapp";

export function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/vehicles", label: t.nav.vehicles },
    { to: "/services", label: t.nav.services },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-swift-border bg-swift-black/90 backdrop-blur">
      <div className="container-swift flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" aria-label="Swift Auto Gallery">
          <img src={logo} alt="Swift Auto Gallery" className="h-10 w-10 object-contain" />
          <span className="hidden text-sm font-bold tracking-wide text-swift-warm sm:block">
            {language === "fa" ? "اتو گالری سوییفت" : "SWIFT AUTO GALLERY"}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-swift-gold" : "text-swift-warm/80 hover:text-swift-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-md border border-swift-border px-3 py-2 text-xs font-medium text-swift-warm/80 transition-colors hover:border-swift-gold hover:text-swift-gold"
            aria-label="Switch language"
          >
            <Globe size={14} />
            {language === "fa" ? "EN" : "فا"}
          </button>
          <a href={buildPhoneUrl()} className="btn-gold !px-4 !py-2 text-xs">
            <Phone size={14} />
            {t.nav.callUs}
          </a>
        </div>

        <button
          className="text-swift-warm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-swift-border bg-swift-black md:hidden">
          <nav className="container-swift flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-sm font-medium ${
                    isActive ? "bg-swift-surface text-swift-gold" : "text-swift-warm/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 rounded-md border border-swift-border px-3 py-2 text-xs font-medium text-swift-warm/80"
              >
                <Globe size={14} />
                {language === "fa" ? "English" : "فارسی"}
              </button>
              <a href={buildPhoneUrl()} className="btn-gold !px-4 !py-2 text-xs">
                <Phone size={14} />
                {t.nav.callUs}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
