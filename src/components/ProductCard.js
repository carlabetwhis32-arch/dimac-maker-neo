import Link from "next/link";
import { formatPrice } from "@/lib/format";

/**
 * Tarjeta deliberadamente minimalista (sección 10): solo imagen, nombre y
 * precio. Nada de estrellas, badges de descuento ni texto extra que la
 * recargue. Es clicable en su totalidad y lleva a la ficha propia del
 * producto (NO directamente a Amazon, ver sección 11).
 */
export default function ProductCard({ product }) {
  const mainImage = product.images?.[0];

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-white border border-border">
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

      <div className="mt-3 space-y-0.5">
        <p className="text-sm text-ink leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-medium text-ink">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
