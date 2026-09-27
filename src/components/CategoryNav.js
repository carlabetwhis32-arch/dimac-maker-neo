import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";

/**
 * "TODO" no es una categoría de la base de datos (sección 8): es solo la
 * ausencia del parámetro ?categoria en la URL. Cada categoría es un
 * "sello": borde negro grueso siempre, relleno sólido de su color solo
 * cuando está activa (si no, va en blanco con el texto de su color).
 */
export default function CategoryNav({ categories, activeSlug }) {
  const isAllActive = !activeSlug || activeSlug === "todo";

  return (
    <nav className="flex flex-wrap gap-3">
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
  const base =
    "press font-sans text-sm font-semibold px-3.5 py-1.5 rounded-full border-2 border-ink shadow-hard-sm hover:shadow-hard-press hover:translate-x-[2px] hover:translate-y-[2px] transition-all";

  if (!color) {
    // "Todo": neutro, sin color de categoría.
    return (
      <Link
        href={href}
        className={`${base} ${active ? "bg-ink text-paper" : "bg-paper text-ink"}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${active ? `${color.solid} text-ink` : `bg-paper ${color.text}`}`}
    >
      {label}
    </Link>
  );
}
