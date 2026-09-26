import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getCategoryColor } from "@/lib/categoryColors";

/**
 * Tarjeta de producto (sección 10): imagen, nombre y precio, dentro de
 * una única tarjeta redondeada y con separación clara del fondo. El color
 * viene de la categoría del producto (no rota al azar): así, dentro de
 * "Electrónica", todas las tarjetas comparten el mismo color, y en "Todo"
 * se ven los distintos colores mezclados.
 */
export default function ProductCard({ product }) {
  const mainImage = product.images?.[0];
  const color = getCategoryColor(product.category?.slug);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className={`group block rounded-xl overflow-hidden bg-paper border-2 ${color.borderSoft} shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Franja de color: identifica la categoría de un vistazo, sin que
          el color invada toda la tarjeta ni compita con la foto. */}
      <div className={`h-1.5 ${color.solid}`} />

      <div className="aspect-square w-full overflow-hidden bg-base">
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImage.url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <p className="text-sm text-ink leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="price-tag text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
