import Link from "next/link";

/**
 * Cabecera sin logo/icono (sección 6: solo texto), pero con mucha más
 * presencia tipográfica que antes. El "MAKER" lleva detrás una franja de
 * amarillo de marca, como un subrayado de rotulador fluorescente sobre un
 * cuaderno — un guiño DIY que no depende de ningún icono ni imagen.
 */
export default function Header() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="max-w-site mx-auto px-6 py-4">
        <Link
          href="/"
          className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-ink inline-flex items-baseline gap-2"
        >
          <span>DIMAC</span>
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-0.5 h-2.5 bg-sun -z-10" />
            MAKER
          </span>
        </Link>
      </div>
    </header>
  );
}
