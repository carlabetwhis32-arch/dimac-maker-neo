/**
 * Paleta de DIMAC MAKER — v2.
 *
 * La v1 usaba crema + naranja terracota, que resulta que es justo la
 * combinación por defecto que "delata" un diseño genérico/plantilla. Esta
 * versión se apoya en materiales reales del mundo Maker:
 * - "kraft": el cartón/papel kraft de las cajas y embalajes de electrónica.
 * - "paper": el blanco roto de una hoja de specs, no blanco puro de UI.
 * - "pcb": el verde de una placa de circuito impreso — acento principal.
 * - "copper": el cobre de un cable pelado o una pista soldada — acento secundario.
 * - "ochre": el amarillo de una cinta de aviso/rotulador de taller — para
 *   estados de "atención" (borrador, demo).
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
        kraft: "#D8C39A",
        paper: "#FBF7EE",
        mint: "#EAF0E3",
        clay: "#F5E6D6",
        straw: "#F8EED6",
        ink: "#26211B",
        muted: "#6B5F4C",
        border: "#C4AD82",
        accent: "#355E4B",
        "accent-dark": "#274436",
        copper: "#A85423",
        ochre: "#BE7F14",
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

