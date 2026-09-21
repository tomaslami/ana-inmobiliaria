/* CONTACTO E IDENTIFICACIÓN PROFESIONAL — fuente única.
 *
 * Todo lo que identifica a Ana y sirve para escribirle vive acá: teléfono,
 * mail y el bloque legal de la agencia. Si cambia un dato se edita este
 * archivo y cambia en los cuatro lugares donde aparece (retrato, sección de
 * contacto, pie y metadatos), sin salir a buscarlo por el código.
 *
 * ▸ PENDIENTE DE CONFIRMAR: TELEFONO y MAIL vienen del armado original y
 *   nunca se verificaron con Ana. Revisarlos antes de publicar.
 */

const WHATSAPP_NUMERO = "5491140237788";

/** Link de WhatsApp con el mensaje ya escrito. */
export function whatsapp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

/** Mensaje del botón flotante: general, no habla de ningún emprendimiento. */
export const WA_CONSULTA = whatsapp("Hola Ana, estoy en tu sitio y quiero hacerte una consulta.");

export const TELEFONO = {
  /** Como se lee en pantalla. */
  display: "+54 9 11 4023 7788",
  href: "tel:+5491140237788",
};

export const MAIL = {
  display: "hola@anachaher.com.ar",
  href: "mailto:hola@anachaher.com.ar",
};

/* ── Identificación profesional ────────────────────────────────────── */

/** Cómo se presenta Ana. Reemplazó a la matrícula propia. */
export const ANA = {
  nombre: "Ana Chaher",
  rol: "Asesora inmobiliaria",
  /** Nombre y rol en una línea, para epígrafes. */
  firma: "Ana Chaher — Asesora inmobiliaria",
};

/**
 * Leyenda obligatoria de la agencia. La intermediación la realiza Premier
 * Real Estate S.A. y los matriculados son los suyos: Ana no publica
 * matrícula propia mientras trabaje bajo esta estructura.
 */
export const AGENCIA = {
  razonSocial: "Premier Real Estate S.A.",
  url: "https://www.c21premier.com.ar/",
  matriculados: "Corredores matriculados M. Annoni CPI 6771 · P. Kaminsky CPI 7753 / CMCPSI 6665",
  domicilio: "Franklin D. Roosevelt 3160, CABA",
};

/** La leyenda entera en texto plano — para metadatos y atributos. */
export const LEGAL_TEXTO = `Intermediación Inmobiliaria realizada por ${AGENCIA.razonSocial} ${AGENCIA.matriculados}`;
