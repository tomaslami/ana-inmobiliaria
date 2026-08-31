import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  rule?: boolean;
  children?: ReactNode;
}

/** Etiqueta de sección en mayúsculas con tracking +0.18em. */
export function Eyebrow({ as: Tag = "p", rule = false, className = "", children, ...rest }: EyebrowProps) {
  const cls = ["ac-eyebrow", rule ? "ac-eyebrow--rule" : "", className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
