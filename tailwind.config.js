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
        kraft: "#E4D9BF",
        paper: "#FBF7EE",
        ink: "#26211B",
        muted: "#6B5F4C",
        border: "#D3C2A0",
        accent: "#3B6E58",
        "accent-dark": "#2B5443",
        copper: "#B5622A",
        ochre: "#C98A1C",
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

