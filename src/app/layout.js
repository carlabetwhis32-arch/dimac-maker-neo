import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// IBM Plex se diseñó originalmente para documentación técnica/de ingeniería
// de IBM: encaja con el mundo Maker mejor que una sans genérica de SaaS.
// La mono se usa solo para el precio (ver .price-tag en globals.css), no
// como decoración general.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
});

export const metadata = {
  title: "DIMAC — MAKER",
  description:
    "Recomendaciones de piezas, componentes y herramientas para proyectos Maker: impresión 3D, electrónica, cableado, herramientas, mecánica y robótica.",
};

/**
 * Layout raíz: SOLO lo estrictamente común a toda la app (html/body, fuente,
 * metadatos por defecto). Deliberadamente NO incluye Header/Footer aquí:
 * la web pública y el panel /admin tienen cabeceras distintas (sección 15:
 * el admin no debe parecer parte de la web pública), así que cada uno
 * define su propio layout anidado:
 *   - src/app/(public)/layout.js  -> Header + Footer públicos
 *   - src/app/admin/(protected)/layout.js -> navegación privada
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${plexSans.variable} ${plexMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
