import type { AnchorHTMLAttributes, ElementType, HTMLAttributes } from "react";
import { Icon, type IconName } from "../core/Icon";

type CommonProps = {
  icon?: IconName;
  label?: string;
  value: string;
  href?: string;
  className?: string;
};

export type ContactRowProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLDivElement>, keyof CommonProps>;

/** Fila de contacto clickeable: teléfono, mail, dirección. El valor va en color ancla. */
export function ContactRow({ icon = "phone", label, value, href, className = "", ...rest }: ContactRowProps) {
  const Tag: ElementType = href ? "a" : "div";
  return (
    <Tag className={["ac-contact-row", className].filter(Boolean).join(" ")} href={href} {...rest}>
      <span className="ac-contact-row__icon">
        <Icon name={icon} size={20} />
      </span>
      <span>
        {label && (
          <span className="ac-caption" style={{ display: "block" }}>
            {label}
          </span>
        )}
        <span className="ac-contact-row__value">{value}</span>
      </span>
    </Tag>
  );
}
