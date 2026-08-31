import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Campo de texto multilínea. Redimensionable sólo en vertical. */
export function Textarea({ id, rows = 4, invalid = false, className = "", ...rest }: TextareaProps) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={["ac-textarea", className].filter(Boolean).join(" ")}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
