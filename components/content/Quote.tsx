import type { HTMLAttributes, ReactNode } from "react";

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  name?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}

/** Testimonio. La cita va en serif; el atribuido en sans. */
export function Quote({ name, meta, className = "", children, ...rest }: QuoteProps) {
  return (
    <figure className={["ac-quote", className].filter(Boolean).join(" ")} {...rest}>
      <blockquote className="ac-quote__text">{children}</blockquote>
      {(name || meta) && (
        <figcaption className="ac-quote__attribution">
          {name && <span className="ac-quote__name">{name}</span>}
          {meta && <span className="ac-quote__meta">{meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
