"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/uploads";

/** Lee y valida los campos comunes de texto del formulario de producto. */
function readProductFields(formData) {
  return {
    name: formData.get("name")?.toString().trim(),
    price: Number(formData.get("price")),
    categoryId: Number(formData.get("categoryId")),
    description: formData.get("description")?.toString().trim(),
    comment: formData.get("comment")?.toString().trim(),
    amazonUrl: formData.get("amazonUrl")?.toString().trim(),
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
  };
}

/** Guarda en disco los archivos de imagen no vacíos de un campo <input multiple>. */
async function saveNewImages(formData, fieldName = "images") {
  const files = formData.getAll(fieldName).filter((f) => f && f.size > 0);
  const urls = [];
  for (const file of files) {
    urls.push(await saveUploadedFile(file));
  }
  return urls;
}

export async function createProduct(formData) {
  const fields = readProductFields(formData);

  if (!fields.name || !fields.categoryId || !fields.amazonUrl) {
    redirect("/admin/productos/nuevo?error=Faltan+campos+obligatorios");
  }

  const slug = await uniqueSlug(fields.name, (candidate) =>
    prisma.product.findUnique({ where: { slug: candidate } }).then(Boolean)
  );

  const imageUrls = await saveNewImages(formData);

  const product = await prisma.product.create({
    data: {
      ...fields,
      slug,
      images: {
        create: imageUrls.map((url, index) => ({ url, position: index })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect(`/admin/productos/${product.id}`);
}

export async function updateProduct(formData) {
  const id = Number(formData.get("id"));
  const fields = readProductFields(formData);

  if (!id || !fields.name || !fields.categoryId || !fields.amazonUrl) {
    redirect(`/admin/productos/${id}?error=Faltan+campos+obligatorios`);
  }

  const existing = await prisma.product.findUnique({ where: { id } });

  // Si cambia el nombre, regeneramos el slug (manteniendo el mismo si el
  // nombre no ha cambiado, para no romper enlaces ya compartidos).
  const slug =
    existing.name === fields.name
      ? existing.slug
      : await uniqueSlug(fields.name, async (candidate) => {
          if (candidate === existing.slug) return false;
          return Boolean(
            await prisma.product.findUnique({ where: { slug: candidate } })
          );
        });

  const newImageUrls = await saveNewImages(formData);
  let maxPosition = 0;
  if (newImageUrls.length > 0) {
    const last = await prisma.productImage.findFirst({
      where: { productId: id },
      orderBy: { position: "desc" },
    });
    maxPosition = last ? last.position + 1 : 0;
  }

  await prisma.product.update({
    where: { id },
    data: {
      ...fields,
      slug,
      images: {
        create: newImageUrls.map((url, index) => ({
          url,
          position: maxPosition + index,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/producto/${slug}`);
  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  redirect(`/admin/productos/${id}?saved=1`);
}

export async function togglePublish(formData) {
  const id = Number(formData.get("id"));
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;

  await prisma.product.update({
    where: { id },
    data: { status: product.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" },
  });

  revalidatePath("/");
  revalidatePath(`/producto/${product.slug}`);
  revalidatePath("/admin/productos");
}

export async function deleteProduct(formData) {
  const id = Number(formData.get("id"));

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!product) redirect("/admin/productos");

  // Borramos primero los archivos de imagen del disco; las filas de la
  // base de datos se borran solas gracias a "onDelete: Cascade" en el
  // esquema (ver prisma/schema.prisma).
  for (const image of product.images) {
    await deleteUploadedFile(image.url);
  }
  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteImage(formData) {
  const imageId = Number(formData.get("imageId"));
  const productId = Number(formData.get("productId"));

  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
  });
  if (!image) return;

  await deleteUploadedFile(image.url);
  await prisma.productImage.delete({ where: { id: imageId } });

  revalidatePath("/");
  revalidatePath(`/admin/productos/${productId}`);
}

/**
 * Sube (o baja) una imagen una posición dentro del orden de su producto.
 * La imagen en posición 0 es la que se usa como imagen principal en toda
 * la web (ver comentario en prisma/schema.prisma), así que mover una
 * imagen hasta arriba del todo es, a la vez, "elegir imagen principal" y
 * "reordenar imágenes": una misma acción cubre ambas necesidades.
 */
export async function moveImage(formData) {
  const imageId = Number(formData.get("imageId"));
  const direction = formData.get("direction");

  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
  });
  if (!image) return;

  const siblings = await prisma.productImage.findMany({
    where: { productId: image.productId },
    orderBy: { position: "asc" },
  });

  const index = siblings.findIndex((img) => img.id === imageId);
  const swapIndex = direction === "up" ? index - 1 : index + 1;

  if (swapIndex < 0 || swapIndex >= siblings.length) return; // ya está en un extremo

  const other = siblings[swapIndex];

  await prisma.$transaction([
    prisma.productImage.update({
      where: { id: image.id },
      data: { position: other.position },
    }),
    prisma.productImage.update({
      where: { id: other.id },
      data: { position: image.position },
    }),
  ]);

  revalidatePath("/");
  revalidatePath(`/admin/productos/${image.productId}`);
}
