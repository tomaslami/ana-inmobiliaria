import type { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: "hairline" | "brand" | "inverse";
}

/** Filete divisor. `brand` es el filete corto de 3rem en salvia. */
export function Divider({ variant = "hairline", className = "", ...rest }: DividerProps) {
  const cls = [
    "ac-divider",
    variant === "brand" ? "ac-divider--brand" : "",
    variant === "inverse" ? "ac-divider--inverse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <hr className={cls} {...rest} />;
}
