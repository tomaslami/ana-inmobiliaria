import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "../core/Icon";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  children?: ReactNode;
}

/** Envoltura de campo: label persistente arriba, ayuda y error debajo. */
export function Field({ label, htmlFor, hint, error, optional = false, className = "", children, ...rest }: FieldProps) {
  const cls = ["ac-field", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <label className="ac-field__label" htmlFor={htmlFor}>
        {label}
        {optional && <span className="ac-field__optional"> (opcional)</span>}
      </label>
      {hint && (
        <p className="ac-field__hint" id={htmlFor ? `${htmlFor}-hint` : undefined}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="ac-field__error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">
          <Icon name="x" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
