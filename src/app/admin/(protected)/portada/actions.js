"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function updateIntroText(formData) {
  const introText = formData.get("introText")?.toString().trim();

  if (!introText) {
    redirect("/admin/portada?error=El+texto+no+puede+estar+vacío");
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { introText },
    create: { id: 1, introText },
  });

  revalidatePath("/");
  redirect("/admin/portada?saved=1");
}
