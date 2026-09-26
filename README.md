# DIMAC MAKER

Web de recomendaciones y catálogo de productos para el mundo Maker
(impresión 3D, electrónica, cableado, herramientas, mecánica y robótica),
con enlaces de afiliado de Amazon. DIMAC MAKER **no es una tienda**: no
gestiona pagos ni pedidos, solo muestra información útil sobre cada
producto y un botón que lleva a comprarlo a Amazon.

Esta es la **V1**: sencilla, funcional, pensada para gestionarse desde un
panel privado (`/admin`) y para servir de base sobre la que ir añadiendo
funciones más adelante (buscador, filtros, favoritos, etc.) sin tener que
rehacer nada.

---

## 1. Stack técnico y por qué se eligió

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 16** (App Router, JavaScript) | Un único proyecto sirve tanto el frontend como el backend (páginas + Server Actions), sin necesidad de montar dos proyectos ni una API separada. Gratis, muy documentado, fácil de desplegar. |
| Base de datos | **PostgreSQL**, gratis en **Neon** (neon.com) | Se empezó con SQLite (ver historial de este README más abajo), pero un archivo SQLite no sobrevive en un hosting gratuito sin disco persistente. Neon da Postgres gratis para siempre, sin tarjeta, sin caducidad. Prisma habla con ambos igual: solo cambia una línea del esquema. |
| Estilos | **Tailwind CSS** | Permite construir la interfaz minimalista pedida directamente con clases, sin mantener archivos CSS grandes y dispersos. |
| Imágenes | **Guardadas en la propia base de datos** (como `data:` URI en base64) | El hosting gratuito tampoco tiene disco persistente para archivos subidos. Guardarlas en Postgres evita depender de un tercer servicio (Cloudinary, S3...) solo para esto. Ver `src/lib/uploads.js`. |
| Autenticación admin | Contraseña + cookie firmada (HMAC) | Solo hay un usuario (tú) y no hace falta ni base de usuarios ni una librería de autenticación completa. Ver sección 6. |

**No se usó:** NextAuth, tRPC, GraphQL, Redux/Zustand, un CMS externo,
TypeScript. Todo esto añadiría complejidad que esta V1 no necesita
(sección 3 del encargo original: "prioriza simplicidad").

---

## 2. Arquitectura, en una frase

```
USUARIO → páginas de Next.js (frontend) → Server Actions / Server Components (backend) → Prisma → SQLite
```

Next.js con App Router permite que una misma página (un archivo
`page.js`) sea, a la vez, la "vista" y el punto donde se piden los datos:
un componente de servidor puede llamar directamente a Prisma. Para
**escribir** datos (crear un producto, subir una imagen, hacer login...)
se usan **Server Actions**: funciones marcadas con `"use server"` que un
formulario puede llamar directamente, sin tener que montar una API REST
propia con rutas `/api/...`. Es la misma idea de "frontend → backend →
base de datos", solo que en Next.js el backend vive como funciones dentro
del propio proyecto en vez de como endpoints HTTP separados.

---

## 3. Estructura de carpetas

```
dimac-maker/
├── render.yaml                # Configuración de despliegue en Render (ver sección 9)
├── prisma/
│   ├── schema.prisma        # Modelos de datos (Category, Product, ProductImage, SiteSettings)
│   └── seed.js               # Crea las categorías y productos DEMO
├── public/
│   └── uploads/               # Imágenes subidas desde el admin (no se sube a git)
├── scripts/
│   └── hash-password.js      # Genera el hash de la contraseña de admin
└── src/
    ├── app/
    │   ├── layout.js          # Layout raíz: solo <html>/<body>/fuente
    │   ├── globals.css        # Tailwind + un par de clases propias
    │   ├── not-found.js       # Página 404
    │   ├── (public)/          # Grupo de rutas de la web pública
    │   │   ├── layout.js      # Aquí van el Header y el Footer públicos
    │   │   ├── page.js        # Portada (catálogo + categorías)
    │   │   ├── producto/[slug]/page.js   # Ficha de un producto
    │   │   └── legal/         # Aviso legal, privacidad, cookies, afiliación Amazon
    │   └── admin/
    │       ├── login/         # Página y Server Action de login (pública, sin protección)
    │       └── (protected)/   # Todo lo que exige sesión iniciada
    │           ├── layout.js  # Comprueba la sesión + navegación privada
    │           ├── page.js    # Dashboard
    │           ├── productos/ # Listado, alta, edición y Server Actions de productos
    │           ├── categorias/# Listado y Server Actions de categorías
    │           └── portada/   # Editar el texto introductorio de portada
    ├── components/            # Piezas de interfaz reutilizables (públicas)
    │   └── admin/              # Piezas de interfaz exclusivas del admin
    └── lib/                    # Lógica sin interfaz: BD, auth, slugs, formato, subida de archivos
```

