/**
 * Guarda cada imagen subida como un "data URI" (la propia imagen,
 * codificada en base64, dentro de la URL) en vez de como un archivo en
 * disco.
 *
 * Por qué se cambió (ver README, "Despliegue en Internet"): el hosting
 * gratuito (Render, Vercel, Netlify...) no tiene disco persistente, así
 * que un archivo guardado con fs.writeFile desaparecería en el siguiente
 * despliegue o reinicio. Guardando la imagen dentro de la propia base de
 * datos (que sí es persistente, con Postgres) evita depender de un
 * tercer servicio de almacenamiento solo para esto.
 *
 * Limitación conocida: al ir todo en la base de datos, no conviene subir
 * imágenes enormes (Neon Free da 0.5 GB en total). Para una V1 con pocas
 * fotos de producto esto es más que suficiente. Si el catálogo crece
 * mucho, el sitio para mover esto a un servicio de imágenes (Cloudinary,
 * Vercel Blob, S3...) es, precisamente, este archivo.
 */
export async function saveUploadedFile(file) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = bytes.toString("base64");
  const mimeType = file.type || "image/jpeg";
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Con el enfoque anterior (archivos en disco) había que borrar el archivo
 * físico al eliminar una imagen o un producto. Ahora la imagen vive dentro
 * de la fila de la base de datos: al borrar esa fila (lo hace quien llama
 * a esta función) ya no queda ningún rastro que limpiar, así que esta
 * función se mantiene vacía a propósito, para no tener que cambiar el
 * código que la llama (src/app/admin/(protected)/productos/actions.js).
 */
export async function deleteUploadedFile() {
  // No-op: no hay ningún archivo en disco que borrar.
}
