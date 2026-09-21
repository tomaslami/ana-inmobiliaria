"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { IconButton } from "../core/IconButton";
import { Icon } from "../core/Icon";
import { TERMINADOS, type Terminado } from "../../lib/terminados";

/**
 * Obras entregadas — la trayectoria, no el catálogo.
 *
 * La grilla muestra una portada por obra en registro de pliego: rótulo
 * arriba, nombre en serif, barrio y cantidad de fotos. Al tocar una portada
 * se abre el visor con todas las fotos de esa obra.
 *
 * El visor es un <dialog> nativo abierto con showModal(): el foco queda
 * atrapado y el resto de la página se vuelve inerte sin que tengamos que
 * escribir —ni mantener— una trampa de foco a mano.
 *
 * El movimiento sigue al de la galería de Heredia, porque es el mismo
 * gesto: el visor entra subiendo apenas mientras el velo levanta, y el
 * cruce entre fotos es DIRECCIONAL —la que entra viene del lado hacia el
 * que navegás y la que sale cede en sentido contrario—, con el contador y
 * el epígrafe haciendo un relevo corto. Al cerrar, la caja baja antes de
 * que el diálogo se vaya: sin eso, el cierre es un corte seco.
 *
 * Con prefers-reduced-motion no se anima nada: aparece y cambia, listo.
 *
 * Se montan únicamente las fotos vecinas a la actual: diecisiete imágenes
 * grandes no se cargan todas juntas.
 *
 * Acento salvia y no terracota: estas obras son de Ana, no de Heredia.
 *
 * Sin JS la grilla sigue siendo una lista legible de portadas con su
 * rótulo; lo único que no abre es el visor.
 */

const VENTANA = 1; // cuántas fotos se precargan a cada lado

/* Tiene que coincidir con la animación visor-sale de layout.css: el diálogo
   se cierra recién cuando la caja terminó de bajar. */
const SALIDA_MS = 240;

function ventanaDe(indice: number, total: number): Set<number> {
  const s = new Set<number>();
  for (let d = -VENTANA; d <= VENTANA; d += 1) s.add((indice + d + total) % total);
  return s;
}

