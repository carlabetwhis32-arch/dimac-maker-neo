/**
 * Un color fijo por categoría (no por producto, no rotativo): así el
 * selector de "Electrónica" y todas las tarjetas de productos de
 * Electrónica comparten siempre el mismo color.
 *
 * Colores vivos a propósito (v5, "neobrutalismo de taller"): aquí el
 * color vive en bloques sólidos (franjas, etiquetas), no en tintes
 * sutiles, así que necesita saturación real para funcionar bien.
 *
 * Las clases están definidas en tailwind.config.js. Este archivo está
 * incluido en el "content" de Tailwind (src/lib/**) para que genere esas
 * clases aunque solo aparezcan escritas aquí.
 */
const PALETTE = [
  { solid: "bg-cat-teal", border: "border-cat-teal", text: "text-cat-teal" },
  { solid: "bg-cat-blue", border: "border-cat-blue", text: "text-cat-blue" },
  { solid: "bg-cat-orange", border: "border-cat-orange", text: "text-cat-orange" },
  { solid: "bg-cat-red", border: "border-cat-red", text: "text-cat-red" },
  { solid: "bg-cat-purple", border: "border-cat-purple", text: "text-cat-purple" },
  { solid: "bg-cat-pink", border: "border-cat-pink", text: "text-cat-pink" },
];

const NEUTRAL = { solid: "bg-cat-neutral", border: "border-cat-neutral", text: "text-cat-neutral" };

const COLOR_BY_SLUG = {
  "impresion-3d": PALETTE[0],
  electronica: PALETTE[1],
  cableado: PALETTE[2],
  herramientas: PALETTE[3],
  mecanica: PALETTE[4],
  robotica: PALETTE[5],
};

/** Color de reserva determinista para una categoría nueva sin asignar a mano. */
function fallbackColor(slug) {
  if (!slug) return NEUTRAL;
  const sum = [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

export function getCategoryColor(slug) {
  return COLOR_BY_SLUG[slug] || fallbackColor(slug);
}
