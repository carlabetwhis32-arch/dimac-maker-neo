// Rellena la base de datos con datos iniciales: las 6 categorías Maker y
// entre 8-12 productos DEMO, para poder ver la web funcionando nada más
// arrancarla (sección 19 del encargo).
//
// Se ejecuta con: npm run seed
// Es seguro ejecutarlo varias veces: usa upsert, así que no duplica datos.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Imágenes de relleno: usamos un servicio público de placeholders
// (picsum.photos) con una "semilla" fija por producto, así la imagen
// siempre es la misma para ese producto en vez de cambiar en cada carga.
// Cuando el admin suba fotos reales, estas desaparecen del producto.
function placeholderImage(seed, n = 1) {
  return `https://picsum.photos/seed/dimac-${seed}-${n}/700/700`;
}

const categories = [
  {
    slug: "impresion-3d",
    name: "Impresión 3D",
    description: "Filamentos, piezas y consumibles para tu impresora 3D.",
  },
  {
    slug: "electronica",
    name: "Electrónica",
    description: "Componentes, herramientas de soldadura y medición.",
  },
  {
    slug: "cableado",
    name: "Cableado",
    description: "Cables, conectores y todo lo necesario para unirlos bien.",
  },
  {
    slug: "herramientas",
    name: "Herramientas",
    description: "Herramientas de mano para el taller Maker.",
  },
  {
    slug: "mecanica",
    name: "Mecánica",
    description: "Tornillería, rodamientos y piezas mecánicas de uso general.",
  },
  {
    slug: "robotica",
    name: "Robótica",
    description: "Placas, motores y módulos para tus proyectos robóticos.",
  },
];

