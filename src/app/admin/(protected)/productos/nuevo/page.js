import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const metadata = { title: "Nuevo producto — DIMAC MAKER" };

export default async function NewProductPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">Nuevo producto</h1>

      {categories.length === 0 && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          Todavía no hay ninguna categoría. Crea una primero en{" "}
          <a href="/admin/categorias" className="underline">
            Categorías
          </a>
          .
        </p>
      )}

      {resolvedSearchParams?.error && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          {resolvedSearchParams.error}
        </p>
      )}

      <ProductForm
        action={createProduct}
        categories={categories}
        submitLabel="Crear producto"
      />
    </div>
  );
}
