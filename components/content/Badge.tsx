import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "filled" | "inverse";
}

/** Etiqueta corta de estado o categoría. Nunca "OFERTA" ni precios: no es un portal inmobiliario. */
export function Badge({ variant = "outline", className = "", children, ...rest }: BadgeProps) {
  const cls = [
    "ac-badge",
    variant === "filled" ? "ac-badge--filled" : "",
    variant === "inverse" ? "ac-badge--inverse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
