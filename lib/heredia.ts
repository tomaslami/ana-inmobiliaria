/* HEREDIA — ficha técnica del emprendimiento.
 *
 * Fuente única: "BROCHURE HEREDIA Mayo 2026" de Supercielo. Todo dato que se
 * muestra en el sitio sale de acá; si el proyecto cambia, se edita este
 * archivo y nada más. Los planos viven en images/emprendimiento/planos/ y
 * entran por import estático para que Next genere medidas y blur solo.
 */

import type { StaticImageData } from "next/image";

import planoMono from "@/images/emprendimiento/planos/monoambiente.jpg";
import plano2amb from "@/images/emprendimiento/planos/2-ambientes.jpg";
import plano3amb from "@/images/emprendimiento/planos/3-ambientes.jpg";
import plano3esq from "@/images/emprendimiento/planos/3-ambientes-esquina.jpg";
import plano601 from "@/images/emprendimiento/planos/piso6-601.jpg";
import plano602 from "@/images/emprendimiento/planos/piso6-602.jpg";
import plano603 from "@/images/emprendimiento/planos/piso6-603.jpg";
import plano701 from "@/images/emprendimiento/planos/piso7-701.jpg";

/* ── Contacto directo ──────────────────────────────────────────────── */

const WHATSAPP_NUMERO = "5491140237788";

function whatsapp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export const WA = {
  brochure: whatsapp("Hola Ana, vi Heredia en tu sitio y quiero recibir el brochure completo."),
  precios: whatsapp("Hola Ana, quiero la lista de precios y forma de pago de Heredia."),
  tipologia: (nombre: string) =>
    whatsapp(`Hola Ana, me interesa la tipología ${nombre} de Heredia. ¿Me pasás disponibilidad y precio?`),
};

export const SUPERCIELO_URL = "https://supercielo.com.ar";

/* ── Tipologías ────────────────────────────────────────────────────── */

export type GrupoId = "pisos-1-5" | "piso-6" | "piso-7";

export interface Grupo {
  id: GrupoId;
  label: string;
  nota?: string;
}

export const GRUPOS: Grupo[] = [
  { id: "pisos-1-5", label: "Pisos 1 a 5", nota: "Mono a 3 ambientes" },
  { id: "piso-6", label: "Piso 6", nota: "Terraza y parrilla propia" },
  { id: "piso-7", label: "Piso 7", nota: "Terraza y parrilla propia" },
];

export interface Ambiente {
  nombre: string;
  medidas: string; // como figura en el brochure, en metros
}

export interface Tipologia {
  id: string;
  grupo: GrupoId;
  nombre: string;
  /** Rótulo corto para la solapa del explorador. */
  tab: string;
  unidades: string[];
  cubierta: number;
  descubierta: number;
  comun: number;
  total: number;
  ambientes: Ambiente[];
  plano: StaticImageData;
  planoAlt: string;
}

