import type { HTMLAttributes, ReactNode } from "react";

export interface MediaFrameProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  sharp?: boolean;
  caption?: ReactNode;
  placeholder?: string;
  /** Imagen ya armada (p. ej. next/image con `fill`). Tiene prioridad sobre `src`. */
  children?: ReactNode;
}

/**
 * Marco de fotografía. Sin imagen real muestra un marcador con el encuadre
 * pedido — así el hueco de foto queda documentado en vez de improvisado.
 * Con `children` el marco no pone la imagen: la recibe armada (next/image
 * con `fill`, blur y `sizes` correctos) y sólo aporta encuadre y epígrafe.
 */
export function MediaFrame({
  src,
  alt = "",
  ratio = "landscape",
  sharp = false,
  caption,
  placeholder = "Fotografía",
  className = "",
  children,
  ...rest
}: MediaFrameProps) {
  const cls = ["ac-media", `ac-media--${ratio}`, sharp ? "ac-media--sharp" : "", className].filter(Boolean).join(" ");
  return (
    <figure style={{ margin: 0 }}>
      <div className={cls} {...rest}>
        {children ??
          (src ? (
            // eslint-disable-next-line @next/next/no-img-element -- frame size is content-driven via CSS aspect-ratio
            <img src={src} alt={alt} loading="lazy" />
          ) : (
            <div className="ac-media__placeholder">
              <span>{placeholder}</span>
            </div>
          ))}
      </div>
      {caption && <figcaption className="ac-media__caption">{caption}</figcaption>}
    </figure>
  );
}
