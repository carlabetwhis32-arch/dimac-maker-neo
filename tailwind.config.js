/**
 * Paleta de DIMAC MAKER — v3.
 *
 * Cambio de dirección pedido explícitamente: el fondo ya no es cálido/kraft,
 * sino frío y neutro (grafito muy claro), y el color ya no rota tarjeta a
 * tarjeta: cada CATEGORÍA tiene su propio color fijo (ver
 * src/lib/categoryColors.js), que se usa tanto en el selector de categoría
 * como en las tarjetas de sus productos. El fondo se queda deliberadamente
 * discreto para que sean esos colores de categoría, y las fotos de
 * producto, los que den la personalidad — no un patrón decorativo.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo y neutros: fríos, no cálidos (petición explícita).
        base: "#EEF0F3",
        paper: "#FFFFFF",
        ink: "#1C1F24",
        muted: "#5B6472",
        border: "#DCE1E7",

        // Un color fijo por categoría (mismo orden que las categorías del
        // seed: impresión 3D, electrónica, cableado, herramientas,
        // mecánica, robótica). "cat-neutral" es el color de reserva para
        // una categoría nueva que no esté en la lista de abajo.
        "cat-teal": "#1D8A79",
        "cat-blue": "#2E6CA4",
        "cat-orange": "#C97A2B",
        "cat-red": "#B14A32",
        "cat-purple": "#6C4F9E",
        "cat-pink": "#BD3E77",
        "cat-neutral": "#5B6472",

        // Color de marca (botones, enlaces, foco): uno solo, fijo, NO es
        // un color de categoría — así el botón "Comprar en Amazon" se ve
        // igual en cualquier producto, y solo la tarjeta cambia de color
        // según su categoría.
        accent: "#2A3342",
        "accent-dark": "#1B212B",
        // Para estados de aviso en el admin (p. ej. la etiqueta "Borrador").
        warn: "#B8860B",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};


