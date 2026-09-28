"use client";

import { useEffect } from "react";
import { guardarAtribucion } from "../../lib/atribucion";

/** Guarda el gclid/utm del anuncio apenas se entra al sitio. No pinta nada. */
export default function GclidCapture() {
  useEffect(() => {
    guardarAtribucion();
  }, []);
  return null;
}
