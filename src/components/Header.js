import Link from "next/link";

/**
 * Cabecera deliberadamente austera: solo texto (sección 6 del encargo pide
 * explícitamente "sin logo, sin icono, sin símbolo"). El único elemento
 * interactivo es el propio nombre, que lleva a portada.
 */
export default function Header() {
  return (
    <header className="hairline border-t-0 border-b">
      <div className="max-w-site mx-auto px-6 py-4">
        <Link
          href="/"
          className="text-xl tracking-tight font-bold text-ink"
        >
          DIMAC <span className="text-accent">—</span> MAKER
        </Link>
      </div>
    </header>
  );
}
