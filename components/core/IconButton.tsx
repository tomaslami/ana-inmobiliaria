import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type CommonProps = {
  icon: IconName | ReactNode;
  label: string;
  bordered?: boolean;
  size?: number;
  href?: string;
  className?: string;
};

export type IconButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

/** Botón de sólo ícono. Siempre 48x48 y siempre con `label` accesible. */
export function IconButton({
  icon,
  label,
  bordered = false,
  size = 20,
  href,
  disabled = false,
  className = "",
  ...rest
}: IconButtonProps) {
  const cls = ["ac-iconbtn", bordered ? "ac-iconbtn--bordered" : "", className].filter(Boolean).join(" ");
  const glyph = typeof icon === "string" ? <Icon name={icon as IconName} size={size} /> : icon;
  if (href && !disabled) {
    return (
      <a className={cls} href={href} aria-label={label} title={label} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {glyph}
      </a>
    );
  }
  return (
    <button
      className={cls}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {glyph}
    </button>
  );
}
