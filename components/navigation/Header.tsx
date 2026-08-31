"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { Button } from "../core/Button";
import { IconButton } from "../core/IconButton";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  links?: NavLink[];
  cta?: string;
  ctaHref?: string;
  current?: string;
  logoHref?: string;
  /** Selector del bloque a sangre sobre el que la cabecera va transparente. */
  overSelector?: string;
}

/** Cabecera pegajosa con filete inferior. Menú en cajón por debajo de 62rem.
 *
 *  Mientras flota sobre un bloque de fotografía a sangre se vuelve transparente
 *  con texto claro. Ese estado vive acá como estado de React y no como una clase
 *  puesta desde afuera: la hidratación reescribe `className` desde las props y
 *  se llevaba puesta cualquier clase agregada por otro script.
 *
 *  La sección visible se marca con aria-current="location" leyendo el scroll
 *  con un IntersectionObserver sobre las anclas del menú: en un one-pager,
 *  saber dónde estás parado es información, no adorno.
 *
 *  El marcado inicial es la versión sólida y el cajón existe siempre en el
 *  DOM (animado por grid-rows): sin JS la cabecera se lee igual. */
export function Header({
  links = [],
  cta,
  ctaHref = "#contacto",
  current,
  logoHref = "#",
  overSelector = ".hero",
  className = "",
  ...rest
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [sobreFoto, setSobreFoto] = useState(false);
  const [visible, setVisible] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const bloque = document.querySelector<HTMLElement>(overSelector);
    if (!bloque) return;
    const sincronizar = () => {
      const alto = ref.current?.offsetHeight ?? 0;
      setSobreFoto(window.scrollY < bloque.offsetHeight - alto);
    };
    sincronizar();
    window.addEventListener("scroll", sincronizar, { passive: true });
    window.addEventListener("resize", sincronizar);
    return () => {
      window.removeEventListener("scroll", sincronizar);
      window.removeEventListener("resize", sincronizar);
    };
  }, [overSelector]);

  /* Scrollspy: la franja central de la ventana decide qué sección está activa. */
  useEffect(() => {
    const objetivos = links
      .map((l) => (l.href.startsWith("#") ? document.getElementById(l.href.slice(1)) : null))
      .filter((el): el is HTMLElement => Boolean(el));
    if (objetivos.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setVisible(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    objetivos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  /* El cajón se cierra con Escape, devolviendo el foco al botón. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activa = current ?? visible;

  return (
    <header
      ref={ref}
      className={["ac-header", sobreFoto ? "ac-header--over-photo" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <div className="ac-container">
        <div className="ac-header__inner">
          {/* El monograma es artwork (PNG), no texto: sobre la foto no alcanza
              con cambiarle el color. Van las dos variantes apiladas y el
              estado sobre-foto cruza opacidades y agranda el conjunto. */}
          <a className="ac-header__logo" href={logoHref} aria-label="Ana Chaher — Real Estate">
            <img src="/brand/mark-dark.png" alt="" className="ac-header__logo-img ac-header__logo-img--dark" />
            <img src="/brand/mark-light.png" alt="" className="ac-header__logo-img ac-header__logo-img--light" />
          </a>
          <nav className="ac-header__nav" aria-label="Principal">
            <ul className="ac-header__links">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    className="ac-navlink"
                    href={l.href}
                    aria-current={activa === l.href ? "location" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ac-header__actions">
            {cta && (
              <Button className="ac-header__cta" variant="solid" href={ctaHref}>
                {cta}
              </Button>
            )}
            <span className="ac-header__burger">
              <IconButton
                icon={open ? "x" : "menu"}
                label={open ? "Cerrar el menú" : "Abrir el menú"}
                aria-expanded={open}
                aria-controls="ac-header-drawer"
                onClick={() => setOpen((v) => !v)}
              />
            </span>
          </div>
        </div>
        <div className="ac-header__drawerbox" data-open={open || undefined}>
          <div className="ac-header__drawerclip" id="ac-header-drawer">
            <div className="ac-header__drawer">
            {links.map((l) => (
              <a
                className="ac-navlink"
                href={l.href}
                key={l.href}
                tabIndex={open ? undefined : -1}
                aria-current={activa === l.href ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            {cta && (
              <Button
                variant="solid"
                size="lg"
                href={ctaHref}
                fullWidth
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
              >
                {cta}
              </Button>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
