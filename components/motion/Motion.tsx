"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Capa de movimiento de la landing. Una sola isla cliente: las secciones
 * siguen siendo componentes de servidor y esto las anima leyendo el DOM.
 * (Las secciones interactivas —galería, tipologías— animan su PROPIO cambio
 * de estado adentro; acá vive todo lo que dispara el scroll.)
 *
 * REGLA: el estado por defecto del marcado es VISIBLE. Este script primero
 * esconde y después revela. Si el JS no corre o falla, la página se lee entera.
 *
 * Hay un solo momento con autoría — la entrada del hero. Todo lo demás
 * (revelados, filete de obra, pliego, mapa) es refuerzo silencioso, y cada
 * tipo de contenido tiene su gesto: el texto sube, la fotografía se descubre,
 * las cifras asoman desde su renglón, los trazos del mapa se dibujan.
 *
 * OJO con `once: true`: mata el trigger DENTRO del ciclo de refresh de
 * ScrollTrigger, y si el navegador restauró el scroll a mitad de página el
 * array global se muta mientras otro trigger recién creado lo recorre
 * (TypeError "reading 'end'", GSAP 3.15). Por eso el patrón de acá es
 * `armarUnaVez`: el trigger muere recién al COMPLETAR su animación, en el
 * tick normal del ticker, nunca en medio de un refresh.
 *
 * La cabecera transparente sobre la foto NO se maneja acá: vive como estado de
 * React dentro de Header, porque la hidratación reescribe su className.
 */

const HERO_EASE = "expo.out";

/* El equivalente seguro de `once: true` (ver nota de arriba). */
function armarUnaVez<T extends gsap.core.Animation>(anim: T): T {
  anim.eventCallback("onComplete", () => {
    (anim as { scrollTrigger?: ScrollTrigger }).scrollTrigger?.kill(false);
  });
  return anim;
}

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector<HTMLElement>(".hero");

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Sin movimiento: todo queda quieto y completo ───────────── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".obra__rail-fill", { scaleX: 1, scaleY: 1 });
        document
          .querySelectorAll<HTMLElement>(".obra__step")
          .forEach((s) => s.setAttribute("data-reached", "true"));
      });

      /* ── Con movimiento ─────────────────────────────────────────── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Momento con autoría: la entrada del hero.
           La foto se asienta desde un 6% de más, y el titular sube línea
           por línea desde su propio renglón recortado. */
        const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line] > span");
        const heroTail = gsap.utils.toArray<HTMLElement>("[data-hero-tail]");

        gsap.set(heroLines, { yPercent: 108 });
        gsap.set(heroTail, { opacity: 0, y: 16 });
        gsap.set(".hero-photo img", { scale: 1.06, transformOrigin: "50% 55%" });

        const entrada = gsap.timeline({ defaults: { ease: HERO_EASE } });
        entrada
          .to(".hero-photo img", { scale: 1, duration: 1.8 }, 0)
          .to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.085 }, 0.15)
          .to(heroTail, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.5);

        /* La foto se corre despacio mientras el hero sale de cuadro.
           Es continuidad, no parallax decorativo: refuerza que el texto
           está anclado a la ventana y la imagen al documento. */
        if (hero) {
          gsap.to(".hero-photo img", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
          gsap.to(".hero-inner", {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "60% top", end: "bottom top", scrub: true },
          });
        }

        /* Revelados de apoyo: 14px y opacidad, una sola vez. */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const hijos = el.hasAttribute("data-reveal-stagger")
            ? gsap.utils.toArray<HTMLElement>(":scope > *", el)
            : [el];
          gsap.set(hijos, { opacity: 0, y: 14 });
          armarUnaVez(
            gsap.to(hijos, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: HERO_EASE,
              stagger: hijos.length > 1 ? Math.min(0.07, 0.35 / hijos.length) : 0,
              scrollTrigger: { trigger: el, start: "top 88%" },
            }),
          );
        });

        /* La fotografía no se desvanece: se descubre. El marco se abre desde
           abajo mientras la imagen se asienta desde un 6% de más. */
        gsap.utils.toArray<HTMLElement>("[data-reveal-media]").forEach((el) => {
          const img = el.querySelector("img");
          gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
          if (img) gsap.set(img, { scale: 1.06 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 85%" },
            defaults: { ease: HERO_EASE, duration: 1 },
          });
          tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", clearProps: "clipPath" }, 0);
          if (img) tl.to(img, { scale: 1, clearProps: "scale" }, 0);
          armarUnaVez(tl);
        });

        /* El pliego: cada cifra asoma desde su renglón recortado, en escalera.
           Es el mismo gesto del titular del hero — los datos son los titulares
           de esta sección. */
        gsap.utils.toArray<HTMLElement>("[data-pliego]").forEach((pliego) => {
          const filas = gsap.utils.toArray<HTMLElement>(".pliego__row", pliego);
          const cifras = gsap.utils.toArray<HTMLElement>("[data-mask-rise]", pliego);
          gsap.set(filas, { opacity: 0 });
          gsap.set(cifras, { yPercent: 110 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: pliego, start: "top 82%" },
            defaults: { ease: HERO_EASE },
          });
          tl.to(filas, { opacity: 1, duration: 0.5, stagger: 0.09 }, 0).to(
            cifras,
            { yPercent: 0, duration: 0.9, stagger: 0.09 },
            0.08,
          );
          armarUnaVez(tl);
        });

        /* Obra: el filete se dibuja con el scroll y cada etapa marca su punto
           al llegar. El recorrido del filete ES el paso del tiempo de la obra. */
        const pasos = gsap.utils.toArray<HTMLElement>(".obra__step");
        const relleno = document.querySelector<HTMLElement>(".obra__rail-fill");
        const listaObra = document.querySelector<HTMLElement>(".obra__steps");

        if (relleno && listaObra) {
          const horizontal = window.matchMedia("(min-width: 62rem)").matches;
          gsap.fromTo(
            relleno,
            horizontal ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
              ease: "none",
              scrollTrigger: {
                trigger: listaObra,
                start: horizontal ? "top 78%" : "top 80%",
                end: horizontal ? "bottom 70%" : "bottom 75%",
                scrub: 0.4,
              },
            },
          );
        }

        pasos.forEach((paso) => {
          ScrollTrigger.create({
            trigger: paso,
            start: "top 78%",
            onEnter: () => paso.setAttribute("data-reached", "true"),
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
