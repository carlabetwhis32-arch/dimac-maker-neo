import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Space Grotesk (titulares, wordmark, botones, precios): geometría algo
// técnica/de diagrama, con carácter propio, muy alejada de una sans
// genérica de SaaS. Inter para el cuerpo de texto: neutra y muy legible
// en párrafos largos (descripciones de producto), para que el carácter
// fuerte se quede en los titulares, no en cada línea de texto.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-mono",
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
      <body className={`${grotesk.variable} ${body.variable} ${mono.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
