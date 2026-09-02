"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "../core/IconButton";
import { MARCAS } from "../../lib/confianza";

/**
 * Quiénes confían en mí — banda infinita de marcas.
 *
 * Marquee de CSS puro: la pista lleva la lista dos veces y desplaza el 50%
 * de su ancho en loop; la segunda copia está oculta al lector de pantalla.
 * Movimiento automático de más de cinco segundos ⇒ control de pausa real
 * (WCAG 2.2.2): el botón de la cabecera congela la banda, además de la
 * pausa por hover. Con reduced-motion queda quieta y envuelta, y el botón
 * desaparece porque no hay nada que pausar.
 *
 * Los logos van desaturados y recuperan color al pasar por encima —
 * el mismo gesto del mapa.
 */

function Marcas({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="confianza__lista" aria-hidden={ariaHidden || undefined}>
      {MARCAS.map((m, i) => (
        <li key={`${m.nombre}-${i}`} className="confianza__marca" data-ejemplo={m.ejemplo || undefined}>
          {m.logo ? (
            <Image src={m.logo} alt={m.nombre} height={40} quality={82} className="confianza__logo" />
          ) : (
            <span className="confianza__palabra">{m.nombre}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Confianza() {
  const [pausado, setPausado] = useState(false);

  return (
    <section className="ac-section confianza" aria-labelledby="confianza-titulo">
      <div className="ac-container confianza__head" data-reveal>
        <div className="confianza__rotulo">
          <h2 className="ac-h3" id="confianza-titulo">
            Quiénes confían en mí.
          </h2>
          <p className="ac-body-sm">Desarrolladoras y estudios con los que trabajo.</p>
        </div>
        <span className="confianza__pausa">
          <IconButton
            icon={pausado ? "play" : "pause"}
            label={pausado ? "Reanudar el movimiento de las marcas" : "Pausar el movimiento de las marcas"}
            bordered
            aria-pressed={pausado}
            onClick={() => setPausado((v) => !v)}
          />
        </span>
      </div>
      <div className="confianza__banda" data-pausado={pausado || undefined} data-reveal>
        <div className="confianza__viento">
          <Marcas />
          <Marcas ariaHidden />
        </div>
      </div>
    </section>
  );
}
