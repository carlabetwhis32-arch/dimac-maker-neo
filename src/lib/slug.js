/**
 * Convierte un nombre en un slug apto para URL.
 * Ej: "Tubo Termorretráctil 5mm" -> "tubo-termorretractil-5mm"
 *
 * No usamos ninguna librería externa para esto porque es una operación
 * pequeña y de una sola línea de lógica real (quitar acentos + limpiar).
 */
export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos (á -> a, ñ -> n, etc.)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // cualquier cosa que no sea letra/número -> guion
    .replace(/^-+|-+$/g, ""); // quita guiones sobrantes al principio/final
}

/**
 * Genera un slug único añadiendo un sufijo numérico si ya existe.
 * `exists(slug)` debe ser una función async que devuelva true/false.
 */
export async function uniqueSlug(baseText, exists) {
  const base = slugify(baseText) || "producto";
  let candidate = base;
  let counter = 2;

  while (await exists(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  return candidate;
}
