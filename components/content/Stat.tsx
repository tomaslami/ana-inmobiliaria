import type { HTMLAttributes, ReactNode } from "react";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: ReactNode;
  note?: ReactNode;
}

/** Dato crítico: precio, m2, matrícula, plazo. Siempre en color ancla, nunca atenuado. */
export function Stat({ value, label, note, className = "", ...rest }: StatProps) {
  return (
    <div className={["ac-stat", className].filter(Boolean).join(" ")} {...rest}>
      <p className="ac-stat__label">{label}</p>
      <p className="ac-stat__value">{value}</p>
      {note && <p className="ac-stat__note">{note}</p>}
    </div>
  );
}

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Grilla de datos: 2 columnas en mobile, auto-fit en desktop. */
export function StatGrid({ className = "", children, ...rest }: StatGridProps) {
  return (
    <div className={["ac-stat-grid", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
