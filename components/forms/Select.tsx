import type { ReactNode, SelectHTMLAttributes } from "react";
import { Icon } from "../core/Icon";

export type SelectOption = string | { value: string; label: ReactNode };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
}

/** Desplegable nativo con chevron del set. */
export function Select({ id, options = [], placeholder, invalid = false, className = "", children, ...rest }: SelectProps) {
  return (
    <span className="ac-select-wrap">
      <select
        id={id}
        className={["ac-select", className].filter(Boolean).join(" ")}
        aria-invalid={invalid || undefined}
        defaultValue={placeholder ? "" : undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const label = typeof o === "string" ? o : o.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
        {children}
      </select>
      <Icon name="chevron-down" size={20} className="ac-select-wrap__chevron" />
    </span>
  );
}
