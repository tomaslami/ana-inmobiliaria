"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { IconButton } from "../core/IconButton";
import { GALERIA } from "../../lib/galeria";

/**
 * Galería del emprendimiento — el pico oscuro de la página.
 *
 * Superficie profunda para que la fotografía sea lo único iluminado del
 * bloque. El cruce entre fotos es direccional: la que entra se desplaza
 * apenas desde el lado hacia el que navegás y la que sale cede en sentido
 * contrario. Contador y epígrafe acompañan con un relevo corto.
 *
 * En pantalla táctil el escenario acepta arrastre horizontal. Sin JS queda
 * la primera foto visible con su epígrafe: nada se pierde.
 *
 * Sólo se montan las fotos cercanas a la actual: dieciséis imágenes a
 * pantalla completa no se cargan todas juntas.
 */

const VENTANA = 1; // cuántas fotos se precargan a cada lado

export function Galeria() {
  const [indice, setIndice] = useState(0);
  const [montadas, setMontadas] = useState<Set<number>>(() => new Set([0, 1]));
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const previoRef = useRef(0);
  const dirRef = useRef(1);
  const gestoRef = useRef<{ x: number; y: number } | null>(null);

  const total = GALERIA.length;
  const foto = GALERIA[indice];

  const ir = useCallback(
    (siguiente: number, dir?: 1 | -1) => {
      setIndice((actual) => {
        const destino = (siguiente + total) % total;
        if (destino === actual) return actual;
        dirRef.current = dir ?? (destino > actual ? 1 : -1);
        setMontadas((previas) => {
          const proximas = new Set(previas);
          for (let d = -VENTANA; d <= VENTANA; d += 1) proximas.add((destino + d + total) % total);
          return proximas;
        });
        return destino;
      });
    },
    [total],
  );

  /* Cruce direccional entre fotos + relevo de contador y epígrafe. */
  useEffect(() => {
    const anterior = previoRef.current;
    previoRef.current = indice;
    if (anterior === indice) return;

    const dir = dirRef.current;
    const sale = slidesRef.current[anterior];
    const entra = slidesRef.current[indice];
    if (!entra) return;

    const ctx = gsap.context(() => {
      if (sale) gsap.to(sale, { opacity: 0, xPercent: -2 * dir, duration: 0.4, ease: "power2.in" });
      gsap.fromTo(
        entra,
        { opacity: 0, xPercent: 3 * dir, scale: 1.015 },
        { opacity: 1, xPercent: 0, scale: 1, duration: 0.65, ease: "expo.out" },
      );
      const relevo = [captionRef.current, countRef.current].filter(Boolean);
      if (relevo.length) {
        gsap.fromTo(relevo, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" });
      }
    });
    return () => ctx.revert();
  }, [indice]);

  /* El riel sigue a la foto activa.
     Se mueve el scroll del riel a mano y no con scrollIntoView: ese arrastra
     TODOS los contenedores con scroll, incluido el documento, así que al cambiar
     de foto la página entera se corría sola. */
  useEffect(() => {
    const riel = railRef.current;
    const activo = riel?.children[indice] as HTMLElement | undefined;
    if (!riel || !activo) return;
    const centrado = activo.offsetLeft - (riel.clientWidth - activo.clientWidth) / 2;
    riel.scrollTo({
      left: Math.max(0, Math.min(centrado, riel.scrollWidth - riel.clientWidth)),
      behavior: "smooth",
    });
  }, [indice]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ir(indice - 1, -1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      ir(indice + 1, 1);
    }
  }

  /* Arrastre horizontal sobre el escenario. El umbral alto y el chequeo del
     eje evitan robarle el gesto al scroll vertical de la página. */
  function onPointerDown(e: React.PointerEvent) {
    gestoRef.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: React.PointerEvent) {
    const inicio = gestoRef.current;
    gestoRef.current = null;
    if (!inicio) return;
    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    ir(indice + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }

  const posicion = `${String(indice + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section className="galeria" id="galeria" aria-labelledby="galeria-titulo" onKeyDown={onKeyDown}>
      <div className="ac-container">
        <div className="galeria__head" data-reveal>
          <div>
            <h2 className="ac-h2" id="galeria-titulo">
              Heredia, en imágenes.
            </h2>
            <p className="ac-body-sm">
              Los renders del proyecto, en un recorrido: el edificio, las unidades y la terraza.
            </p>
          </div>
          <p className="galeria__count" aria-hidden="true">
            <span ref={countRef}>{posicion}</span>
          </p>
        </div>
      </div>

      <div className="ac-container">
        <div
          className="galeria__stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (gestoRef.current = null)}
        >
          {GALERIA.map((f, i) => {
            const visible = i === indice;
            if (!montadas.has(i)) return null;
            return (
              <div
                key={f.epigrafe}
                className="galeria__slide"
                data-active={visible ? "true" : "false"}
                ref={(el) => {
                  slidesRef.current[i] = el;
                }}
                aria-hidden={!visible}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  quality={82}
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="ac-container">
        <div className="galeria__bar">
          <p className="galeria__caption" aria-live="polite" ref={captionRef}>
            <span className="ac-eyebrow" style={{ color: "var(--text-on-photo-muted)" }}>
              {foto.categoria} · {posicion}
            </span>
            <br />
            {foto.epigrafe}
          </p>
          <div className="galeria__nav">
            <IconButton icon="chevron-left" label="Foto anterior" bordered onClick={() => ir(indice - 1, -1)} />
            <IconButton icon="chevron-right" label="Foto siguiente" bordered onClick={() => ir(indice + 1, 1)} />
          </div>
        </div>

        <div className="galeria__rail" ref={railRef} aria-label="Fotos del emprendimiento" role="group">
          {GALERIA.map((f, i) => (
            <button
              key={f.epigrafe}
              type="button"
              className="galeria__thumb"
              aria-current={i === indice ? "true" : undefined}
              aria-label={`Ver foto ${i + 1} de ${total}: ${f.epigrafe}`}
              onClick={() => ir(i)}
            >
              <Image
                src={f.src}
                alt=""
                width={170}
                height={128}
                quality={60}
                loading="lazy"
                placeholder="blur"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
