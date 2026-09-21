/* GALERÍA DE HEREDIA — diez paradas: edificio, unidades y terraza. */

import type { StaticImageData } from "next/image";

import estarEsquina from "@/images/emprendimiento/estar-esquina.jpg";
import unidad3amb from "@/images/emprendimiento/unidad-3amb.jpg";
import unidad2amb from "@/images/emprendimiento/unidad-2amb.jpg";
import balconEsquina from "@/images/emprendimiento/balcon-esquina.jpg";
import terrazaParrillaAtardecer from "@/images/emprendimiento/terraza-parrilla-atardecer.jpg";
import terrazaPiletaDia from "@/images/emprendimiento/terraza-pileta-dia.jpg";
import posterFachada from "@/images/emprendimiento/video-fachada-exterior.jpg";
import posterAcceso from "@/images/emprendimiento/video-acceso.jpg";
import posterInterior from "@/images/emprendimiento/video-interior-602.jpg";

export type CategoriaGaleria = "El edificio" | "Las unidades" | "La terraza";

interface BaseGaleria {
  alt: string;
  epigrafe: string;
  categoria: CategoriaGaleria;
}

export type ElementoGaleria =
  | (BaseGaleria & { tipo: "foto"; src: StaticImageData })
  | (BaseGaleria & { tipo: "video"; src: string; poster: StaticImageData });

export const GALERIA: ElementoGaleria[] = [
  {
    tipo: "video",
    src: "/heredia/fachada-exterior.mp4",
    poster: posterFachada,
    alt: "Video render de la fachada completa de Heredia vista desde la esquina",
    epigrafe: "La fachada de Heredia, vista desde la esquina.",
    categoria: "El edificio",
  },
  {
    tipo: "video",
    src: "/heredia/acceso.mp4",
    poster: posterAcceso,
    alt: "Video render del acceso y el local de la planta baja de Heredia",
    epigrafe: "El acceso y el local sobre la planta baja.",
    categoria: "El edificio",
  },
  {
    tipo: "foto",
    src: estarEsquina,
    alt: "Render del estar de una unidad con la esquina completamente vidriada",
    epigrafe: "El estar con la esquina vidriada y la vista abierta del barrio bajo.",
    categoria: "Las unidades",
  },
  {
    tipo: "foto",
    src: unidad3amb,
    alt: "Render del living comedor del tres ambientes",
    epigrafe: "Living del tres ambientes, pisos 1 a 5.",
    categoria: "Las unidades",
  },
  {
    tipo: "foto",
    src: unidad2amb,
    alt: "Render del estar del dos ambientes abierto al balcón",
    epigrafe: "Dos ambientes: el estar abierto al balcón corrido.",
    categoria: "Las unidades",
  },
  {
    tipo: "video",
    src: "/heredia/interior-602.mp4",
    poster: posterInterior,
    alt: "Video render del estar y la cocina de la unidad 602 abiertos a la terraza",
    epigrafe: "La unidad 602 y su expansión hacia la terraza.",
    categoria: "Las unidades",
  },
  {
    tipo: "foto",
    src: balconEsquina,
    alt: "Render del balcón terraza en esquina con parrilla propia y mesa tendida",
    epigrafe: "Balcón terraza en esquina, con parrilla propia.",
    categoria: "Las unidades",
  },
  {
    tipo: "foto",
    src: terrazaParrillaAtardecer,
    alt: "Render del sector de parrilla de la terraza común al atardecer, con la pileta al fondo",
    epigrafe: "La parrilla de la terraza, al atardecer.",
    categoria: "La terraza",
  },
  {
    tipo: "foto",
    src: terrazaPiletaDia,
    alt: "Render de la pileta de la terraza común con el deck y la ciudad de fondo",
    epigrafe: "La pileta y el deck, con la ciudad de fondo.",
    categoria: "La terraza",
  },
];
