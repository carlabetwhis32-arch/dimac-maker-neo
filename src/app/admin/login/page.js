import { loginAction } from "./actions";

export const metadata = { title: "Acceso privado — DIMAC MAKER" };

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const hasError = resolvedSearchParams?.error === "1";

  return (
    <div className="max-w-sm mx-auto py-16 px-6">
      <p className="text-sm tracking-wide font-semibold text-ink mb-8">
        DIMAC — MAKER
      </p>
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
            className="w-full border border-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {hasError && (
          <p className="text-sm text-accent-dark">Contraseña incorrecta.</p>
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