function sinMovimiento(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Terminados() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const epigrafeRef = useRef<HTMLParagraphElement | null>(null);
  const cuentaRef = useRef<HTMLSpanElement | null>(null);
  const gestoRef = useRef<{ x: number; y: number } | null>(null);
  /* Qué portada abrió el visor: al cerrar, el foco vuelve ahí. */
  const origenRef = useRef<HTMLButtonElement | null>(null);
  /* Para el cruce direccional: de dónde venimos y hacia dónde vamos. */
  const previoRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);

  const [obra, setObra] = useState<Terminado | null>(null);
  const [indice, setIndice] = useState(0);
  const [montadas, setMontadas] = useState<Set<number>>(() => new Set([0, 1]));

  const total = obra?.fotos.length ?? 0;
  const foto = obra?.fotos[indice];

  const ir = useCallback(
    (siguiente: number, dir?: 1 | -1) => {
      if (!total) return;
      const destino = (siguiente + total) % total;
      if (destino === indice) return;
      dirRef.current = dir ?? (destino > indice ? 1 : -1);
      setIndice(destino);
      setMontadas((previas) => new Set([...previas, ...ventanaDe(destino, total)]));
    },
    [indice, total],
  );

  function abrir(o: Terminado, boton: HTMLButtonElement) {
    origenRef.current = boton;
    previoRef.current = 0;
    dirRef.current = 1;
    slidesRef.current = [];
    setObra(o);
    setIndice(0);
    setMontadas(ventanaDe(0, o.fotos.length));
    dialogRef.current?.showModal();
  }

  /* Entrada y salida del visor van en CSS (ver .visor__caja en layout.css),
     no en GSAP. Son la primera animación de la pantalla: si dependieran del
     reloj de rAF podrían no llegar a dibujarse nunca y el visor aparecería
     de golpe. En CSS son declarativas, y prefers-reduced-motion ya las anula
     desde los tokens. GSAP queda para el cruce entre fotos, que sí ocurre
     con la pantalla viva. */
  const [cerrando, setCerrando] = useState(false);

  /* Baja la persiana: cierra, desmonta y devuelve el foco.
     Todo el desarme pasa por acá y NO por el evento `close` del diálogo.
     React administra el atributo `open` al re-renderizar y puede sacarlo
     por su cuenta, y un <dialog> que se cierra por atributo no emite
     `close`: escuchando ese evento, el bloqueo del scroll de la página
     quedaba puesto para siempre. Es idempotente a propósito. */
  function finalizar() {
    setCerrando(false);
    setObra(null);
    /* close() sin condición: si React ya sacó el atributo `open`, el diálogo
       figura cerrado pero puede seguir en la capa superior. Sobre uno ya
       cerrado close() no hace nada, así que llamarlo siempre es gratis. */
    dialogRef.current?.close();
    origenRef.current?.focus();
  }

  /* El cierre se anima antes de que el diálogo se vaya. Pasa por acá tanto
     el botón como Esc (ver onCancel/onKeyDown), así hay una sola salida. */
  function cerrar() {
    if (!dialogRef.current?.open) return;
    if (sinMovimiento()) {
      finalizar();
      return;
    }
    setCerrando(true);
    window.setTimeout(finalizar, SALIDA_MS);
  }

  /* Cruce direccional entre fotos + relevo de contador y epígrafe. */
  useEffect(() => {
    const anterior = previoRef.current;
    previoRef.current = indice;
    if (!obra || anterior === indice || sinMovimiento()) return;

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
      const relevo = [epigrafeRef.current, cuentaRef.current].filter(Boolean);
      if (relevo.length) {
        gsap.fromTo(relevo, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" });
      }
    });
    return () => ctx.revert();
  }, [indice, obra]);

  /* showModal() no frena el scroll del fondo: en teléfono, arrastrar sobre
     el visor movía la página de atrás.
     Bloquearlo a secas hace desaparecer la barra de la página, y el sitio
     entero se ensancha de golpe por debajo del modal. Se compensa el ancho
     exacto de la barra con padding, así el contenido de atrás no se mueve
     ni un píxel. No se usa scrollbar-gutter: reservar el canal siempre
     achicaría el 100vw del visor y correría el sitio de forma permanente.
     Donde la barra es superpuesta (macOS, táctil) la medida da 0 y no se
     agrega nada. */
  useEffect(() => {
    if (!obra) return;
    const raiz = document.documentElement;
    const barra = window.innerWidth - raiz.clientWidth;
    const overflowPrevio = raiz.style.overflow;
    const paddingPrevio = raiz.style.paddingRight;
    raiz.style.overflow = "hidden";
    if (barra > 0) raiz.style.paddingRight = `${barra}px`;
    return () => {
      raiz.style.overflow = overflowPrevio;
      raiz.style.paddingRight = paddingPrevio;
    };
  }, [obra]);

  /* El riel sigue a la miniatura activa.
     El scroll se mueve a mano y NO con scrollIntoView: ese arrastra todos
     los contenedores con scroll del ancestro, así que además de correr el
     riel pegaba un salto en la página de atrás. */
  useEffect(() => {
    const riel = railRef.current;
    const activa = riel?.children[indice] as HTMLElement | undefined;
    if (!riel || !activa) return;
    const centrada = activa.offsetLeft - (riel.clientWidth - activa.clientWidth) / 2;
    riel.scrollTo({
      left: Math.max(0, Math.min(centrada, riel.scrollWidth - riel.clientWidth)),
      behavior: sinMovimiento() ? "auto" : "smooth",
    });
  }, [indice, obra]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    /* Esc lo cierra el <dialog> por su cuenta, pero no en todos los
       contextos (en un navegador embebido el cierre nativo no llega a
       dispararse). Cerrarlo a mano es idempotente y saca la duda. */
    if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      ir(indice + 1, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      ir(indice - 1, -1);
    }
  }

  /* Arrastre horizontal. El umbral vertical evita robarle el gesto al
     scroll cuando la intención era bajar, no pasar de foto. */
  function onPointerDown(e: React.PointerEvent) {
    gestoRef.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: React.PointerEvent) {
    const inicio = gestoRef.current;
    gestoRef.current = null;
    if (!inicio) return;
    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return;
    ir(indice + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }

  return (
    <section className="ac-section" id="terminados">
      <div className="ac-container">
        <div className="obras__head" data-reveal>
          <h2 className="ac-h1" style={{ maxWidth: "16ch" }}>
            Obras que ya están entregadas.
          </h2>
          <p className="ac-body-sm" style={{ maxWidth: "38ch" }}>
            Emprendimientos que acompañé y hoy están habitados. Tocá cualquiera para ver las fotos
            del edificio terminado.
          </p>
        </div>

        <ul className="obras__grilla" data-reveal data-reveal-stagger>
          {TERMINADOS.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                className="obras__obra"
                onClick={(e) => abrir(o, e.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="obras__foto">
                  <Image
                    src={o.portada}
                    alt={o.portadaAlt}
                    fill
                    sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                    quality={78}
                    placeholder="blur"
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <span className="obras__pie">
                  <span className="obras__info">
                    <span className="obras__nombre">{o.nombre}</span>
                    <span className="obras__barrio">
                      {o.barrio} · {o.fotos.length} fotos
                    </span>
                  </span>
                  <span className="obras__flecha" aria-hidden="true">
                    <Icon name="arrow-up-right" size={22} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        className="visor"
        ref={dialogRef}
        data-cerrando={cerrando || undefined}
        onKeyDown={onKeyDown}
        onCancel={(e) => {
          /* Esc nativo: frenamos el cierre inmediato para poder animarlo. */
          e.preventDefault();
          cerrar();
        }}
        /* Red de contención: si el diálogo se cierra por una vía que no pasó
           por cerrar() (el cierre nativo del navegador), desarmamos igual. */
        onClose={finalizar}
        aria-label={obra ? `Fotos del ${obra.nombre}` : "Fotos de la obra"}
      >
        {obra && foto && (
          <div className="visor__caja">
            <div className="visor__barra">
              <div className="visor__rotulo">
                <p className="visor__obra">{obra.nombre}</p>
                <p className="visor__barrio">{obra.barrio}</p>
              </div>
              <span className="visor__cuenta" ref={cuentaRef} aria-hidden="true">
                {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <IconButton icon="x" label="Cerrar las fotos" onClick={cerrar} />
            </div>

            {/* Los slides se renderizan siempre para que el cruce tenga las dos
                cajas; lo que entra y sale del DOM es la imagen de adentro. */}
            <div
              className="visor__escena"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (gestoRef.current = null)}
            >
              {obra.fotos.map((f, i) => (
                <div
                  className="visor__slide"
                  key={i}
                  data-activa={i === indice || undefined}
                  ref={(el) => {
                    slidesRef.current[i] = el;
                  }}
                >
                  {montadas.has(i) && (
                    <Image
                      src={f.src}
                      alt={i === indice ? f.alt : ""}
                      fill
                      sizes="(min-width: 64rem) 64rem, 100vw"
                      quality={82}
                      placeholder="blur"
                      priority={i === 0}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="visor__pie">
              <p className="visor__epigrafe" ref={epigrafeRef} aria-live="polite">
                {foto.alt}
              </p>
              <div className="visor__nav">
                <IconButton
                  icon="chevron-left"
                  label="Foto anterior"
                  bordered
                  onClick={() => ir(indice - 1, -1)}
                />
                <IconButton
                  icon="chevron-right"
                  label="Foto siguiente"
                  bordered
                  onClick={() => ir(indice + 1, 1)}
                />
              </div>
            </div>

            <div className="visor__rail" ref={railRef}>
              {obra.fotos.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className="visor__thumb"
                  aria-current={i === indice || undefined}
                  aria-label={`Ir a la foto ${i + 1} de ${total}`}
                  onClick={() => ir(i)}
                >
                  <Image src={f.src} alt="" fill sizes="7rem" quality={50} style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
