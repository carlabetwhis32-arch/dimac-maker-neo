import { prisma } from "@/lib/db";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";

// Página de servidor: no necesita "use client" porque toda la lectura de
// datos ocurre en el servidor (Next.js App Router). Esto evita tener que
// montar una API propia solo para listar productos (ver README, sección
// "Arquitectura").
export default async function HomePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const activeSlug = resolvedSearchParams?.categoria || null;

  const [categories, settings] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  // "TODO" (sección 8) es simplemente: no filtrar por categoría.
  const whereClause = {
    status: "PUBLISHED",
    ...(activeSlug ? { category: { slug: activeSlug } } : {}),
  };

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      category: { select: { slug: true } },
    },
  });

  return (
    <div className="space-y-5">
      <section>
        {/* Sin max-w: si el texto es corto, se ve corto y centrado; si el
            admin escribe una línea larga, se usa todo el ancho disponible.
            whitespace-pre-line respeta los saltos de línea que el propio
            admin escriba en el textarea de /admin/portada, en vez de que
            el navegador decida dónde cortar. */}
        <p className="text-base text-muted text-center whitespace-pre-line">
          {settings?.introText ??
            "Recomendaciones de piezas y herramientas para proyectos Maker."}
        </p>
      </section>

      <div className="hairline" />

      <section className="space-y-8">
        <CategoryNav categories={categories} activeSlug={activeSlug} />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
