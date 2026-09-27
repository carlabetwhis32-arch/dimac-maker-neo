/**
 * Paleta de DIMAC MAKER — v5. "Neobrutalismo de taller".
 *
 * Carta blanca del cliente: esta versión rompe deliberadamente con todas
 * las anteriores (kraft/pastel/minimal). La idea: bordes negros gruesos,
 * sombras duras sin difuminado ("de pegatina/etiqueta troquelada"),
 * colores vivos y un amarillo de marca — inspirado en cinta de
 * señalización de taller, serigrafía y diagramas de ingeniería, no en
 * dashboards de SaaS. Sigue habiendo un color fijo por categoría
 * (src/lib/categoryColors.js), pero ahora vive en una franja/etiqueta
 * sólida, no en un tinte sutil.
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
        canvas: "#F5F1E6",
        paper: "#FFFFFF",
        ink: "#141414",
        muted: "#5C5648",
        border: "#141414",
        sun: "#FFD400",
        "sun-dark": "#E0B400",

        "cat-teal": "#00A99A",
        "cat-blue": "#2F5FFF",
        "cat-orange": "#FF8A00",
        "cat-red": "#FF3B30",
        "cat-purple": "#8B5CF6",
        "cat-pink": "#FF3D9A",
        "cat-neutral": "#6B7280",

        accent: "#141414",
        "accent-dark": "#000000",
        warn: "#E0B400",
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1280px",
      },
      boxShadow: {
        hard: "6px 6px 0 0 #141414",
        "hard-sm": "3px 3px 0 0 #141414",
        "hard-press": "2px 2px 0 0 #141414",
      },
    },
  },
  plugins: [],
};



