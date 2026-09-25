"use client";

import { useRouter } from "next/navigation";

/**
 * Usa router.back() (el historial del navegador) en vez de un <Link href="/">
 * fijo: así, si entraste al producto desde una categoría filtrada, "volver"
 * te devuelve a esa misma categoría en vez de siempre a la portada.
 * Es el único motivo por el que este componente necesita ser de cliente.
 */
export default function BackButton({ label = "Volver" }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}
