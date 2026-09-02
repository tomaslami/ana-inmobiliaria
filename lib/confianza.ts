/* CONFIANZA — las marcas con las que trabaja Ana.
 *
 * ▸ CÓMO CARGAR UN LOGO
 *   1. Guardá el archivo en  images/marcas/  (PNG o SVG con fondo
 *      transparente; alto útil ~80 px alcanza).
 *   2. Importalo abajo y agregá la entrada con `logo`.
 *   3. Sin `logo`, la marca se muestra como palabra en la serif del sitio
 *      (queda bien igual — sirve para estudios sin isologo).
 *
 * Las entradas con `ejemplo: true` son relleno para ver la banda andando:
 * se pintan como borrador y NO deben llegar a producción.
 */

import type { StaticImageData } from "next/image";

export interface Marca {
  nombre: string;
  logo?: StaticImageData;
  /** Marca de borrador: pinta el lugar como ejemplo. Borrar al cargar la real. */
  ejemplo?: boolean;
}

export const MARCAS: Marca[] = [
  { nombre: "Supercielo" },
  { nombre: "Marca a cargar", ejemplo: true },
  { nombre: "Marca a cargar", ejemplo: true },
  { nombre: "Marca a cargar", ejemplo: true },
  { nombre: "Marca a cargar", ejemplo: true },
  { nombre: "Marca a cargar", ejemplo: true },
];
