"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Icon } from "../core/Icon";
import { PROPIEDADES, WA_CARTERA_VACIA, waPropiedad, type Operacion } from "../../lib/propiedades";

/**
 * Cartera — el índice de propiedades disponibles, en registro de pliego.
 *
 * Nada de carrusel: cada propiedad es una FILA con filete — foto chica,
 * dirección en serif como titular, datos tabulares y el precio (o
 * "Consultar") a la derecha. Toda la fila es un link a WhatsApp con el
 * mensaje ya armado para esa propiedad.
 *
 * Los filtros son botones de estado (Todas / Venta / Alquiler) en el mismo
 * lenguaje del explorador de tipologías, con acento salvia: la cartera es
 * de Ana, no de Heredia. Al filtrar, las filas visibles entran en escalera.
 *
 * Sin JS queda la lista completa visible: el filtro es mejora, no requisito.
 */

type Filtro = "todas" | Operacion;

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "venta", label: "Venta" },
  { id: "alquiler", label: "Alquiler" },
];

function fmtSuperficie(m2: number): string {
  return `${m2.toLocaleString("es-AR")} m²`;
}

export function Propiedades() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const listaRef = useRef<HTMLUListElement | null>(null);
  const primeraRef = useRef(true);

  const visibles = PROPIEDADES.filter((p) => filtro === "todas" || p.operacion === filtro);
  const cuenta = (op: Operacion) => PROPIEDADES.filter((p) => p.operacion === op).length;

  /* Al cambiar el filtro, las filas que quedan entran en escalera corta.
     La primera pintura no se anima: el estado por defecto es visible. */
  useLayoutEffect(() => {
    if (primeraRef.current) {
      primeraRef.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const filas = listaRef.current?.querySelectorAll(".cartera__fila");
    if (!filas?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        filas,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "expo.out", stagger: 0.05 },
      );
    });
    return () => ctx.revert();
  }, [filtro]);

  return (
    <section className="ac-section" id="propiedades">
      <div className="ac-container">
        <div className="cartera__head" data-reveal>
          <h2 className="ac-h1" style={{ maxWidth: "14ch" }}>
            En cartera, hoy.
          </h2>
          <p className="ac-body-sm" style={{ maxWidth: "36ch" }}>
            Además de Heredia, estas son las propiedades que tengo disponibles. Tocá cualquiera y
            hablamos por WhatsApp.
          </p>
        </div>

        <div className="cartera__filtros" role="group" aria-label="Filtrar por operación" data-reveal>
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="cartera__filtro"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
              <span className="cartera__filtro-cuenta">
                {f.id === "todas" ? PROPIEDADES.length : cuenta(f.id)}
              </span>
            </button>
          ))}
        </div>

        <p className="ac-visually-hidden" aria-live="polite">
          {visibles.length === 1 ? "Una propiedad" : `${visibles.length} propiedades`} en la lista.
        </p>

        {visibles.length > 0 ? (
          <ul className="cartera__lista" ref={listaRef} data-reveal>
            {visibles.map((p) => (
              <li key={p.id}>
                <a
                  className="cartera__fila"
                  data-ejemplo={p.ejemplo || undefined}
                  href={waPropiedad(p)}
                  target="_blank"
                  rel="noopener"
                >
                  <span className="cartera__foto">
                    {p.foto ? (
                      <Image
                        src={p.foto}
                        alt={p.alt ?? `Fotografía de ${p.titulo}`}
                        fill
                        sizes="(min-width: 48rem) 13rem, 100vw"
                        quality={75}
                        placeholder="blur"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="cartera__foto-hueco">
                        <span>Fotografía</span>
                      </span>
                    )}
                    {p.ejemplo && <span className="cartera__ejemplo">Ejemplo</span>}
                  </span>

                  <span className="cartera__info">
                    <span className="cartera__operacion" data-operacion={p.operacion}>
                      {p.operacion === "venta" ? "Venta" : "Alquiler"}
                    </span>
                    <span className="cartera__titulo">{p.titulo}</span>
                    <span className="cartera__zona">{p.zona}</span>
                  </span>

                  <span className="cartera__datos">
                    <span className="cartera__dato">{p.tipologia}</span>
                    <span className="cartera__dato">{fmtSuperficie(p.superficie)}</span>
                    {p.detalle && <span className="cartera__detalle">{p.detalle}</span>}
                  </span>

                  <span className="cartera__precio">{p.precio ?? "Consultar"}</span>

                  <span className="cartera__flecha" aria-hidden="true">
                    <Icon name="arrow-up-right" size={22} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cartera__vacio" data-reveal>
            <p className="ac-body">
              No tengo {filtro === "venta" ? "propiedades en venta" : "alquileres"} disponibles en
              este momento.
            </p>
            <p className="ac-body-sm">
              <a href={WA_CARTERA_VACIA} target="_blank" rel="noopener">
                Escribime
              </a>{" "}
              y te aviso apenas entre algo que encaje con lo que buscás.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
