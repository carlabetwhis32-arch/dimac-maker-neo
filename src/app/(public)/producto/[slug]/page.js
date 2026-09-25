import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AMAZON_DISCLOSURE_SHORT } from "@/lib/legalText";
import ImageGallery from "@/components/ImageGallery";
import BackButton from "@/components/BackButton";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
    },
  });

  // Un producto en borrador, o que no existe, no debe ser visible en la
  // web pública (solo desde el panel de admin).
  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BackButton label="Volver al catálogo" />

      <article className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ImageGallery images={product.images} productName={product.name} />

        <div className="space-y-6">
          <div>
            <span className="inline-block text-xs text-muted border border-border rounded-full px-2.5 py-0.5 mb-3">
              {product.category.name}
            </span>
            <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
            <p className="price-tag text-xl mt-2 text-copper">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-accent/40 pl-4">
            <h2 className="text-sm font-semibold text-ink">Descripción</h2>
            <p className="text-ink whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-copper/40 pl-4">
            <h2 className="text-sm font-semibold text-ink">Comentario DIMAC</h2>
            <p className="text-ink whitespace-pre-line leading-relaxed">
              {product.comment}
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-sm transition-colors"
            >
              Comprar en Amazon
            </a>
            {/* Declaración de afiliado justo junto al enlace: es el lugar que
                recomienda Amazon (ver src/lib/legalText.js). */}
            <p className="text-xs text-muted">{AMAZON_DISCLOSURE_SHORT}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
