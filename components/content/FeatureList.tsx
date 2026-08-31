import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../core/Icon";

export interface FeatureProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: IconName;
  children?: ReactNode;
}

/** Ítem de lista con ícono de línea al inicio. */
export function Feature({ icon = "check", children, className = "", ...rest }: FeatureProps) {
  return (
    <li className={["ac-feature", className].filter(Boolean).join(" ")} {...rest}>
      <span className="ac-feature__icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="ac-feature__text">{children}</span>
    </li>
  );
}

export interface FeatureListProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

/** Lista de características. Envuelve varios <Feature>. */
export function FeatureList({ className = "", children, ...rest }: FeatureListProps) {
  return (
    <ul className={["ac-feature-list", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </ul>
  );
}
