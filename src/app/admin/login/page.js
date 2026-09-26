import Link from "next/link";
import { loginAction } from "./actions";

export const metadata = { title: "Acceso privado — DIMAC MAKER" };

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const hasError = resolvedSearchParams?.error === "1";
  const isConfigError = resolvedSearchParams?.error === "config";
  const configMessage = resolvedSearchParams?.message;

  return (
    <div className="max-w-sm mx-auto py-16 px-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver a la web
      </Link>
      <h1 className="text-xl font-semibold text-ink mb-1">Acceso privado</h1>
      <p className="text-sm text-muted mb-6">
        Panel de administración de DIMAC MAKER.
      </p>

      <form action={loginAction} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm text-ink mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full border border-border rounded-md px-3 py-2 bg-paper focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {hasError && (
          <p className="text-sm text-accent-dark">Contraseña incorrecta.</p>
        )}

        {isConfigError && (
          <div className="text-sm text-warn bg-warn/10 border border-warn/30 rounded-md px-3 py-2">
            <p className="font-medium mb-1">Hay un problema en la configuración, no en la contraseña:</p>
            <p>{configMessage}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-2 rounded-md transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
