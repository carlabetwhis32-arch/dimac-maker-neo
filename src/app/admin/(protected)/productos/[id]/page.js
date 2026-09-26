import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import {
  updateProduct,
  deleteImage,
  moveImage,
} from "../actions";

export const metadata = { title: "Editar producto — DIMAC MAKER" };

export default async function EditProductPage({ params, searchParams }) {
  const { id: idParam } = await params;
  const resolvedSearchParams = await searchParams;
  const id = Number(idParam);

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">
          Editar: {product.name}
        </h1>
        <a
          href={`/producto/${product.slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted hover:text-ink underline"
        >
          Ver en la web →
        </a>
      </div>

      {resolvedSearchParams?.saved && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          Cambios guardados.
        </p>
      )}
      {resolvedSearchParams?.error && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          {resolvedSearchParams.error}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
          Imágenes actuales
        </h2>
        <p className="text-xs text-muted">
          La primera imagen (posición 1) es la que se usa como imagen
          principal en el catálogo y en la ficha del producto.
        </p>

        {product.images.length === 0 && (
          <p className="text-sm text-muted">
            Este producto todavía no tiene imágenes.
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          {product.images.map((image, index) => (
            <div
              key={image.id}
              className="w-32 border border-border rounded-md bg-paper p-2 space-y-2"
            >
              <div className="relative aspect-square rounded overflow-hidden bg-base">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute top-1 left-1 badge-published">
                    Principal
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-1">
                <form action={moveImage}>
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="text-xs border border-border rounded px-1.5 py-0.5 disabled:opacity-30"
                    title="Mover a la izquierda / arriba"
                  >
                    ←
                  </button>
                </form>
                <form action={moveImage}>
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={index === product.images.length - 1}
                    className="text-xs border border-border rounded px-1.5 py-0.5 disabled:opacity-30"
                    title="Mover a la derecha / abajo"
                  >
                    →
                  </button>
                </form>
                <form action={deleteImage}>
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="productId" value={product.id} />
                  <button
                    type="submit"
                    className="text-xs text-muted hover:text-accent-dark"
                    title="Eliminar imagen"
                  >
                    ✕
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
          Datos del producto
        </h2>
        <ProductForm
          action={updateProduct}
          categories={categories}
          product={product}
          submitLabel="Guardar cambios"
        />
      </section>
    </div>
  );
}