// Productos DEMO: isDemo = true para que el admin pueda identificarlos y
// borrarlos fácilmente en cuanto añada sus propios productos reales.
const demoProducts = [
  {
    categorySlug: "impresion-3d",
    name: "[DEMO] Filamento PLA 1.75mm 1kg",
    price: 19.9,
    description:
      "Filamento PLA de 1.75mm, bobina de 1kg. Temperatura de impresión recomendada 190-220°C, cama a 0-60°C. Tolerancia dimensional ±0.02mm.",
    comment:
      "Es el filamento por el que casi todo el mundo empieza en impresión 3D: es el más fácil de imprimir y el que menos suele dar problemas de adherencia o deformación (warping). Ideal para piezas decorativas, prototipos rápidos o soportes que no vayan a estar a la intemperie ni cerca de calor.",
  },
  {
    categorySlug: "impresion-3d",
    name: "[DEMO] Boquilla de latón 0.4mm para hotend MK8",
    price: 6.5,
    description:
      "Boquilla (nozzle) de latón, diámetro de salida 0.4mm, rosca M6, compatible con hotends tipo MK8. Vendida en pack de 5 unidades.",
    comment:
      "Tener boquillas de repuesto a mano evita parar una impresión larga por una boquilla obstruida o desgastada. La de 0.4mm es la medida estándar: buen equilibrio entre detalle y velocidad. Si imprimes con filamentos abrasivos (con fibra de carbono, por ejemplo), esta versión de latón se desgasta más rápido y conviene mirar una de acero endurecido.",
  },
  {
    categorySlug: "electronica",
    name: "[DEMO] Multímetro digital básico",
    price: 14.99,
    description:
      "Multímetro digital con pantalla LCD. Mide voltaje AC/DC, corriente DC, resistencia y continuidad. Incluye puntas de prueba y pila.",
    comment:
      "Es la primera herramienta que necesitas en cualquier proyecto de electrónica: sirve para comprobar si un cable está roto (modo continuidad), si una pila todavía da voltaje, o si una resistencia tiene el valor que crees. Antes de conectar cualquier cosa a corriente por primera vez, un multímetro te ahorra sustos.",
  },
  {
    categorySlug: "electronica",
    name: "[DEMO] Kit de resistencias surtidas (600 uds)",
    price: 8.99,
    description:
      "600 resistencias de 1/4W, 30 valores distintos (de 10Ω a 1MΩ), organizadas en caja compartimentada.",
    comment:
      "Para casi cualquier circuito con LEDs, sensores o microcontroladores necesitarás resistencias de valores distintos, así que tener un surtido evita estar comprando de una en una. Útil para limitar corriente en LEDs, hacer divisores de tensión o montar tus primeros circuitos en protoboard.",
  },
  {
    categorySlug: "electronica",
    name: "[DEMO] Estación de soldadura regulable",
    price: 34.9,
    description:
      "Estación de soldadura con control de temperatura (200-450°C), soporte y esponja de limpieza incluidos. Punta de soldar intercambiable.",
    comment:
      "Un soldador regulable marca una diferencia enorme frente a uno básico de temperatura fija: puedes bajar la temperatura para componentes delicados (como algunos sensores) y subirla para soldaduras que necesitan más calor, como en cables gruesos. Es la herramienta central para montar placas, reparar cables o unir componentes de forma permanente.",
  },
  {
    categorySlug: "cableado",
    name: "[DEMO] Tubo termorretráctil surtido",
    price: 7.5,
    description:
      "Tubo termorretráctil, relación de contracción 2:1, surtido de diámetros de 1mm a 10mm, varios colores. Se contrae con calor (mechero o pistola de aire caliente).",
    comment:
      "Sirve para proteger y aislar empalmes de cables: por ejemplo, después de soldar dos cables, colocas un trozo de tubo por encima de la unión y lo calientas para que se ajuste y quede aislado, como si fuera de fábrica. También es útil para agrupar varios cables juntos o proteger conectores de la humedad y el rozamiento.",
  },
  {
    categorySlug: "cableado",
    name: "[DEMO] Cable Dupont macho-hembra 40 uds",
    price: 5.99,
    description:
      "40 cables Dupont de 20cm, terminación macho en un extremo y hembra en el otro, paso de 2.54mm, colores variados.",
    comment:
      "Son los cables típicos para conectar un Arduino o Raspberry Pi a un protoboard o a un sensor sin tener que soldar nada. La combinación macho-hembra es la más versátil porque sirve tanto para pines de placa (macho) como para pines de módulos y sensores (que suelen llevar pines macho también, de ahí el lado hembra del cable).",
  },
  {
    categorySlug: "herramientas",
    name: "[DEMO] Juego de destornilladores de precisión",
    price: 12.99,
    description:
      "Set de 32 puntas intercambiables (Phillips, plano, Torx, hexagonal, etc.) con mango giratorio y extensión magnética.",
    comment:
      "Perfecto para abrir electrónica de consumo (mandos, portátiles, gadgets), montar piezas pequeñas impresas en 3D con tornillería mini, o ajustar la mecánica de una impresora 3D. Las puntas magnéticas ayudan mucho a no perder tornillos diminutos por el suelo del taller.",
  },
  {
    categorySlug: "herramientas",
    name: "[DEMO] Alicate de corte lateral (flush cutter)",
    price: 9.5,
    description:
      "Alicate de corte lateral con filo al ras (flush), mango ergonómico antideslizante. Longitud 12.5cm.",
    comment:
      "El corte «al ras» deja el extremo del cable o de la pata de un componente prácticamente plano, sin un muñón afilado sobresaliendo. Muy útil para recortar patillas de componentes tras soldarlos en una placa, o para retirar soportes y rebabas en piezas impresas en 3D.",
  },
  {
    categorySlug: "mecanica",
    name: "[DEMO] Kit de tornillería M3 (tuercas, arandelas, tornillos)",
    price: 11.9,
    description:
      "Surtido de tornillos M3 (varias longitudes de 6 a 30mm), tuercas y arandelas planas, acero inoxidable, caja organizadora.",
    comment:
      "M3 es una de las medidas más habituales en piezas impresas en 3D y en electrónica de proyectos (por ejemplo, para fijar placas o carcasas), así que tener un surtido de longitudes evita ir comprando tornillo a tornillo cada vez que cambias de diseño.",
  },
  {
    categorySlug: "mecanica",
    name: "[DEMO] Rodamientos lineales LM8UU",
    price: 9.99,
    description:
      "Pack de 4 rodamientos lineales LM8UU, eje de 8mm, para movimiento lineal sobre varilla guía.",
    comment:
      "Son los rodamientos típicos que verás en los ejes de muchas impresoras 3D caseras y en máquinas CNC pequeñas: permiten que un carro se deslice suavemente a lo largo de una varilla. Si tu impresora empieza a hacer ruido o notas que un eje se mueve con resistencia irregular, suele ser buena señal revisar estos rodamientos.",
  },
  {
    categorySlug: "robotica",
    name: "[DEMO] Arduino Uno R3 (compatible)",
    price: 15.9,
    description:
      "Placa de desarrollo compatible con Arduino Uno R3, microcontrolador ATmega328P, 14 pines digitales, 6 analógicos, conexión USB.",
    comment:
      "Es la placa más habitual para empezar en robótica y electrónica programable: hay muchísimos tutoriales, y prácticamente cualquier sensor o módulo que se te ocurra ya tiene una librería lista para funcionar con ella. Buen punto de partida para un primer robot con sensores y motores.",
  },
  {
    categorySlug: "robotica",
    name: "[DEMO] Kit motor paso a paso 28BYJ-48 con driver ULN2003",
    price: 6.99,
    description:
      "Motor paso a paso 28BYJ-48 (5V) junto con su placa driver ULN2003. Precisión de 5.625° por paso (con reducción interna).",
    comment:
      "Este combo es habitual para proyectos que necesitan un movimiento controlado con precisión pero no mucha fuerza: por ejemplo, mover una cámara poco a poco, un dispensador casero, o la base giratoria de un pequeño robot. El driver ULN2003 es necesario porque el Arduino por sí solo no puede dar la corriente que pide el motor directamente.",
  },
];

async function main() {
  console.log("Sembrando categorías...");
  const categoryIdBySlug = {};

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categoryIdBySlug[cat.slug] = created.id;
  }

  console.log("Sembrando productos DEMO...");
  for (const p of demoProducts) {
    const slug = require("../src/lib/slug").slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: p.name,
        slug,
        price: p.price,
        description: p.description,
        comment: p.comment,
        amazonUrl: "https://www.amazon.es/dp/EJEMPLO?tag=TU-ID-AFILIADO-21",
        status: "PUBLISHED",
        isDemo: true,
        categoryId: categoryIdBySlug[p.categorySlug],
        images: {
          create: [
            { url: placeholderImage(slug, 1), position: 0 },
            { url: placeholderImage(slug, 2), position: 1 },
          ],
        },
      },
    });
  }

  console.log("Sembrando texto de portada...");
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      introText:
        "Recomendaciones honestas de piezas, componentes y herramientas para tus proyectos Maker, con enlace directo a Amazon.",
    },
  });

  console.log("Listo ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
