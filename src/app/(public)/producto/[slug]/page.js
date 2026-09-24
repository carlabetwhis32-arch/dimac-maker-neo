import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AMAZON_DISCLOSURE_SHORT } from "@/lib/legalText";
import ImageGallery from "@/components/ImageGallery";

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
    <article className="grid md:grid-cols-2 gap-10 lg:gap-16">
      <ImageGallery images={product.images} productName={product.name} />

      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted mb-2">
            {product.category.name}
          </p>
          <h1 className="text-2xl font-semibold text-ink">{product.name}</h1>
          <p className="text-xl mt-2 text-ink">{formatPrice(product.price)}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
            Descripción
          </h2>
          <p className="text-ink whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
            Comentario DIMAC
          </h2>
          <p className="text-ink whitespace-pre-line leading-relaxed">
            {product.comment}
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Comprar en Amazon
          </a>
          {/* Declaración de afiliado justo junto al enlace: es el lugar que
              recomienda Amazon (ver src/lib/legalText.js). */}
          <p className="text-xs text-muted">{AMAZON_DISCLOSURE_SHORT}</p>
        </div>
      </div>
    </article>
  );
}