export const TIPOLOGIAS: Tipologia[] = [
  {
    id: "monoambiente",
    grupo: "pisos-1-5",
    nombre: "Monoambiente",
    tab: "Monoambiente",
    unidades: ["102", "202", "302", "402", "502"],
    cubierta: 30.3,
    descubierta: 4.5,
    comun: 1.8,
    total: 36.6,
    ambientes: [
      { nombre: "Living", medidas: "6,87 × 3,00" },
      { nombre: "Cocina", medidas: "2,00 × 1,50" },
      { nombre: "Balcón verde", medidas: "3,17 × 1,65" },
      { nombre: "Baño", medidas: "1,55 × 2,00" },
    ],
    plano: planoMono,
    planoAlt: "Plano del monoambiente de pisos 1 a 5, con balcón verde al contrafrente",
  },
  {
    id: "2-ambientes",
    grupo: "pisos-1-5",
    nombre: "2 Ambientes",
    tab: "2 Ambientes",
    unidades: ["104", "204", "304", "404", "504"],
    cubierta: 38.2,
    descubierta: 7.2,
    comun: 2.4,
    total: 47.8,
    ambientes: [
      { nombre: "Living", medidas: "5,65 × 2,80" },
      { nombre: "Cocina", medidas: "2,15 × 2,80" },
      { nombre: "Balcón", medidas: "1,20 × 4,60" },
      { nombre: "Dormitorio", medidas: "2,60 × 3,10" },
      { nombre: "Área verde", medidas: "2,20 × 4,40" },
      { nombre: "Baño", medidas: "1,80 × 1,85" },
    ],
    plano: plano2amb,
    planoAlt: "Plano del dos ambientes de pisos 1 a 5, con balcón y área verde",
  },
  {
    id: "3-ambientes",
    grupo: "pisos-1-5",
    nombre: "3 Ambientes",
    tab: "3 Ambientes",
    unidades: ["201", "301", "401", "501"],
    cubierta: 73.5,
    descubierta: 15,
    comun: 3.6,
    total: 92.1,
    ambientes: [
      { nombre: "Living", medidas: "8,50 × 3,00" },
      { nombre: "Cocina", medidas: "2,55 × 2,50" },
      { nombre: "Balcón", medidas: "2,60 × 5,25" },
      { nombre: "Dormitorio suite", medidas: "4,35 × 2,70" },
      { nombre: "Balcón verde", medidas: "1,45 × 2,80" },
      { nombre: "Dormitorio", medidas: "4,35 × 2,30" },
      { nombre: "Baño en suite", medidas: "2,20 × 1,70" },
      { nombre: "Vestidor", medidas: "1,95 × 1,90" },
      { nombre: "Baño", medidas: "2,20 × 1,60" },
    ],
    plano: plano3amb,
    planoAlt: "Plano del tres ambientes de pisos 2 a 5, con suite, vestidor y dos balcones",
  },
  {
    id: "3-ambientes-esquina",
    grupo: "pisos-1-5",
    nombre: "3 Ambientes Esquina",
    tab: "3 Amb. Esquina",
    unidades: ["103", "203", "303", "403", "503"],
    cubierta: 65.2,
    descubierta: 12.4,
    comun: 3,
    total: 80.6,
    ambientes: [
      { nombre: "Living", medidas: "6,40 × 3,40" },
      { nombre: "Cocina", medidas: "3,15 × 3,40" },
      { nombre: "Balcón", medidas: "3,05 × 1,85 + 5,00 × 0,45" },
      { nombre: "Dormitorio suite", medidas: "3,05 × 2,80" },
      { nombre: "Balcón verde suite", medidas: "1,45 × 2,95" },
      { nombre: "Hall dormitorio", medidas: "1,05 × 1,65" },
      { nombre: "Baño en suite", medidas: "2,07 × 1,65" },
      { nombre: "Dormitorio", medidas: "3,15 × 2,50" },
      { nombre: "Baño", medidas: "2,07 × 1,65" },
    ],
    plano: plano3esq,
    planoAlt: "Plano del tres ambientes en esquina de pisos 1 a 5, sobre la ochava",
  },
  {
    id: "piso6-601",
    grupo: "piso-6",
    nombre: "2 Ambientes — Unidad 601",
    tab: "601 · 2 Amb.",
    unidades: ["601"],
    cubierta: 52.7,
    descubierta: 20,
    comun: 2.6,
    total: 75.3,
    ambientes: [
      { nombre: "Living", medidas: "7,70 × 3,00" },
      { nombre: "Cocina", medidas: "2,55 × 2,50" },
      { nombre: "Balcón terraza", medidas: "3,45 × 5,80" },
      { nombre: "Dormitorio", medidas: "3,17 × 2,80" },
      { nombre: "Vestidor", medidas: "1,55 × 2,80" },
      { nombre: "Baño en suite", medidas: "1,60 × 1,80" },
      { nombre: "Toilette", medidas: "1,75 × 0,90" },
      { nombre: "Parrilla propia", medidas: "—" },
    ],
    plano: plano601,
    planoAlt: "Plano de la unidad 601 del piso 6, dos ambientes con terraza y parrilla propia",
  },
  {
    id: "piso6-602",
    grupo: "piso-6",
    nombre: "3 Ambientes — Unidad 602",
    tab: "602 · 3 Amb.",
    unidades: ["602"],
    cubierta: 68.1,
    descubierta: 52.9,
    comun: 4.5,
    total: 125.5,
    ambientes: [
      { nombre: "Living", medidas: "7,70 × 3,00" },
      { nombre: "Cocina", medidas: "4,15 × 0,60" },
      { nombre: "Balcón terraza", medidas: "8,20 × 3,45 + 2,55 × 8,35" },
      { nombre: "Dormitorio suite", medidas: "2,80 × 3,05" },
      { nombre: "Vestidor", medidas: "2,80 × 1,55" },
      { nombre: "Baño en suite", medidas: "2,30 × 1,55" },
      { nombre: "Dormitorio", medidas: "3,20 × 2,60" },
      { nombre: "Baño", medidas: "2,20 × 1,55" },
      { nombre: "Parrilla propia", medidas: "—" },
    ],
    plano: plano602,
    planoAlt: "Plano de la unidad 602 del piso 6, tres ambientes con terraza envolvente y parrilla",
  },
  {
    id: "piso6-603",
    grupo: "piso-6",
    nombre: "2 Ambientes — Unidad 603",
    tab: "603 · 2 Amb.",
    unidades: ["603"],
    cubierta: 34.7,
    descubierta: 21,
    comun: 2.3,
    total: 58,
    ambientes: [
      { nombre: "Living-cocina", medidas: "6,00 × 3,30" },
      { nombre: "Dormitorio", medidas: "3,10 × 2,70" },
      { nombre: "Balcón terraza", medidas: "3,05 × 6,85" },
      { nombre: "Baño", medidas: "3,00 × 2,00" },
      { nombre: "Parrilla propia", medidas: "—" },
    ],
    plano: plano603,
    planoAlt: "Plano de la unidad 603 del piso 6, dos ambientes con terraza y parrilla propia",
  },
  {
    id: "piso7-701",
    grupo: "piso-7",
    nombre: "4 Ambientes — Unidad 701",
    tab: "701 · 4 Amb.",
    unidades: ["701"],
    cubierta: 105.7,
    descubierta: 54,
    comun: 6,
    total: 165.7,
    ambientes: [
      { nombre: "Living", medidas: "8,00 × 3,05" },
      { nombre: "Cocina", medidas: "2,10 × 3,05" },
      { nombre: "Terraza", medidas: "13,15 × 1,85 + 15,00 × 1,85" },
      { nombre: "Dormitorio suite", medidas: "3,30 × 3,00" },
      { nombre: "Baño en suite", medidas: "2,20 × 1,95" },
      { nombre: "Dormitorio", medidas: "2,70 × 3,80" },
      { nombre: "Dormitorio", medidas: "2,70 × 3,20" },
      { nombre: "Baño", medidas: "2,40 × 1,60" },
      { nombre: "Toilette", medidas: "1,50 × 1,40" },
      { nombre: "Parrilla propia", medidas: "—" },
    ],
    plano: plano701,
    planoAlt: "Plano de la unidad 701, el piso 7 completo: cuatro ambientes con terraza perimetral",
  },
];

