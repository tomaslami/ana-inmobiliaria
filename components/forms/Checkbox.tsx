import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "../core/Icon";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
}

/** Casilla de verificación. El label completo es área de toque (mínimo 48px de alto). */
export function Checkbox({ id, label, className = "", ...rest }: CheckboxProps) {
  return (
    <label className={["ac-choice", className].filter(Boolean).join(" ")} htmlFor={id}>
      <input type="checkbox" id={id} {...rest} />
      <span className="ac-choice__control ac-choice__control--box" aria-hidden="true">
        <Icon name="check" size={16} strokeWidth={2} />
      </span>
      <span className="ac-choice__label">{label}</span>
    </label>
  );
}
