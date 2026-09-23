import { PrismaClient } from "@prisma/client";

// En desarrollo, Next.js recarga módulos en caliente muy a menudo.
// Si creáramos "new PrismaClient()" cada vez, acabaríamos abriendo decenas
// de conexiones a la base de datos. La solución estándar es guardar la
// instancia en el objeto global (que sí sobrevive a la recarga) y
// reutilizarla. En producción esto no pasa, así que ahí no hace falta.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
