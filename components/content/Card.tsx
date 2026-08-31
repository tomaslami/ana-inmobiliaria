import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  as?: ElementType;
  variant?: "outline" | "raised" | "plain" | "ruled";
  title?: ReactNode;
  eyebrow?: ReactNode;
  href?: string;
}

/** Tarjeta de contenido. Sin sombra: se define por filete o por superficie crema. */
export function Card({ as, variant = "outline", title, eyebrow, href, className = "", children, ...rest }: CardProps) {
  const Tag = as || (href ? "a" : "div");
  const cls = [
    "ac-card",
    variant === "raised" ? "ac-card--raised" : "",
    variant === "plain" ? "ac-card--plain" : "",
    variant === "ruled" ? "ac-card--ruled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} href={href} {...rest}>
      {eyebrow && <p className="ac-eyebrow">{eyebrow}</p>}
      {title && <h3 className="ac-card__title">{title}</h3>}
      {children}
    </Tag>
  );
}
