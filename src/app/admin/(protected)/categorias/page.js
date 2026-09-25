import { prisma } from "@/lib/db";
import ConfirmSubmitButton from "@/components/ConfirmSubmitButton";
import { createCategory, updateCategory, deleteCategory } from "./actions";

export const metadata = { title: "Categorías — DIMAC MAKER" };

export default async function AdminCategoriesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-10 max-w-3xl">
      <h1 className="text-xl font-semibold text-ink">Categorías</h1>

      {resolvedSearchParams?.error && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          {resolvedSearchParams.error}
        </p>
      )}

      <section className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-border rounded-md p-4 bg-paper space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                /{category.slug} · {category._count.products} producto(s)
              </span>
              {/* Formulario independiente (hermano, no anidado: HTML no
                  permite <form> dentro de <form>) para el borrado. */}
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={category.id} />
                <ConfirmSubmitButton
                  confirmMessage={`¿Eliminar la categoría "${category.name}"?`}
                  className="text-xs text-muted hover:text-accent-dark"
                >
                  Eliminar
                </ConfirmSubmitButton>
              </form>
            </div>

            <form action={updateCategory} className="space-y-3">
              <input type="hidden" name="id" value={category.id} />
              <input
                name="name"
                defaultValue={category.name}
                required
                className="w-full border border-border rounded-md px-3 py-2 text-sm"
                placeholder="Nombre"
              />
              <textarea
                name="description"
                defaultValue={category.description ?? ""}
                rows={2}
                className="w-full border border-border rounded-md px-3 py-2 text-sm"
                placeholder="Descripción (opcional)"
              />
              <button
                type="submit"
                className="text-sm bg-ink text-white px-4 py-1.5 rounded-md hover:bg-ink/90"
              >
                Guardar
              </button>
            </form>
          </div>
        ))}
      </section>

      <section className="border border-dashed border-border rounded-md p-4 space-y-3">
        <h2 className="text-sm font-semibold text-ink">Nueva categoría</h2>
        <form action={createCategory} className="space-y-3">
          <input
            name="name"
            required
            placeholder="Nombre"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
          />
          <textarea
            name="description"
            rows={2}
            placeholder="Descripción (opcional)"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
          />
          <button
            type="submit"
            className="text-sm bg-accent hover:bg-accent-dark text-white px-4 py-1.5 rounded-md"
          >
            Crear categoría
          </button>
        </form>
      </section>
    </div>
  );
}
