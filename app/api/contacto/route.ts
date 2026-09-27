/* ENVÍO DEL FORMULARIO DE CONTACTO — Resend.
 *
 * Recibe la consulta en JSON, la valida de nuevo del lado del servidor (la
 * validación del navegador se puede saltear) y se la manda por mail a Ana.
 * Si el contacto que dejó la persona es un mail, va como reply-to: Ana
 * responde directo desde su casilla.
 *
 * ▸ Variable de entorno: RESEND_API_KEY (se carga en Vercel).
 * ▸ REMITENTE: sale del dominio anachaher.com, verificado en Resend. Si se
 *   cambia, tiene que ser una dirección de un dominio verificado en la cuenta:
 *   con cualquier otro, Resend rechaza el envío (403 validation_error).
 */

import { Resend } from "resend";
import { MAIL } from "../../../lib/contacto";

const REMITENTE = "Sitio de Ana Chaher <consultas@anachaher.com>";
/** Las consultas llegan al mail de Ana en Century 21: ana.chaher@c21premier.com.ar */
const DESTINO = MAIL.display;

const CANALES = ["WhatsApp", "Llamado", "Mail"];
const MAX = { nombre: 120, telefono: 160, tipologia: 120, mensaje: 4000 };

type Consulta = {
  nombre: string;
  telefono: string;
  tipologia: string;
  mensaje: string;
  canal: string;
  consentimiento: boolean;
};

function texto(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ES_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contacto] Falta RESEND_API_KEY");
    return Response.json({ ok: false, error: "config" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalido" }, { status: 400 });
  }

  /* Trampa para bots: campo invisible que una persona nunca completa. Se
     responde "ok" para no darle pistas al bot, pero no se envía nada. */
  if (texto(body.empresa, 200)) {
    return Response.json({ ok: true });
  }

  const c: Consulta = {
    nombre: texto(body.nombre, MAX.nombre),
    telefono: texto(body.telefono, MAX.telefono),
    tipologia: texto(body.tipologia, MAX.tipologia),
    mensaje: texto(body.mensaje, MAX.mensaje),
    canal: CANALES.includes(String(body.canal)) ? String(body.canal) : "WhatsApp",
    consentimiento: body.consentimiento === true,
  };

  const errores: Record<string, string> = {};
  if (!c.nombre) errores.nombre = "Necesito tu nombre para responderte.";
  if (!c.telefono) errores.telefono = "Dejame un teléfono o un mail para poder escribirte.";
  if (Object.keys(errores).length) {
    return Response.json({ ok: false, error: "validacion", errores }, { status: 422 });
  }

  const filas: [string, string][] = [
    ["Nombre", c.nombre],
    ["Teléfono o mail", c.telefono],
    ["Qué busca", c.tipologia || "—"],
    ["Prefiere que le escriban por", c.canal],
    ["Autoriza el contacto", c.consentimiento ? "Sí" : "No"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2a24;max-width:560px">
      <h2 style="font-weight:600;margin:0 0 16px">Nueva consulta desde el sitio</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%">
        ${filas
          .map(
            ([k, v]) =>
              `<tr><td style="color:#5b6b61;white-space:nowrap;vertical-align:top">${k}</td><td><b>${escapar(v)}</b></td></tr>`,
          )
          .join("")}
      </table>
      ${
        c.mensaje
          ? `<p style="color:#5b6b61;margin:20px 0 6px">Mensaje</p><p style="white-space:pre-wrap;margin:0">${escapar(c.mensaje)}</p>`
          : ""
      }
    </div>`;

  const text = [
    "Nueva consulta desde el sitio",
    "",
    ...filas.map(([k, v]) => `${k}: ${v}`),
    ...(c.mensaje ? ["", "Mensaje:", c.mensaje] : []),
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: REMITENTE,
    to: [DESTINO],
    replyTo: ES_MAIL.test(c.telefono) ? c.telefono : undefined,
    subject: `Consulta de ${c.nombre}${c.tipologia ? ` — ${c.tipologia}` : ""}`,
    html,
    text,
    tags: [{ name: "origen", value: "formulario-contacto" }],
  });

  if (error) {
    console.error("[contacto] Resend:", error);
    return Response.json({ ok: false, error: "envio" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
