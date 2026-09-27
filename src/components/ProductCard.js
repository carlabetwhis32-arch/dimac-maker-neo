import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getCategoryColor } from "@/lib/categoryColors";

/**
 * Tarjeta "de pegatina troquelada": borde negro grueso + sombra dura sin
 * difuminado que se aplasta al pulsar (clase .press). El color de la
 * categoría vive en la franja sólida de arriba, separada del resto por
 * una línea negra — no es un tinte de fondo, es una etiqueta de color.
 */
export default function ProductCard({ product }) {
  const mainImage = product.images?.[0];
  const color = getCategoryColor(product.category?.slug);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="press group block rounded-lg border-[3px] border-ink bg-paper shadow-hard hover:shadow-hard-sm hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
    >
      <div className={`h-3 ${color.solid} border-b-[3px] border-ink`} />

      <div className="aspect-square w-full overflow-hidden bg-canvas">
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImage.url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-3 space-y-1 border-t-[3px] border-ink">
        <p className="text-sm text-ink leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="price-tag text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
