/* OBRAS ENTREGADAS — los emprendimientos que ya están terminados.
 *
 * Son la trayectoria de Ana, no una unidad en venta: acá no hay precios ni
 * disponibilidad. El nombre de cada obra es el de la calle, tal como llegan
 * las carpetas de fotos ("Proyecto Jaramillo").
 *
 * ▸ CÓMO CARGAR UNA OBRA
 *   1. Poné las fotos en  images/terminados/<slug>/  a 2000 px de lado
 *      largo, JPEG calidad 78 (sharp, fit "inside").
 *   2. Importalas abajo y agregá la entrada con su portada y su lista.
 *   3. `alt` describe la foto para quien no la ve. No es decorativo: es el
 *      único acceso al contenido para un lector de pantalla.
 *
 * ▸ PENDIENTE DE CONFIRMAR: los barrios están deducidos de la calle de cada
 *   obra, no de un dato que haya pasado Ana. Verificar antes de publicar.
 */

import type { StaticImageData } from "next/image";

/* ── Proyecto Jaramillo ─────────────────────────────────────────────── */
import jaramillo05 from "@/images/terminados/jaramillo/05.jpg";
import jaramillo07 from "@/images/terminados/jaramillo/07.jpg";
import jaramillo15 from "@/images/terminados/jaramillo/15.jpg";
import jaramillo28 from "@/images/terminados/jaramillo/28.jpg";
import jaramillo36 from "@/images/terminados/jaramillo/36.jpg";
import jaramillo61 from "@/images/terminados/jaramillo/61.jpg";

/* ── Proyecto Teodoro García ────────────────────────────────────────── */
import teodoro01 from "@/images/terminados/teodoro-garcia/01.jpg";
import teodoro11 from "@/images/terminados/teodoro-garcia/11.jpg";
import teodoro22 from "@/images/terminados/teodoro-garcia/22.jpg";
import teodoroB02 from "@/images/terminados/teodoro-garcia/b02.jpg";
import teodoroB07 from "@/images/terminados/teodoro-garcia/b07.jpg";
import teodoroB19 from "@/images/terminados/teodoro-garcia/b19.jpg";

/* ── Proyecto Moldes ────────────────────────────────────────────────── */
import moldes10 from "@/images/terminados/moldes/10.jpg";
import moldes17 from "@/images/terminados/moldes/17.jpg";
import moldes21 from "@/images/terminados/moldes/21.jpg";
import moldes24 from "@/images/terminados/moldes/24.jpg";
import moldes48 from "@/images/terminados/moldes/48.jpg";
import moldes50 from "@/images/terminados/moldes/50.jpg";

/* ── Proyecto Giribone ──────────────────────────────────────────────── */
import giribone104 from "@/images/terminados/giribone/104.jpg";
import giribone22 from "@/images/terminados/giribone/22.jpg";
import giribone28 from "@/images/terminados/giribone/28.jpg";
import giribone42 from "@/images/terminados/giribone/42.jpg";
import giribone60 from "@/images/terminados/giribone/60.jpg";
import giribone65 from "@/images/terminados/giribone/65.jpg";

/* ── Proyecto Naón ──────────────────────────────────────────────────── */
import naon09 from "@/images/terminados/naon/09.jpg";
import naon11 from "@/images/terminados/naon/11.jpg";
import naon14 from "@/images/terminados/naon/14.jpg";
import naon19 from "@/images/terminados/naon/19.jpg";
import naon21 from "@/images/terminados/naon/21.jpg";

export interface FotoObra {
  src: StaticImageData;
  alt: string;
}

export interface Terminado {
  id: string;
  /** Como se lee en pantalla. */
  nombre: string;
  /** ⚠ Deducido de la calle. Confirmar con Ana. */
  barrio: string;
  /** La que abre la grilla. Suele repetirse como primera de `fotos`. */
  portada: StaticImageData;
  portadaAlt: string;
  fotos: FotoObra[];
}

