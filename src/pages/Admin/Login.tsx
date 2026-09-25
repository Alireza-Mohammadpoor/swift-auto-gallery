import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";
import logo from "@/assets/logo.jpg";

export function Login() {
  const { t } = useLanguage();
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) {
    const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? "/admin";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError(t.admin.invalidCredentials);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <>
      <SEO title={t.admin.loginTitle} description="Admin login" path="/admin/login" noindex />
      <div className="flex min-h-screen items-center justify-center bg-swift-black px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} alt="Swift Auto Gallery" className="h-16 w-16 object-contain" />
            <h1 className="mt-4 text-xl font-bold text-swift-warm">{t.admin.loginTitle}</h1>
          </div>

          <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-swift-warm/80">
                {t.admin.email}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-swift-muted" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-swift-border bg-swift-black py-2.5 ps-9 pe-3 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-swift-warm/80">
                {t.admin.password}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-swift-muted" />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-swift-border bg-swift-black py-2.5 ps-9 pe-3 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-gold w-full">
              {submitting ? t.admin.loggingIn : t.admin.login}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
