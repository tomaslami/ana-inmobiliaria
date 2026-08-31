/* GALERÍA DEL EMPRENDIMIENTO — curaduría de renders de Heredia.
 *
 * Las imágenes viven en images/emprendimiento/ y entran por import estático:
 * Next conoce medidas y genera el placeholder blur sin trabajo manual.
 * El orden cuenta una visita: el edificio → las unidades → la terraza.
 *
 * `alt` describe la imagen para quien no la ve; `epigrafe` es el texto
 * visible; `categoria` rotula el tramo del recorrido en el epígrafe.
 */

import type { StaticImageData } from "next/image";

import esquinaAmanecer from "@/images/emprendimiento/esquina-amanecer.jpg";
import accesoAmanecer from "@/images/emprendimiento/acceso-amanecer.jpg";
import localEsquina from "@/images/emprendimiento/local-esquina.jpg";
import estarEsquina from "@/images/emprendimiento/estar-esquina.jpg";
import cocinaIsla from "@/images/emprendimiento/cocina-isla.jpg";
import unidad3amb from "@/images/emprendimiento/unidad-3amb.jpg";
import unidad3esq from "@/images/emprendimiento/unidad-3amb-esquina.jpg";
import unidad2amb from "@/images/emprendimiento/unidad-2amb.jpg";
import unidadPiso6 from "@/images/emprendimiento/unidad-piso6.jpg";
import unidad601 from "@/images/emprendimiento/unidad-601-atardecer.jpg";
import unidad3ambNoche from "@/images/emprendimiento/unidad-3amb-anochecer.jpg";
import balconEsquina from "@/images/emprendimiento/balcon-esquina.jpg";
import terrazaParrillaDia from "@/images/emprendimiento/terraza-parrilla-dia.jpg";
import terrazaParrillaAtardecer from "@/images/emprendimiento/terraza-parrilla-atardecer.jpg";
import terrazaPiletaDia from "@/images/emprendimiento/terraza-pileta-dia.jpg";
import terrazaPiletaAmanecer from "@/images/emprendimiento/terraza-pileta-amanecer.jpg";

export type CategoriaGaleria = "El edificio" | "Las unidades" | "La terraza";

export interface FotoGaleria {
  src: StaticImageData;
  alt: string;
  epigrafe: string;
  categoria: CategoriaGaleria;
}

export const GALERIA: FotoGaleria[] = [
  // ── El edificio ────────────────────────────────────────────────────
  {
    src: esquinaAmanecer,
    alt: "Render del edificio Heredia visto desde la esquina, al amanecer",
    epigrafe: "La esquina de Heredia y Av. Álvarez Thomas, al amanecer.",
    categoria: "El edificio",
  },
  {
    src: accesoAmanecer,
    alt: "Render del acceso peatonal sobre la calle Heredia, con el local en la esquina",
    epigrafe: "El acceso sobre Heredia, con el local de la esquina en planta baja.",
    categoria: "El edificio",
  },
  {
    src: localEsquina,
    alt: "Render de la planta baja a nivel de vereda, con el local comercial vidriado",
    epigrafe: "La ochava a nivel de vereda: ladrillo, madera y el local vidriado.",
    categoria: "El edificio",
  },
  // ── Las unidades ───────────────────────────────────────────────────
  {
    src: estarEsquina,
    alt: "Render del estar de una unidad con la esquina completamente vidriada",
    epigrafe: "El estar con la esquina vidriada y la vista abierta del barrio bajo.",
    categoria: "Las unidades",
  },
  {
    src: cocinaIsla,
    alt: "Render de la cocina integrada con isla y vista a la terraza propia",
    epigrafe: "Cocina integrada con isla, abierta a la terraza.",
    categoria: "Las unidades",
  },
  {
    src: unidad3amb,
    alt: "Render del living comedor del tres ambientes",
    epigrafe: "Living del tres ambientes, pisos 1 a 5.",
    categoria: "Las unidades",
  },
  {
    src: unidad3esq,
    alt: "Render del estar comedor del tres ambientes en esquina",
    epigrafe: "Tres ambientes esquina: el estar sobre la ochava.",
    categoria: "Las unidades",
  },
  {
    src: unidad2amb,
    alt: "Render del estar del dos ambientes abierto al balcón",
    epigrafe: "Dos ambientes: el estar abierto al balcón corrido.",
    categoria: "Las unidades",
  },
  {
    src: unidadPiso6,
    alt: "Render del estar y la cocina de una unidad del piso 6, abiertos a la terraza propia",
    epigrafe: "Piso 6: estar y cocina abiertos a la terraza propia.",
    categoria: "Las unidades",
  },
  {
    src: unidad601,
    alt: "Render del interior de la unidad 601 al atardecer",
    epigrafe: "La unidad 601 al atardecer, con la parrilla en la terraza.",
    categoria: "Las unidades",
  },
  {
    src: unidad3ambNoche,
    alt: "Render del living de un tres ambientes iluminado al anochecer",
    epigrafe: "El living al anochecer.",
    categoria: "Las unidades",
  },
  {
    src: balconEsquina,
    alt: "Render del balcón terraza en esquina con parrilla propia y mesa tendida",
    epigrafe: "Balcón terraza en esquina, con parrilla propia.",
    categoria: "Las unidades",
  },
  // ── La terraza ─────────────────────────────────────────────────────
  {
    src: terrazaParrillaDia,
    alt: "Render de la terraza común con deck de madera, césped y el volumen de la parrilla",
    epigrafe: "La terraza común: deck, área verde y parrilla.",
    categoria: "La terraza",
  },
  {
    src: terrazaParrillaAtardecer,
    alt: "Render del sector de parrilla de la terraza común al atardecer, con la pileta al fondo",
    epigrafe: "La parrilla de la terraza, al atardecer.",
    categoria: "La terraza",
  },
  {
    src: terrazaPiletaDia,
    alt: "Render de la pileta de la terraza común con el deck y la ciudad de fondo",
    epigrafe: "La pileta y el deck, con la ciudad de fondo.",
    categoria: "La terraza",
  },
  {
    src: terrazaPiletaAmanecer,
    alt: "Render de la pileta de la terraza común al amanecer, con el skyline de la ciudad",
    epigrafe: "La pileta al amanecer, en el último piso.",
    categoria: "La terraza",
  },
];
