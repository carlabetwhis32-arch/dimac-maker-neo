import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isSessionValid, SESSION_COOKIE_NAME } from "@/lib/auth";
import { logoutAction } from "../login/actions";

/**
 * Este layout envuelve todo lo que hay bajo /admin EXCEPTO /admin/login
 * (que vive fuera del grupo de rutas "(protected)"). Es el único sitio
 * donde se comprueba la sesión: como todas las páginas de admin están
 * dentro de este grupo, no hace falta repetir esta comprobación en cada
 * página.
 */
export default async function ProtectedAdminLayout({ children }) {
  // A partir de Next.js 15/16, cookies() devuelve una promesa: hay que
  // esperarla antes de poder leer una cookie concreta.
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!isSessionValid(sessionCookie)) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-site mx-auto px-6 py-8 space-y-8">
      <div className="hairline pb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-8">
          <span className="text-sm tracking-wide font-semibold text-ink">
            DIMAC — MAKER
          </span>
          <nav className="flex gap-6 text-sm">
            <AdminNavLink href="/admin">Panel</AdminNavLink>
            <AdminNavLink href="/admin/productos">Productos</AdminNavLink>
            <AdminNavLink href="/admin/categorias">Categorías</AdminNavLink>
            <AdminNavLink href="/admin/portada">Portada</AdminNavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            Ver la web →
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-muted hover:text-ink"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {children}
    </div>
  );
}

function AdminNavLink({ href, children }) {
  return (
    <Link href={href} className="text-ink hover:text-accent-dark">
      {children}
    </Link>
  );
}
