/** Formatea un número como precio en euros, con la coma decimal española. */
export function formatPrice(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
