import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";

/**
 * "TODO" no es una categoría de la base de datos (sección 8): es solo la
 * ausencia del parámetro ?categoria en la URL. Cada categoría real muestra
 * un punto de su color fijo (ver src/lib/categoryColors.js), para que el
 * selector funcione también como leyenda de colores del catálogo.
 */
export default function CategoryNav({ categories, activeSlug }) {
  const isAllActive = !activeSlug || activeSlug === "todo";

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
      <NavItem href="/" label="Todo" active={isAllActive} />
      {categories.map((cat) => (
        <NavItem
          key={cat.id}
          href={`/?categoria=${cat.slug}`}
          label={cat.name}
          active={activeSlug === cat.slug}
          color={getCategoryColor(cat.slug)}
        />
      ))}
    </nav>
  );
}

function NavItem({ href, label, active, color }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 pb-1 border-b-2 transition-colors ${
        active
          ? `text-ink font-semibold ${color ? color.border : "border-ink"}`
          : "text-muted hover:text-ink border-transparent"
      }`}
    >
      {color && <span className={`h-2 w-2 rounded-full ${color.solid}`} />}
      {label}
    </Link>
  );
}
