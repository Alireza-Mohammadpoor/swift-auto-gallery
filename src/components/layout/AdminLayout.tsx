import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.jpg";

export function AdminLayout() {
  const { signOut, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const links = [
    { to: "/admin", label: t.admin.dashboard, icon: LayoutDashboard, end: true },
    { to: "/admin/vehicles", label: t.admin.manageVehicles, icon: Car, end: false },
  ];

  return (
    <div className="flex min-h-screen bg-swift-black">
      <aside className="hidden w-64 shrink-0 border-e border-swift-border bg-swift-charcoal md:flex md:flex-col">
        <div className="flex items-center gap-2 border-b border-swift-border px-6 py-5">
          <img src={logo} alt="Swift Auto Gallery" className="h-8 w-8 object-contain" />
          <span className="text-sm font-bold text-swift-warm">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-swift-gold/10 text-swift-gold"
                    : "text-swift-warm/70 hover:bg-swift-surface hover:text-swift-warm"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-swift-border p-4">
          <p className="mb-3 truncate text-xs text-swift-muted">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md border border-swift-border px-3 py-2 text-sm text-swift-warm/80 hover:border-swift-gold hover:text-swift-gold"
          >
            <LogOut size={16} />
            {t.admin.logout}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-swift-border bg-swift-charcoal px-4 py-4 md:hidden">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Swift Auto Gallery" className="h-7 w-7 object-contain" />
            <span className="text-sm font-bold text-swift-warm">Admin</span>
          </div>
          <button onClick={handleLogout} className="text-xs text-swift-warm/80">
            {t.admin.logout}
          </button>
        </header>
        <nav className="flex gap-2 border-b border-swift-border bg-swift-charcoal px-4 py-2 md:hidden">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs font-medium ${
                  isActive ? "bg-swift-gold/10 text-swift-gold" : "text-swift-warm/70"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
