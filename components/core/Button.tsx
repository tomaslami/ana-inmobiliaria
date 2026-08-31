import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  variant?: "solid" | "outline" | "quiet";
  size?: "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export type ButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

/**
 * Botón / enlace de acción. Si recibe `href` se renderiza como <a>.
 * Nunca usa salvia #79877D como fondo con texto encima.
 */
export function Button({
  variant = "solid",
  size = "md",
  href,
  type = "button",
  disabled = false,
  fullWidth = false,
  iconStart,
  iconEnd,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "ac-btn",
    `ac-btn--${variant}`,
    size === "lg" ? "ac-btn--lg" : "",
    fullWidth ? "ac-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </>
  );

  if (href && !disabled) {
    return (
      <a className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
