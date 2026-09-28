/* ATRIBUCIÓN DE CAMPAÑAS — de qué anuncio llegó cada consulta.
 *
 * Cuando alguien entra desde un anuncio, la URL trae un identificador de
 * clic (gclid de Google Ads, fbclid de Meta) y los utm_* de la campaña. Se
 * guardan al llegar porque la persona navega el one-pager y recién después
 * completa el formulario — para entonces la URL ya puede no tenerlos.
 *
 * Se guarda en localStorage con vencimiento de 90 días (la ventana de
 * conversión máxima de Google Ads). Una visita nueva con otro anuncio pisa
 * la anterior: gana el último clic.
 */

const CLAVE = "ac-atribucion";
const VIGENCIA_MS = 90 * 24 * 60 * 60 * 1000;

const PARAMETROS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Atribucion = Partial<Record<(typeof PARAMETROS)[number], string>>;

/** Lee los parámetros de campaña de la URL actual y los guarda si hay alguno. */
export function guardarAtribucion(): void {
  try {
    const url = new URLSearchParams(window.location.search);
    const datos: Atribucion = {};
    for (const p of PARAMETROS) {
      const v = url.get(p);
      if (v) datos[p] = v.slice(0, 300);
    }
    if (Object.keys(datos).length === 0) return;
    localStorage.setItem(CLAVE, JSON.stringify({ datos, vence: Date.now() + VIGENCIA_MS }));
  } catch {
    /* Navegación privada o storage bloqueado: la consulta llega igual, sin atribución. */
  }
}

/** Devuelve la atribución guardada si sigue vigente; si no, un objeto vacío. */
export function leerAtribucion(): Atribucion {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return {};
    const { datos, vence } = JSON.parse(crudo) as { datos: Atribucion; vence: number };
    if (Date.now() > vence) {
      localStorage.removeItem(CLAVE);
      return {};
    }
    return datos;
  } catch {
    return {};
  }
}

/** Nombres legibles para el mail que recibe Ana. */
export const ROTULOS_ATRIBUCION: Record<keyof Atribucion, string> = {
  gclid: "GCLID (Google Ads)",
  gbraid: "GBRAID (Google Ads, iOS)",
  wbraid: "WBRAID (Google Ads, iOS web)",
  fbclid: "FBCLID (Meta)",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_term: "utm_term",
  utm_content: "utm_content",
};

export const PARAMETROS_ATRIBUCION = PARAMETROS;

/** Empuja un evento a la capa de datos de Google Tag Manager. */
export function eventoGTM(evento: string, datos: Record<string, unknown> = {}): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: evento, ...datos });
}
