"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyAdminPassword,
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function loginAction(formData) {
  const password = formData.get("password");
  const isValid = await verifyAdminPassword(password);

  if (!isValid) {
    redirect("/admin/login?error=1");
  }

  // A partir de Next.js 15/16, cookies() devuelve una promesa.
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true, // el JavaScript del navegador no puede leerla
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días, igual que la validez interna del token
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}
