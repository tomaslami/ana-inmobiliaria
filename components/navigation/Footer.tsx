import type { HTMLAttributes, ReactNode } from "react";
import { Logo } from "../core/Logo";

export interface FooterColumn {
  heading: string;
  links?: { label: string; href?: string }[];
  content?: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  legal?: ReactNode;
  matricula?: ReactNode;
  children?: ReactNode;
}

/** Pie sobre ancla salvia profunda. El descriptor REAL ESTATE no aparece acá. */
export function Footer({ columns = [], legal, matricula, className = "", children, ...rest }: FooterProps) {
  return (
    <footer className={["ac-footer", "ac-on-inverse", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ac-container">
        <div className="ac-footer__grid">
          <div className="ac-footer__col">
            <Logo variant="light" size={34} showDescriptor={false} />
            {children}
          </div>
          {columns.map((col) => (
            <div className="ac-footer__col" key={col.heading}>
              <p className="ac-footer__heading">{col.heading}</p>
              {col.links && (
                <ul className="ac-footer__list">
                  {col.links.map((l) => (
                    <li key={l.href || l.label}>{l.href ? <a href={l.href}>{l.label}</a> : <span>{l.label}</span>}</li>
                  ))}
                </ul>
              )}
              {col.content}
            </div>
          ))}
        </div>
        <div className="ac-footer__legal">
          <p>{legal}</p>
          {matricula && <p>{matricula}</p>}
        </div>
      </div>
    </footer>
  );
}
