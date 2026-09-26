/**
 * Un color fijo por categoría (no por producto, no rotativo): así el
 * selector de "Electrónica" y todas las tarjetas de productos de
 * Electrónica comparten siempre el mismo color, tal como se pidió.
 *
 * Las clases de Tailwind usadas aquí están definidas en tailwind.config.js
 * (colors.cat-teal, colors.cat-blue, etc.). Este archivo está incluido en
 * el "content" de Tailwind (src/lib/**) para que generе esas clases aunque
 * se usen solo aquí, nunca escritas literalmente en un componente.
 */
const PALETTE = [
  { bg: "bg-cat-teal", border: "border-cat-teal", borderSoft: "border-cat-teal/55", text: "text-cat-teal", solid: "bg-cat-teal" },
  { bg: "bg-cat-blue", border: "border-cat-blue", borderSoft: "border-cat-blue/55", text: "text-cat-blue", solid: "bg-cat-blue" },
  { bg: "bg-cat-orange", border: "border-cat-orange", borderSoft: "border-cat-orange/55", text: "text-cat-orange", solid: "bg-cat-orange" },
  { bg: "bg-cat-red", border: "border-cat-red", borderSoft: "border-cat-red/55", text: "text-cat-red", solid: "bg-cat-red" },
  { bg: "bg-cat-purple", border: "border-cat-purple", borderSoft: "border-cat-purple/55", text: "text-cat-purple", solid: "bg-cat-purple" },
  { bg: "bg-cat-pink", border: "border-cat-pink", borderSoft: "border-cat-pink/55", text: "text-cat-pink", solid: "bg-cat-pink" },
];

const NEUTRAL = {
  bg: "bg-cat-neutral",
  border: "border-cat-neutral",
  borderSoft: "border-cat-neutral/55",
  text: "text-cat-neutral",
  solid: "bg-cat-neutral",
};

// Asignación fija para las 6 categorías del seed (prisma/seed.js). Si
// cambias el slug de una categoría en la base de datos, se le asignará
// el color de reserva (ver más abajo) hasta que actualices este mapa.
const COLOR_BY_SLUG = {
  "impresion-3d": PALETTE[0], // teal
  electronica: PALETTE[1], // azul
  cableado: PALETTE[2], // naranja
  herramientas: PALETTE[3], // rojo
  mecanica: PALETTE[4], // morado
  robotica: PALETTE[5], // rosa
};

/**
 * Color de reserva, determinista, para una categoría nueva creada desde
 * el admin que no esté en el mapa de arriba: siempre el mismo color para
 * el mismo slug (no cambia entre recargas), tomado de la misma paleta.
 */
function fallbackColor(slug) {
  if (!slug) return NEUTRAL;
  const sum = [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

export function getCategoryColor(slug) {
  return COLOR_BY_SLUG[slug] || fallbackColor(slug);
}
