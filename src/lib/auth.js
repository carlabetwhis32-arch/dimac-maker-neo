import crypto from "crypto";
import bcrypt from "bcryptjs";

// Nombre de la cookie de sesión del admin.
export const SESSION_COOKIE_NAME = "dimac_session";

// Duración de la sesión: 7 días. Pasado ese tiempo, hay que volver a
// escribir la contraseña.
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Por qué firmamos la cookie en vez de guardar solo "true":
 * si guardáramos algo como "dimac_session=logueado", cualquiera podría
 * crear esa cookie a mano y entrar en el admin sin contraseña.
 * Al firmarla con una clave secreta que solo el servidor conoce (HMAC),
 * el navegador puede guardar la cookie pero no puede fabricar una válida.
 */
function sign(value) {
  const secret = cleanEnvValue(process.env.SESSION_SECRET);
  if (!secret) {
    throw new Error(
      "Falta SESSION_SECRET en .env. Revisa .env.example para configurarlo."
    );
  }
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

/** Crea el valor de cookie a guardar tras un login correcto. */
export function createSessionCookieValue() {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

/** Comprueba que una cookie de sesión es válida (firma correcta y no caducada). */
export function isSessionValid(cookieValue) {
  if (!cookieValue) return false;

  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload);

  // Comparación en tiempo constante para evitar ataques de temporización.
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return false;
  }

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/**
 * Limpia comillas y espacios accidentales al copiar/pegar en .env.
 * Es muy fácil, copiando a mano, acabar con algo como `""$2a$10$..."` en
 * vez de `"$2a$10$..."`: esto evita que ese despiste rompa el login sin
 * dar ninguna pista de por qué.
 */
function cleanEnvValue(value) {
  if (!value) return value;
  return value.trim().replace(/^"+|"+$/g, "");
}

/** Compara la contraseña introducida en el login con el hash guardado en .env. */
export async function verifyAdminPassword(password) {
  const hash = cleanEnvValue(process.env.ADMIN_PASSWORD_HASH);

  if (!hash) {
    throw new Error(
      'Falta ADMIN_PASSWORD_HASH en .env. Genera uno con: npm run hash-password -- "tu-contraseña"'
    );
  }

  // Un hash de bcrypt válido siempre empieza así. Si no, casi seguro que
  // se ha copiado mal (comillas de más, texto cortado...).
  if (!/^\$2[aby]\$/.test(hash)) {
    throw new Error(
      "ADMIN_PASSWORD_HASH en tu .env no parece un hash válido (debería empezar por $2a$ o $2b$). Vuelve a generarlo con: npm run hash-password -- \"tu-contraseña\" y pega la línea completa, tal cual, en .env."
    );
  }

  if (!password) return false;
  return bcrypt.compare(password, hash);
}
