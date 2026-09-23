/**
 * Paleta de DIMAC MAKER.
 *
 * Decisión de diseño (ver README §"Cambiar colores"):
 * - "cream" es el fondo general: un blanco roto cálido, no blanco puro.
 * - "ink" es el texto principal, casi negro pero no puro (más suave a la vista).
 * - "accent" es el único color de acento: un naranja "soldador" que evoca
 *   electrónica/taller sin caer en el naranja genérico de e-commerce.
 * Se usan pocos colores a propósito (sección 5 del encargo: "usa pocos colores").
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EF",
        surface: "#FFFFFF",
        ink: "#211F1C",
        muted: "#6B6459",
        border: "#E7E0D4",
        accent: "#D9531E",
        "accent-dark": "#B84315",
        draft: "#8A8377",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};
