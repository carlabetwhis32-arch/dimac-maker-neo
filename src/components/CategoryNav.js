import Link from "next/link";

/**
 * "TODO" no es una categoría de la base de datos (sección 8): es solo la
 * ausencia del parámetro ?categoria en la URL. Usamos enlaces normales
 * (no botones + estado de React) a propósito: cambiar de categoría es
 * navegar a otra URL filtrada, así el filtro es compartible/enlazable y
 * no necesitamos JavaScript de cliente para algo tan simple.
 */
export default function CategoryNav({ categories, activeSlug }) {
  const isAllActive = !activeSlug || activeSlug === "todo";

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] border-b border-dashed border-border pb-px">
      <NavItem href="/" label="Todo" active={isAllActive} />
      {categories.map((cat) => (
        <NavItem
          key={cat.id}
          href={`/?categoria=${cat.slug}`}
          label={cat.name}
          active={activeSlug === cat.slug}
        />
      ))}
    </nav>
  );
}

function NavItem({ href, label, active }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "text-ink font-semibold border-b-2 border-accent pb-2 -mb-px"
          : "text-muted hover:text-ink pb-2 -mb-px border-b-2 border-transparent"
      }
    >
      {label}
    </Link>
  );
}
