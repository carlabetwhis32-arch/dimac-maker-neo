import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import ConfirmSubmitButton from "@/components/ConfirmSubmitButton";
import { togglePublish, deleteProduct } from "./actions";

export const metadata = { title: "Productos — DIMAC MAKER" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { position: "asc" }, take: 1 },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">
          Productos ({products.length})
        </h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="border border-border rounded-md bg-paper divide-y divide-border">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3"
          >
            <div className="h-14 w-14 shrink-0 rounded bg-kraft border border-border overflow-hidden">
              {product.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0].url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/productos/${product.id}`}
                  className="text-sm font-medium text-ink hover:text-accent-dark truncate"
                >
                  {product.name}
                </Link>
                {product.isDemo && (
                  <span className="text-[10px] uppercase tracking-wide text-muted border border-border rounded px-1.5 py-0.5">
                    Demo
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5">
                {product.category.name} · {formatPrice(product.price)}
              </p>
            </div>

            <span
              className={
                product.status === "PUBLISHED"
                  ? "badge-published"
                  : "badge-draft"
              }
            >
              {product.status === "PUBLISHED" ? "Publicado" : "Borrador"}
            </span>

            <form action={togglePublish}>
              <input type="hidden" name="id" value={product.id} />
              <button
                type="submit"
                className="text-xs text-muted hover:text-ink border border-border rounded-md px-2 py-1"
              >
                {product.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
              </button>
            </form>

            <form action={deleteProduct}>
              <input type="hidden" name="id" value={product.id} />
              <ConfirmSubmitButton
                confirmMessage={`¿Eliminar "${product.name}" definitivamente?`}
                className="text-xs text-muted hover:text-accent-dark border border-border rounded-md px-2 py-1"
              >
                Eliminar
              </ConfirmSubmitButton>
            </form>
          </div>
        ))}

        {products.length === 0 && (
          <p className="p-6 text-sm text-muted text-center">
            Todavía no hay productos. Crea el primero.
          </p>
        )}
      </div>
    </div>
  );
}
