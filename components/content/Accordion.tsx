"use client";

import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "../core/Icon";

export interface AccordionItem {
  question: ReactNode;
  answer: ReactNode;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items?: AccordionItem[];
  defaultOpen?: number | null;
  allowMultiple?: boolean;
  idPrefix?: string;
}

/**
 * Acordeón de preguntas frecuentes. Un panel abierto por vez por defecto;
 * con `allowMultiple` se pueden abrir varios.
 *
 * El panel queda siempre en el DOM y la apertura anima grid-template-rows
 * (0fr → 1fr): altura real animada sin medir nada. `visibility` espera al
 * final del cierre para sacar el contenido del árbol de accesibilidad.
 */
export function Accordion({
  items = [],
  defaultOpen = 0,
  allowMultiple = false,
  idPrefix = "faq",
  className = "",
  ...rest
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen]);

  const toggle = (i: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple) return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
      return isOpen ? [] : [i];
    });
  };

  return (
    <div className={["ac-accordion", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div className="ac-accordion__item" key={i}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="ac-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-trigger-${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.question}</span>
                <Icon name="chevron-down" size={22} className="ac-accordion__chevron" />
              </button>
            </h3>
            <div className="ac-accordion__panelbox" data-open={isOpen || undefined}>
              <div
                className="ac-accordion__panel"
                id={`${idPrefix}-panel-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-trigger-${i}`}
              >
                <div className="ac-accordion__panelinner">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
