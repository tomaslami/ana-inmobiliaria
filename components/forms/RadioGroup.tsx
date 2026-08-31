import type { HTMLAttributes, ReactNode } from "react";

export type RadioOption = string | { value: string; label: ReactNode };

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  name: string;
  legend?: ReactNode;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

/** Grupo de opciones excluyentes dentro de un <fieldset> con leyenda visible. */
export function RadioGroup({ name, legend, options = [], value, onChange, className = "", ...rest }: RadioGroupProps) {
  return (
    <fieldset className={["ac-choice-group", className].filter(Boolean).join(" ")} {...rest}>
      {legend && <legend className="ac-choice-group__legend">{legend}</legend>}
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const id = `${name}-${String(val).replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <label className="ac-choice" htmlFor={id} key={val}>
            <input
              type="radio"
              id={id}
              name={name}
              value={val}
              checked={value !== undefined ? value === val : undefined}
              onChange={onChange ? () => onChange(val) : undefined}
            />
            <span className="ac-choice__control ac-choice__control--dot" aria-hidden="true">
              <span className="ac-choice__dot" />
            </span>
            <span className="ac-choice__label">{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
