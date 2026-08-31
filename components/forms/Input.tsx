import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/** Campo de texto de una línea. Altura mínima 48px, tipo 18px. */
export function Input({ id, type = "text", invalid = false, className = "", ...rest }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      className={["ac-input", className].filter(Boolean).join(" ")}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? (invalid ? `${id}-error` : undefined) : undefined}
      {...rest}
    />
  );
}
