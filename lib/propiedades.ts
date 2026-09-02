/* CARTERA — propiedades disponibles en venta y alquiler.
 *
 * ▸ CÓMO CARGAR UNA PROPIEDAD
 *   1. Guardá la foto en  images/cartera/  (JPG, lado largo 1600 px alcanza)
 *      y importala abajo como las demás.
 *   2. Agregá una entrada al array con sus datos. `precio` es OPCIONAL:
 *      si no está, la fila dice "Consultar".
 *   3. Borrá la marca `ejemplo: true` — esa marca pinta la fila como
 *      borrador y NO debe llegar a producción.
 *
 * Las entradas de abajo son EJEMPLOS para ver la composición: no son
 * propiedades reales y se muestran rotuladas como ejemplo.
 */

import type { StaticImageData } from "next/image";
import { whatsapp } from "./heredia";

/* Fotos provisorias mientras no hay propiedades reales: renders de Heredia
   que no compiten con la galería. Se reemplazan junto con cada entrada. */
import fotoEj1 from "@/images/emprendimiento/unidad-esquina-noche.jpg";
import fotoEj2 from "@/images/emprendimiento/unidad-2amb-noche.jpg";
import fotoEj3 from "@/images/emprendimiento/estar-esquina.jpg";
import fotoEj4 from "@/images/emprendimiento/cocina-isla.jpg";

export type Operacion = "venta" | "alquiler";

export interface Propiedad {
  id: string;
  operacion: Operacion;
  /** Dirección corta — es el titular de la fila. */
  titulo: string;
  zona: string;
  tipologia: string;
  /** m² totales. */
  superficie: number;
  /** Un dato que vende: "balcón terraza", "cochera", "apto profesional"… */
  detalle?: string;
  /** Opcional: si falta, la fila muestra "Consultar". */
  precio?: string;
  foto?: StaticImageData;
  alt?: string;
  /** Marca de borrador: pinta la fila como ejemplo. Borrar al cargar datos reales. */
  ejemplo?: boolean;
}

export const PROPIEDADES: Propiedad[] = [
  {
    id: "ej-1",
    operacion: "venta",
    titulo: "Propiedad de ejemplo 1",
    zona: "Villa Ortúzar",
    tipologia: "3 ambientes",
    superficie: 78,
    detalle: "Balcón terraza y cochera",
    precio: "USD 185.000",
    foto: fotoEj1,
    alt: "Interior de ejemplo: living iluminado al anochecer",
    ejemplo: true,
  },
  {
    id: "ej-2",
    operacion: "venta",
    titulo: "Propiedad de ejemplo 2",
    zona: "Colegiales",
    tipologia: "2 ambientes",
    superficie: 52,
    detalle: "Contrafrente, muy luminoso",
    foto: fotoEj2,
    alt: "Interior de ejemplo: estar de dos ambientes de noche",
    ejemplo: true,
  },
  {
    id: "ej-3",
    operacion: "alquiler",
    titulo: "Propiedad de ejemplo 3",
    zona: "Belgrano R",
    tipologia: "4 ambientes",
    superficie: 120,
    detalle: "Apto profesional",
    precio: "ARS 1.450.000/mes",
    foto: fotoEj3,
    alt: "Interior de ejemplo: estar amplio con esquina vidriada",
    ejemplo: true,
  },
  {
    id: "ej-4",
    operacion: "alquiler",
    titulo: "Propiedad de ejemplo 4",
    zona: "Villa Urquiza",
    tipologia: "Monoambiente",
    superficie: 34,
    foto: fotoEj4,
    alt: "Interior de ejemplo: cocina integrada con isla",
    ejemplo: true,
  },
];

export function waPropiedad(p: Propiedad): string {
  return whatsapp(
    `Hola Ana, vi "${p.titulo}" (${p.tipologia}, ${p.zona}) en tu sitio y quiero saber más.`,
  );
}

export const WA_CARTERA_VACIA = whatsapp(
  "Hola Ana, no vi nada disponible en tu sitio ahora. ¿Me avisás cuando entre algo?",
);
