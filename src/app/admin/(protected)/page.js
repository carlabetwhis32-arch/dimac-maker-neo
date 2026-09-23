import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "Panel — DIMAC MAKER" };

export default async function AdminDashboardPage() {
  const [published, drafts, categoryCount] = await Promise.all([
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.product.count({ where: { status: "DRAFT" } }),
    prisma.category.count(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-ink">Panel</h1>

      <div className="grid grid-cols-3 gap-4 max-w-lg">
        <Stat label="Publicados" value={published} />
        <Stat label="Borradores" value={drafts} />
        <Stat label="Categorías" value={categoryCount} />
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/productos/nuevo"
          className="inline-block bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + Nuevo producto
        </Link>
        <Link
          href="/admin/productos"
          className="inline-block border border-border text-sm font-medium px-4 py-2 rounded-md hover:bg-white"
        >
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-border rounded-md p-4 bg-white">
      <p className="text-2xl font-semibold text-ink">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}
