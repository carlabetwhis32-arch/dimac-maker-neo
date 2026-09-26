import Link from "next/link";
import { formatPrice } from "@/lib/format";

/**
 * Cuatro "acabados de cartulina" distintos por los que va rotando cada
 * tarjeta (según su posición en la rejilla), en vez de que todas sean
 * idénticas. Se apoya en índice, no en algo aleatorio, para que la rejilla
 * tenga siempre el mismo aspecto entre una carga de página y otra (una
 * mezcla al azar cambiaría en cada visita, lo que se vería como un fallo).
 */
const FINISHES = [
  { bg: "bg-paper", border: "border-border", tab: "bg-muted/50" },
  { bg: "bg-mint", border: "border-accent/40", tab: "bg-accent" },
  { bg: "bg-clay", border: "border-copper/40", tab: "bg-copper" },
  { bg: "bg-straw", border: "border-ochre/40", tab: "bg-ochre" },
];

/**
 * Tarjeta de producto (sección 10): imagen, nombre y precio, nada más.
 * La variedad de color viene del "finish" (fondo + borde + pestaña de
 * arriba), no de añadir más texto o iconos a la tarjeta.
 */
export default function ProductCard({ product, index = 0 }) {
  const mainImage = product.images?.[0];
  const finish = FINISHES[index % FINISHES.length];

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className={`h-1.5 w-9 rounded-full ${finish.tab} mb-2`} />

      <div
        className={`aspect-square w-full overflow-hidden rounded-sm ${finish.bg} border ${finish.border}`}
      >
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

      <div className="mt-3 space-y-1">
        <p className="text-sm text-ink leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="price-tag text-sm text-copper">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
