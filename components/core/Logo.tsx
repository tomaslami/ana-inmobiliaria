import type { HTMLAttributes } from "react";

export type LogoVariant = "block" | "dark" | "light";

export interface LogoProps extends HTMLAttributes<HTMLElement> {
  variant?: LogoVariant;
  size?: number;
  showDescriptor?: boolean;
  /** Override the default artwork for this variant. Pass `null` to force the typographic fallback. */
  src?: string | null;
  href?: string;
}

/**
 * Monograma de marca — logo real (`public/logo.jpg`), recortado y recoloreado en
 * `scripts-tmp/generate-brand-assets.mjs` en tres variantes: `block` (lockup
 * completo con "REAL ESTATE", fondo salvia — hero), `dark` (trazo ancla,
 * transparente — cabecera sobre fondo crema) y `light` (trazo crema,
 * transparente — pie sobre el ancla). Si no hay artwork para una variante,
 * cae al monograma tipográfico compuesto con la serif del sistema.
 */
const DEFAULT_SRC: Record<LogoVariant, string> = {
  block: "/brand/logo-block.png",
  dark: "/brand/mark-dark.png",
  light: "/brand/mark-light.png",
};

export function Logo({
  variant = "block",
  size = 44,
  showDescriptor = true,
  src,
  href,
  className = "",
  ...rest
}: LogoProps) {
  const resolvedSrc = src === null ? undefined : (src ?? DEFAULT_SRC[variant]);
  const cls = ["ac-logo", !resolvedSrc ? `ac-logo--${variant}` : "", className].filter(Boolean).join(" ");
  const style = resolvedSrc ? undefined : { fontSize: `${size}px` };

  const inner = resolvedSrc ? (
    // eslint-disable-next-line @next/next/no-img-element -- fixed brand artwork, not a content image
    <img src={resolvedSrc} alt="Ana Chaher — Real Estate" style={{ height: `${size}px`, width: "auto" }} />
  ) : (
    <>
      <span className="ac-logo__mark">CAH</span>
      {showDescriptor && <span className="ac-logo__descriptor">Real Estate</span>}
    </>
  );

  if (href) {
    return (
      <a className={cls} style={style} href={href} aria-label="Ana Chaher — Real Estate" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <span className={cls} style={style} role="img" aria-label="Ana Chaher — Real Estate" {...rest}>
      {inner}
    </span>
  );
}
