/**
 * Configuración de Next.js.
 *
 * No necesitamos opciones especiales: las imágenes de producto se guardan
 * como base64 dentro de la base de datos (ver src/lib/uploads.js) y se
 * muestran con <img> normal, así que no hace falta configurar next/image
 * ni declarar dominios remotos.
 *
 * allowedDevOrigins: solo afecta a "npm run dev" (desarrollo local). Por
 * defecto, Next.js bloquea las conexiones de recarga en caliente (HMR)
 * cuando se abre la web desde una IP de red local (ej. para probarla en
 * el móvil) en vez de "localhost", y eso puede impedir que funcione el
 * JavaScript de la página. Lo normal es usar siempre localhost:3000; esto
 * es solo una red de seguridad por si se abre desde otra IP de la misma
 * red WiFi.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.40", "localhost"],
};

module.exports = nextConfig;
