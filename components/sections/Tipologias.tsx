"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Button } from "../core/Button";
import { Icon } from "../core/Icon";
import { Accordion } from "../content/Accordion";
import {
  GRUPOS,
  TIPOLOGIAS,
  TERMINACIONES_DESTACADAS,
  TERMINACIONES_RESTO,
  WA,
  type Tipologia,
} from "../../lib/heredia";

/**
 * Explorador de tipologías — la sección técnica del bloque Heredia.
 *
 * Dos niveles de selección: primero el grupo de pisos (la forma del edificio),
 * después la planta. El plano es el protagonista; los números lo escoltan en
 * el mismo registro de pliego que el resto del sitio.
 *
 * El cambio de tipología anima plano y datos con GSAP, pero el estado inicial
 * del marcado es completo y visible: sin JS queda la primera tipología
 * perfectamente legible.
 */

function fmt(n: number): string {
  return n.toLocaleString("es-AR", { maximumFractionDigits: 1 });
}

export function Tipologias() {
  const [activa, setActiva] = useState<Tipologia>(TIPOLOGIAS[0]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const planoRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const primeraRef = useRef(true);

  const delGrupo = TIPOLOGIAS.filter((t) => t.grupo === activa.grupo);

  function elegir(t: Tipologia) {
    if (t.id !== activa.id) setActiva(t);
  }

  function elegirGrupo(id: Tipologia["grupo"]) {
    if (id === activa.grupo) return;
    const primera = TIPOLOGIAS.find((t) => t.grupo === id);
    if (primera) setActiva(primera);
  }

  /* Flechas para moverse entre solapas de tipología. */
  function onTabsKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = delGrupo.findIndex((t) => t.id === activa.id);
    const destino = delGrupo[(i + (e.key === "ArrowRight" ? 1 : -1) + delGrupo.length) % delGrupo.length];
    setActiva(destino);
    const boton = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${destino.id}"]`);
    boton?.focus();
  }

  /* Entrada del contenido al cambiar de tipología. La primera pintura no se
     anima: el estado por defecto es visible y completo. */
  useLayoutEffect(() => {
    if (primeraRef.current) {
      primeraRef.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (planoRef.current) {
        gsap.fromTo(
          planoRef.current,
          { opacity: 0, scale: 0.985, clipPath: "inset(0% 0% 5% 0%)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "expo.out", clearProps: "clipPath" },
        );
      }
      const filas = panelRef.current?.querySelectorAll("[data-tipo-anim]");
      if (filas?.length) {
        gsap.fromTo(
          filas,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", stagger: 0.045 },
        );
      }
    });
    return () => ctx.revert();
  }, [activa.id]);

  return (
    <section className="ac-section zona-terra" id="tipologias">
      <div className="ac-container">
        <div className="tipos__head" data-reveal>
          <h2 className="ac-h1" style={{ maxWidth: "16ch" }}>
            Ocho plantas, ninguna repetida.
          </h2>
          <p className="ac-body-sm" style={{ maxWidth: "36ch" }}>
            Elegí el piso y la tipología para ver el plano con sus medidas reales, tal como figuran
            en el brochure.
          </p>
        </div>

        <div className="tipos__selector" data-reveal>
          <div className="tipos__grupos" role="group" aria-label="Grupo de pisos">
            {GRUPOS.map((g) => (
              <button
                key={g.id}
                type="button"
                className="tipos__grupo"
                aria-pressed={g.id === activa.grupo}
                onClick={() => elegirGrupo(g.id)}
              >
                <span className="tipos__grupo-label">{g.label}</span>
                {g.nota && <span className="tipos__grupo-nota">{g.nota}</span>}
              </button>
            ))}
          </div>

          <div
            className="tipos__tabs"
            role="tablist"
            aria-label="Tipologías del grupo"
            ref={tabsRef}
            onKeyDown={onTabsKeyDown}
          >
            {delGrupo.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                data-tab-id={t.id}
                id={`tipo-tab-${t.id}`}
                aria-selected={t.id === activa.id}
                aria-controls="tipo-panel"
                tabIndex={t.id === activa.id ? 0 : -1}
                className="tipos__tab"
                onClick={() => elegir(t)}
              >
                {t.tab}
              </button>
            ))}
          </div>
        </div>

        <div
          className="tipos__panel"
          id="tipo-panel"
          role="tabpanel"
          aria-labelledby={`tipo-tab-${activa.id}`}
          ref={panelRef}
        >
          {/* El plano va primero en el DOM y en pantalla: es la respuesta a
              la solapa elegida; los números lo escoltan. */}
          <figure className="tipos__plano" data-reveal-media>
            <div className="tipos__plano-marco" ref={planoRef}>
              <Image
                key={activa.id}
                src={activa.plano}
                alt={activa.planoAlt}
                placeholder="blur"
                sizes="(min-width: 62rem) 58vw, 100vw"
                quality={82}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <figcaption className="ac-media__caption">
              Plano del brochure oficial — medidas y superficies orientativas.
            </figcaption>
          </figure>

          <div className="tipos__datos">
            <div data-tipo-anim>
              <p className="tipos__nombre">{activa.nombre}</p>
              <div className="tipos__total">
                <span className="tipos__total-cifra">{fmt(activa.total)}</span>
                <span className="tipos__total-unidad">m² totales</span>
              </div>
            </div>

            <dl className="tipos__superficie" data-tipo-anim>
              <div>
                <dt>Cubierta</dt>
                <dd>{fmt(activa.cubierta)} m²</dd>
              </div>
              <div>
                <dt>Descubierta</dt>
                <dd>{fmt(activa.descubierta)} m²</dd>
              </div>
              <div>
                <dt>Común</dt>
                <dd>{fmt(activa.comun)} m²</dd>
              </div>
            </dl>

            <div data-tipo-anim>
              <p className="tipos__rotulo">
                {activa.unidades.length === 1 ? "Unidad" : "Unidades"}
              </p>
              <ul className="tipos__unidades">
                {activa.unidades.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>

            <div data-tipo-anim>
              <p className="tipos__rotulo">Medidas por ambiente</p>
              <ul className="tipos__medidas">
                {activa.ambientes.map((a, i) => (
                  <li key={`${a.nombre}-${i}`}>
                    <span className="tipos__medida-nombre">{a.nombre}</span>
                    {a.medidas !== "—" && <span className="tipos__medida-valor">{a.medidas} m</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ac-actions" data-tipo-anim>
              <Button
                variant="outline"
                href={WA.tipologia(activa.nombre)}
                target="_blank"
                rel="noopener"
                iconEnd={<Icon name="arrow-up-right" />}
              >
                Consultar por esta tipología
              </Button>
            </div>
          </div>
        </div>

        <div className="term" data-reveal>
          <div className="term__head">
            <h3 className="ac-h3">Terminaciones de las unidades</h3>
            <p className="ac-body-sm" style={{ maxWidth: "34ch" }}>
              Lo que está especificado de fábrica, sin letra chica: esto es lo que firma la
              desarrolladora.
            </p>
          </div>

          <div>
            <dl className="term__lista" data-reveal data-reveal-stagger>
              {TERMINACIONES_DESTACADAS.map((t) => (
                <div className="term__fila" key={t.rotulo}>
                  <dt>{t.rotulo}</dt>
                  <dd>{t.detalle}</dd>
                </div>
              ))}
            </dl>

            <Accordion
              idPrefix="term"
              defaultOpen={null}
              items={[
                {
                  question: "Ver el resto de las terminaciones",
                  answer: (
                    <dl className="term__lista term__lista--anidada">
                      {TERMINACIONES_RESTO.map((t) => (
                        <div className="term__fila" key={t.rotulo}>
                          <dt>{t.rotulo}</dt>
                          <dd>{t.detalle}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
