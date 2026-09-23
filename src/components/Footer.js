import Link from "next/link";
import { AMAZON_DISCLOSURE } from "@/lib/legalText";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-20">
      <div className="max-w-site mx-auto px-6 py-8 text-sm text-muted space-y-4">
        {/* Declaración de afiliado: visible en todas las páginas, tal y
            como exige el programa de Amazon Afiliados (ver src/lib/legalText.js). */}
        <p>{AMAZON_DISCLOSURE}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p>© {year} DIMAC MAKER</p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/legal/aviso-legal" className="hover:text-ink">
              Aviso legal
            </Link>
            <Link href="/legal/privacidad" className="hover:text-ink">
              Privacidad
            </Link>
            <Link href="/legal/cookies" className="hover:text-ink">
              Cookies
            </Link>
            <Link href="/legal/afiliacion-amazon" className="hover:text-ink">
              Afiliación con Amazon
            </Link>
            {/* Acceso al panel: discreto a propósito (sección 15: "el acceso
                no debe destacar en la web"), un simple candado en vez de un
                botón de "ADMIN". */}
            <Link
              href="/admin"
              aria-label="Acceso privado"
              className="hover:text-ink"
              title="Acceso privado"
            >
              🔒
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
