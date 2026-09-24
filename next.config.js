/**
 * Configuración de Next.js.
 *
 * No necesitamos opciones especiales: las imágenes de producto se guardan
 * como base64 dentro de la base de datos (ver src/lib/uploads.js) y se
 * muestran con <img> normal, así que no hace falta configurar next/image
 * ni declarar dominios remotos.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