export const TERMINADOS: Terminado[] = [
  {
    id: "jaramillo",
    nombre: "Proyecto Jaramillo",
    barrio: "Saavedra",
    portada: jaramillo05,
    portadaAlt: "Fachada de hormigón del Proyecto Jaramillo vista desde la calle",
    fotos: [
      { src: jaramillo05, alt: "Fachada completa desde la vereda, con los balcones en voladizo recortados contra el cielo" },
      { src: jaramillo07, alt: "Acceso al edificio: reja metálica y muro de hormigón visto" },
      { src: jaramillo28, alt: "Pasillo de acceso al patio interior, con vegetación tropical a los costados" },
      { src: jaramillo36, alt: "El patio interior visto desde el pasillo, con el banco y la vegetación" },
      { src: jaramillo15, alt: "Living comedor de un departamento terminado, con sofá, mesa y salida al balcón" },
      { src: jaramillo61, alt: "Terraza con ventanal de piso a techo y vista abierta a la ciudad" },
    ],
  },
  {
    id: "teodoro-garcia",
    nombre: "Proyecto Teodoro García",
    barrio: "Colegiales",
    portada: teodoro01,
    portadaAlt: "Fachada del Proyecto Teodoro García entre los árboles de la vereda",
    fotos: [
      { src: teodoro01, alt: "La fachada entre los árboles de la vereda, en otoño" },
      { src: teodoro11, alt: "Balcón corrido que recorre el frente de la unidad" },
      { src: teodoro22, alt: "Cocina con mesada corrida y muebles de madera" },
      { src: teodoroB07, alt: "Estar amueblado con sofá y salida al jardín" },
      { src: teodoroB02, alt: "Salón de usos comunes con mesa larga y revestimiento de madera" },
      { src: teodoroB19, alt: "Patio de noche, con el muro de madera iluminado y la vegetación en primer plano" },
    ],
  },
  {
    id: "moldes",
    nombre: "Proyecto Moldes",
    barrio: "Belgrano",
    portada: moldes10,
    portadaAlt: "Estar del Proyecto Moldes con ventanal corrido hacia la terraza",
    fotos: [
      { src: moldes10, alt: "Estar con ventanal corrido que abre a una terraza con cantero" },
      { src: moldes17, alt: "Fachada de ladrillo del edificio, con sus ventanas alineadas" },
      { src: moldes21, alt: "Terraza con parrilla y cantero, junto al ventanal de la unidad" },
      { src: moldes50, alt: "Expansión con celosía metálica y plantas colgantes" },
      { src: moldes24, alt: "Estar habitado con hamaca paraguaya frente al ventanal" },
      { src: moldes48, alt: "El local comercial del edificio, a nivel de vereda" },
    ],
  },
  {
    id: "giribone",
    nombre: "Proyecto Giribone",
    barrio: "Villa Ortúzar",
    portada: giribone104,
    portadaAlt: "Fachada del Proyecto Giribone entre los árboles de la calle",
    fotos: [
      { src: giribone104, alt: "La fachada vista desde la esquina, entre los árboles de la calle" },
      { src: giribone28, alt: "Detalle de fachada: balcones y celosías sobre el paramento" },
      { src: giribone42, alt: "Patio de acceso con vegetación contra el muro de ladrillo" },
      { src: giribone65, alt: "Pasillo exterior con cantero corrido y cerramiento vidriado" },
      { src: giribone22, alt: "Terraza semicubierta con vista a los edificios vecinos" },
      { src: giribone60, alt: "Oficina con ventanal al patio, sillones y biblioteca corrida" },
    ],
  },
  {
    id: "naon",
    nombre: "Proyecto Naón",
    barrio: "Villa Urquiza",
    portada: naon09,
    portadaAlt: "Fachada del Proyecto Naón vista en contrapicado",
    fotos: [
      { src: naon09, alt: "La fachada vista en contrapicado, con vegetación en los balcones" },
      { src: naon14, alt: "Detalle de fachada: hormigón y ladrillo recortados contra el cielo" },
      { src: naon19, alt: "El edificio visto desde la calle, con la estructura a la vista" },
      { src: naon11, alt: "Acceso al edificio y portones de las cocheras" },
      { src: naon21, alt: "Hall de acceso con espejo, artefactos colgantes y piso oscuro" },
    ],
  },
];
