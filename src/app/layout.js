import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