**Por qué `(public)` y `(protected)` entre paréntesis:** en Next.js, una
carpeta entre paréntesis es un "route group": organiza archivos y permite
darles un layout propio, pero no aparece en la URL. Por eso la portada
sigue estando en `/`, no en `/(public)`.

---

## 4. Frontend (web pública)

- `src/app/(public)/page.js`: lee las categorías y los productos
  publicados directamente de la base de datos (con Prisma) y decide qué
  productos mostrar según el parámetro de la URL `?categoria=slug`. Si no
  hay parámetro, se muestran todos (esto es la opción "TODO": no existe
  como categoría real, es solo la ausencia de filtro).
- `src/components/CategoryNav.js`: la fila TODO / categorías. Son enlaces
  normales (`<Link>`), no botones con JavaScript: cambiar de categoría es
  simplemente navegar a otra URL.
- `src/components/ProductGrid.js` + `ProductCard.js`: el grid de tarjetas
  (imagen, nombre, precio).
- `src/app/(public)/producto/[slug]/page.js`: la ficha del producto.
  Usa `src/components/ImageGallery.js`, el único componente de cliente
  (`"use client"`) de toda la parte pública, porque cambiar de miniatura y
  ampliar la imagen son interacciones que solo pueden resolverse con
  JavaScript en el navegador.

---

## 5. Backend (Server Actions)

Cada carpeta de administración tiene su propio `actions.js` con las
funciones marcadas `"use server"`:

- `src/app/admin/login/actions.js` → `loginAction`, `logoutAction`
- `src/app/admin/(protected)/productos/actions.js` → crear, editar,
  publicar/despublicar, eliminar productos, y subir/reordenar/eliminar
  sus imágenes
- `src/app/admin/(protected)/categorias/actions.js` → crear, editar,
  eliminar categorías
- `src/app/admin/(protected)/portada/actions.js` → editar el texto de
  portada

Un formulario las llama directamente:
`<form action={crearProducto}>...</form>`. Next.js se encarga de mandar
esos datos al servidor, ejecutar la función allí (con acceso a la base de
datos) y refrescar la página con el resultado. No hay ningún endpoint
`/api/...` en este proyecto: no hace falta para lo que necesita esta V1.

---

## 6. Base de datos

Ver `prisma/schema.prisma`, comentado con el porqué de cada decisión.
Resumen de los 4 modelos:

- **Category**: nombre, slug, descripción opcional.
- **Product**: nombre, slug, precio, descripción, comentario DIMAC,
  enlace de Amazon, estado (`DRAFT`/`PUBLISHED`), si es un producto DEMO,
  y a qué categoría pertenece.
- **ProductImage**: cada imagen de un producto, con una `position`. La
  imagen con `position` más baja (0) es la que se usa como imagen
  principal en toda la web: así "elegir imagen principal" y "reordenar
  imágenes" son la misma operación.
- **SiteSettings**: una tabla de una sola fila (id fijo = 1) con el texto
  introductorio de portada.

Cada cambio en el esquema se aplica con:

```bash
npx prisma migrate dev --name describe_tu_cambio
```

---

## 7. Autenticación del admin

Ver `src/lib/auth.js`. No hay usuarios ni contraseñas en la base de
datos: hay **una sola contraseña**, guardada como hash (bcrypt) en la
variable de entorno `ADMIN_PASSWORD_HASH`. Al hacer login correctamente,
el servidor firma una cookie (`dimac_session`) con una clave secreta
(`SESSION_SECRET`) que solo el servidor conoce; el navegador la guarda
pero no puede fabricar una válida por su cuenta. `src/app/admin/(protected)/layout.js`
comprueba esa cookie antes de mostrar cualquier página de administración.

---

## 8. Imágenes

Se suben desde el formulario de producto (`<input type="file" multiple>`) y
se guardan directamente en la base de datos, codificadas en base64
(`src/lib/uploads.js`). Al borrar una imagen o un producto, su fila se
borra sin más: no hay ningún archivo aparte que limpiar. Es la solución
más sencilla que funciona igual en local que en cualquier hosting
gratuito (ver siguiente sección).

## 9. Despliegue en Internet, gratis (Render + Neon)

Esta app está preparada para funcionar en un hosting gratuito sin tarjeta.
Se usan dos servicios, ambos con plan gratuito permanente (no son
pruebas de 15/30 días):

- **Neon** (neon.com): base de datos Postgres.
- **Render** (render.com): donde corre la aplicación (web service).

