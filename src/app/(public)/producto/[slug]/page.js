import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AMAZON_DISCLOSURE_SHORT } from "@/lib/legalText";
import { getCategoryColor } from "@/lib/categoryColors";
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

  const color = getCategoryColor(product.category.slug);

  return (
    <div className="space-y-6">
      <BackButton label="Volver al catálogo" />

      <article className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ImageGallery images={product.images} productName={product.name} />

        <div className="space-y-6">
          <div>
            <span
              className={`inline-block text-xs font-bold text-paper border-2 border-ink rounded-full px-3 py-1 mb-3 ${color.solid}`}
            >
              {product.category.name}
            </span>
            <h1 className="font-sans text-2xl font-bold text-ink">{product.name}</h1>
            <p className="price-tag text-xl mt-2">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-2 border-l-[3px] border-ink pl-4">
            <h2 className="font-sans text-sm font-bold text-ink">Descripción</h2>
            <p className="text-ink whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className={`space-y-2 border-l-[3px] pl-4 ${color.border}`}>
            <h2 className="font-sans text-sm font-bold text-ink">Comentario DIMAC</h2>
            <p className="text-ink whitespace-pre-line leading-relaxed">
              {product.comment}
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="press inline-block bg-sun hover:bg-sun-dark text-ink font-sans font-bold px-6 py-3 rounded-lg border-2 border-ink shadow-hard transition-all"
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
