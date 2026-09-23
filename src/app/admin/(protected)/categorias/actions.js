"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function createCategory(formData) {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || null;

  if (!name) {
    redirect("/admin/categorias?error=El+nombre+es+obligatorio");
  }

  const slug = await uniqueSlug(name, (candidate) =>
    prisma.category.findUnique({ where: { slug: candidate } }).then(Boolean)
  );

  await prisma.category.create({ data: { name, description, slug } });

  // Revalidamos la portada pública: al añadir una categoría nueva, debe
  // aparecer en la navegación sin tener que reiniciar el servidor.
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function updateCategory(formData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || null;

  if (!id || !name) {
    redirect("/admin/categorias?error=Datos+incompletos");
  }

  await prisma.category.update({
    where: { id },
    data: { name, description },
  });

  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function deleteCategory(formData) {
  const id = Number(formData.get("id"));

  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });

  // No permitimos borrar una categoría que todavía tiene productos: si lo
  // hiciéramos, esos productos se quedarían sin categoría (o la base de
  // datos rechazaría el borrado, según el motor). Es más claro pedir que
  // se reasignen antes.
  if (productCount > 0) {
    redirect(
      `/admin/categorias?error=No+se+puede+borrar%3A+tiene+${productCount}+producto(s)+asignado(s)`
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