> **¿Por qué Render y no Vercel?** Vercel también tiene un plan gratuito
> (Hobby) muy bueno para Next.js, pero sus condiciones de uso limitan el
> plan gratuito a proyectos no comerciales, y mencionan explícitamente
> "enlaces de afiliado como propósito principal del sitio" como ejemplo
> de uso que requeriría su plan de pago. Como DIMAC MAKER es, precisamente,
> un sitio de afiliación con Amazon, Render evita ese conflicto y sigue
> siendo 100% gratuito para este caso. (Esto no es asesoramiento legal:
> es una lectura de las condiciones públicas de Vercel en el momento de
> escribir esto; si prefieres usar Vercel de todos modos, el proyecto
> también funciona ahí sin cambios adicionales).

### Paso a paso

**1. Sube el proyecto a GitHub** (gratis). El proyecto ya tiene un
repositorio git inicializado con todo el código. Crea un repositorio
vacío en [github.com/new](https://github.com/new) llamado `dimac-maker`
(sin marcar "Add a README") y luego, en la terminal, dentro de la carpeta
del proyecto:

```bash
git remote add origin https://github.com/TU-USUARIO/dimac-maker.git
git branch -M main
git push -u origin main
```

**2. Crea la base de datos en Neon**: entra en
[neon.com](https://neon.com), regístrate gratis (sin tarjeta), crea un
proyecto nuevo y copia el "Connection string" que te da (empieza por
`postgresql://...`).

**3. Configura y prueba en local con esa base de datos real**:

```bash
# En tu .env, pega la cadena de Neon en DATABASE_URL
npx prisma migrate dev --name init   # crea las tablas en Neon
npm run seed                          # rellena las categorías y productos DEMO
npm run dev                           # comprueba que todo sigue funcionando
```

Esto crea la carpeta `prisma/migrations/`: súbela también a GitHub
(`git add -A && git commit -m "Migraciones iniciales" && git push`).

**4. Crea el servicio en Render**: entra en
[render.com](https://render.com) y regístrate gratis con tu cuenta de
GitHub (sin tarjeta). Pulsa **"New +" → "Blueprint"**, elige el
repositorio `dimac-maker` (el archivo `render.yaml` del proyecto
configura el servicio automáticamente) y, cuando te lo pida, rellena
estas tres variables de entorno con tus propios valores:

- `DATABASE_URL` → la cadena de conexión de Neon (la misma del paso 2)
- `ADMIN_PASSWORD_HASH` → la que generaste con `npm run hash-password`
- `SESSION_SECRET` → la cadena aleatoria larga que elegiste

Pulsa **"Apply"**/**"Create Web Service"**. Render instalará
dependencias, aplicará las migraciones (`prisma migrate deploy`, dentro
del `build` de `package.json`) y arrancará la app. La primera vez tarda
unos minutos.

**5. Abre tu URL pública**: Render te la da con el formato
`https://dimac-maker.onrender.com` (o `dimac-maker-XXXX.onrender.com` si
ese nombre exacto ya estaba cogido).

> **Nota sobre el plan gratuito de Render**: el servicio "se duerme" tras
> ~15 minutos sin visitas, y la primera visita después tarda unos 30-50
> segundos en despertar. Es normal y no cuesta nada: simplemente el
> hosting gratuito prioriza tráfico de pago. Para un proyecto personal
> que está empezando es una limitación razonable.

### Si algo falla en el despliegue

En el panel de Render, pestaña **"Logs"**, verás el error exacto del
build o del arranque. Los fallos más habituales:

- **Falta una variable de entorno**: revisa que las tres (`DATABASE_URL`,
  `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`) estén rellenas en
  "Environment" dentro de Render.
- **Error de migración** ("relation already exists" o similar): suele
  pasar si ya aplicaste las migraciones a mano contra esa misma base de
  datos. No es grave: `prisma migrate deploy` es seguro de repetir.
- **La contraseña de admin no funciona**: asegúrate de haber copiado el
  hash completo (empieza por `$2a$` o `$2b$`) sin comillas de más.

## 10. Amazon Afiliados: cómo se implementó

- El botón "Comprar en Amazon" (`src/app/(public)/producto/[slug]/page.js`)
  usa `rel="nofollow sponsored noopener noreferrer"`, tal y como
  recomienda buenas prácticas SEO/Amazon para enlaces de afiliado.
- La declaración exigida por el Acuerdo Operativo del Programa de
  Afiliados de Amazon ("Como Afiliado de Amazon, obtengo ingresos por las
  compras adscritas que cumplen los requisitos aplicables") vive en un
  único sitio, `src/lib/legalText.js`, y se muestra: en el footer de toda
  la web, junto al propio botón de compra, y en una página legal dedicada
  (`/legal/afiliacion-amazon`).
- Se han preparado también un Aviso Legal, una Política de Privacidad y
  una Política de Cookies básicas (carpeta `src/app/(public)/legal/`).
  **Contienen placeholders entre corchetes** (`[NOMBRE Y APELLIDOS...]`,
  `[NIF/CIF]`, etc.) que hay que rellenar con tus datos reales antes de
  publicar la web: no se han inventado datos personales ni legales.

> Nota: esta plantilla legal es una base razonable, no asesoramiento
> jurídico. Antes de publicar la web con tráfico real, conviene que la
> revise alguien con conocimientos legales, especialmente si en el futuro
> añades cookies de analítica/publicidad o gestionas datos de usuarios.

---

## 11. Ejecución local, paso a paso

**Requisitos**: Node.js 20.9 o superior ([nodejs.org](https://nodejs.org))
y una base de datos Postgres gratuita en [Neon](https://neon.com) (crea
un proyecto y copia su "Connection string"; tarda un minuto y no pide
tarjeta). También sirve cualquier otro Postgres si ya tienes uno.

```bash
# 1. Instalar dependencias
npm install

# 2. Crear tu archivo de variables de entorno
cp .env.example .env
# Pega tu cadena de conexión de Neon en DATABASE_URL dentro de .env

# 3. Generar el hash de tu contraseña de admin y copiarlo en .env
npm run hash-password -- "la-contraseña-que-quieras"
# Copia la línea ADMIN_PASSWORD_HASH="..." que imprime en tu archivo .env

# 4. Elegir también una cadena aleatoria para SESSION_SECRET en .env
# (cualquier frase larga sirve, por ejemplo generada con:)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 5. Crear las tablas en tu base de datos (aplica prisma/schema.prisma)
npx prisma migrate dev --name init

# 6. Rellenar con las categorías y productos DEMO
npm run seed

# 7. Arrancar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:3000** para ver la web, y
**http://localhost:3000/admin** para entrar al panel (con la contraseña
que elegiste en el paso 3).

Para explorar la base de datos con una interfaz visual en cualquier
momento: `npx prisma studio`.

---

## 12. "¿Dónde tengo que tocar si quiero...?"

| Quiero... | Archivo(s) a tocar |
|---|---|
| Cambiar los colores | `tailwind.config.js` (sección `colors`) |
| Cambiar el texto de portada | Desde `/admin/portada` (o directamente en la tabla `SiteSettings`) |
| Añadir/renombrar una categoría | Desde `/admin/categorias` (no hace falta tocar código) |
| Cambiar cómo se ve la tarjeta de producto | `src/components/ProductCard.js` |
| Cambiar cuántas columnas tiene el catálogo | `src/components/ProductGrid.js` (clases `grid-cols-*`) |
| Cambiar el diseño de la ficha de producto | `src/app/(public)/producto/[slug]/page.js` |
| Cambiar el texto de la cabecera | `src/components/Header.js` |
| Cambiar el pie de página / textos legales | `src/components/Footer.js` y `src/app/(public)/legal/*` |
| Cambiar la duración de la sesión de admin | `SESSION_DURATION_MS` en `src/lib/auth.js` (y el `maxAge` de la cookie en `src/app/admin/login/actions.js`) |
| Añadir un campo nuevo a los productos | 1) añadirlo en `prisma/schema.prisma`, 2) `npx prisma migrate dev`, 3) añadir el `<input>` en `src/components/admin/ProductForm.js`, 4) leerlo en `readProductFields()` dentro de `src/app/admin/(protected)/productos/actions.js`, 5) mostrarlo donde corresponda en la web pública |
| Cambiar dónde se guardan las imágenes | `src/lib/uploads.js` |

---

## 13. Productos DEMO

El seed (`prisma/seed.js`) crea 12 productos con el prefijo `[DEMO]` en
el nombre y marcados internamente como `isDemo: true`, para que sea
evidente que son de ejemplo y no recomendaciones reales. Bórralos desde
`/admin/productos` en cuanto tengas tus propios productos.

---

## 14. Qué falta a propósito (para más adelante)

Buscador, filtros, valoraciones/estrellas, favoritos, comparadores, blog,
estadísticas, importación automática, API de Amazon, usuarios públicos,
comentarios, newsletter. No se han implementado a propósito en esta V1
(para no sobre-construir), pero la estructura (categorías y productos en
tablas propias, componentes pequeños y separados) está pensada para que
añadirlas más adelante no obligue a rehacer nada de lo ya existente.
