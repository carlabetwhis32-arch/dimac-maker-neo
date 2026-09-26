/**
 * Genera el hash bcrypt de una contraseña para pegarlo en .env como
 * ADMIN_PASSWORD_HASH. Así la contraseña real nunca se guarda en texto plano
 * en ningún archivo del proyecto.
 *
 * Uso:
 *   npm run hash-password -- "mi-contraseña-elegida"
 *
 * IMPORTANTE sobre los símbolos "$": Next.js interpreta automáticamente
 * cualquier "$" dentro de un archivo .env como el principio de OTRA
 * variable de entorno (para poder escribir cosas como "$OTRA_VARIABLE").
 * Un hash de bcrypt está lleno de símbolos "$" (tiene la forma
 * "$2b$10$..."), así que si se pega tal cual, Next.js corrompe el hash en
 * silencio y el login deja de funcionar sin ningún aviso. Por eso este
 * script escribe cada "$" como "\$": esa barra invertida le dice a Next.js
 * "esto es un símbolo $ literal, no toques esta parte".
 */
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Uso: npm run hash-password -- \"tu-contraseña\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const escapedForEnv = hash.replace(/\$/g, "\\$");

console.log("\nCopia esta línea completa en tu archivo .env (sustituye la que ya había):\n");
console.log(`ADMIN_PASSWORD_HASH="${escapedForEnv}"\n`);