/* ── Terminaciones ─────────────────────────────────────────────────── */

export interface Terminacion {
  rotulo: string;
  detalle: string;
}

/* Las ocho que más pesan en la decisión, siempre visibles. */
export const TERMINACIONES_DESTACADAS: Terminacion[] = [
  { rotulo: "Aberturas", detalle: "Aluminio anodizado Aluar línea Módena, con doble vidriado hermético en todos los ambientes." },
  { rotulo: "Calefacción", detalle: "Central por piso radiante en las unidades de 3 y 4 ambientes." },
  { rotulo: "Aire acondicionado", detalle: "Preinstalación para equipos split frío-calor." },
  { rotulo: "Agua caliente", detalle: "Central, por termotanques de alta recuperación." },
  { rotulo: "Cocina", detalle: "Mesadas de Silestone o símil con pileta de acero inoxidable Johnson; bajo mesada y alacena en melamina con cantos de ABS." },
  { rotulo: "Sanitarios", detalle: "Griferías FV con cierre cerámico; artefactos Ferrum o Roca; revestimiento cerámico en baños y cocinas." },
  { rotulo: "Estructura", detalle: "Construcción tradicional: hormigón armado con mampostería divisoria de ladrillo." },
  { rotulo: "Cocheras", detalle: "En subsuelo, con montacoche de acceso y bicicletero en planta baja." },
];

export const TERMINACIONES_RESTO: Terminacion[] = [
  { rotulo: "Muros interiores", detalle: "Revestidos en yeso." },
  { rotulo: "Cielorrasos", detalle: "Suspendidos en baños." },
  { rotulo: "Puertas interiores", detalle: "Placa en fibrofácil pintadas, con marco de chapa." },
  { rotulo: "Placares", detalle: "Frentes e interiores en melamina, color a definir." },
  { rotulo: "Terraza común", detalle: "Pileta, solárium, parrilla y área verde en el último piso." },
  { rotulo: "Ascensor", detalle: "Cabina y frente de planta baja en acero inoxidable." },
];

/* ── Ubicación ─────────────────────────────────────────────────────── */

export const DIRECCION = {
  calle: "Heredia 1320",
  esquina: "Heredia y Av. Álvarez Thomas",
  barrio: "Villa Ortúzar, CABA",
  mapsUrl: "https://maps.google.com/?q=Heredia+1320,+CABA",
  /* Embed sin API key (output=embed) y ruta directa a indicaciones. */
  embedUrl: "https://maps.google.com/maps?q=Heredia%201320%2C%20CABA&z=16&hl=es&output=embed",
  comoLlegarUrl: "https://www.google.com/maps/dir/?api=1&destination=Heredia+1320,+CABA",
};

export interface PuntoInteres {
  nombre: string;
  detalle: string;
}

/* Lo que marca el mapa del brochure, sin inventar distancias. */
export const ENTORNO: PuntoInteres[] = [
  { nombre: "Subte B — Tronador", detalle: "Conexión directa al centro por Av. Triunvirato." },
  { nombre: "Av. Álvarez Thomas", detalle: "Acceso rápido a zona norte y a los barrios céntricos." },
  { nombre: "Belgrano R y Colegiales", detalle: "A minutos de dos de los barrios más buscados de la ciudad." },
  { nombre: "Polo Donado–Holmberg", detalle: "El área gastronómica que renovó la zona." },
  { nombre: "Av. Elcano", detalle: "El eje comercial del barrio." },
  { nombre: "Plazas 25 de Agosto y Garicoits", detalle: "Verde de escala barrial a pocas cuadras." },
];
