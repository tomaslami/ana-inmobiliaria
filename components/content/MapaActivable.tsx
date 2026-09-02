"use client";

import { useState } from "react";

export interface MapaActivableProps {
  src: string;
  title: string;
}

/**
 * Iframe de mapa que en pantalla táctil arranca "dormido": un mapa embebido
 * captura el gesto de arrastre y deja al visitante atrapado sin poder seguir
 * scrolleando la página. Hasta que no se toca el botón, el iframe no recibe
 * punteros (solo en pantallas táctiles — con mouse es interactivo desde el
 * inicio, ver CSS de .mapa__activar).
 */
export function MapaActivable({ src, title }: MapaActivableProps) {
  const [activo, setActivo] = useState(false);

  return (
    <>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        data-activo={activo || undefined}
      />
      {!activo && (
        <button type="button" className="mapa__activar" onClick={() => setActivo(true)}>
          <span>Tocá para mover el mapa</span>
        </button>
      )}
    </>
  );
}
