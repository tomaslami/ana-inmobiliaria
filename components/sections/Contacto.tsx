"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../core/Button";
import { Icon, type IconName } from "../core/Icon";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Textarea } from "../forms/Textarea";
import { Select } from "../forms/Select";
import { Checkbox } from "../forms/Checkbox";
import { RadioGroup } from "../forms/RadioGroup";
import { WA, DIRECCION } from "../../lib/heredia";

type Errores = {
  nombre?: string;
  telefono?: string;
};

/* Los canales son filas de pliego: rótulo arriba, dato grande abajo.
   Son datos críticos —teléfono, mail, la obra— así que van en color ancla,
   con cifra tabular y cuerpo generoso: son los titulares de esta sección. */
const CANALES: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: "phone", label: "Teléfono y WhatsApp", value: "+54 9 11 4023 7788", href: "tel:+5491140237788" },
  { icon: "mail", label: "Mail", value: "hola@anachaher.com.ar", href: "mailto:hola@anachaher.com.ar" },
  { icon: "map-pin", label: "La obra", value: "Heredia 1320, Villa Ortúzar", href: DIRECCION.mapsUrl },
];

export function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [canal, setCanal] = useState("WhatsApp");
  const [errores, setErrores] = useState<Errores>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errores = {};
    if (!String(data.get("nombre") || "").trim()) next.nombre = "Necesito tu nombre para responderte.";
    if (!String(data.get("telefono") || "").trim()) next.telefono = "Dejame un teléfono o un mail para poder escribirte.";
    setErrores(next);
    if (Object.keys(next).length === 0) setEnviado(true);
  }

  return (
    <section className="ac-section surface-raised" id="contacto">
      <div className="ac-container">
        <div className="contacto-head" data-reveal>
          <h2 className="ac-h1" style={{ maxWidth: "14ch" }}>
            Contame qué estás buscando.
          </h2>
          <p className="ac-lead contacto-head__lead">
            Si preferís hablar antes de escribir, llamame: no hay contestador ni call center del
            otro lado. Del otro lado estoy yo.
          </p>
        </div>

        <div className="contacto-grid">
          <div className="contacto-canales" data-reveal data-reveal-stagger>
            <ul className="ac-ruled-list contacto-lista">
              {CANALES.map((c) => (
                <li key={c.label}>
                  <span className="ac-ruled-list__icon">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="contacto-canal">
                    <span className="contacto-canal__label">{c.label}</span>
                    <a className="contacto-canal__value" href={c.href}>
                      {c.value}
                    </a>
                  </span>
                </li>
              ))}
            </ul>

            <p className="contacto-promesa">
              <Icon name="message-circle" size={18} />
              <span>
                Respondo yo, dentro de las <b>24 horas hábiles</b>. Y si te queda más cómodo,{" "}
                <a href={WA.precios} target="_blank" rel="noopener">
                  escribime directo por WhatsApp
                </a>
                .
              </span>
            </p>

            <p className="ac-caption">Ana Chaher · Asesora inmobiliaria matriculada · CUCICBA 6.482</p>
          </div>

          <div className="contacto-panel" data-reveal>
            {enviado ? (
              <div className="stack-lg" role="status">
                <span style={{ color: "var(--sage-700)" }}>
                  <Icon name="circle-check-big" size={40} />
                </span>
                <h3 className="ac-h3">Listo, me llegó tu consulta.</h3>
                <p className="ac-body">
                  Te escribo por {canal.toLowerCase()} dentro de las próximas 24 horas hábiles. Si es
                  urgente, llamame al{" "}
                  <a className="ac-data" href="tel:+5491140237788">
                    +54 9 11 4023 7788
                  </a>
                  .
                </p>
                <div className="ac-actions">
                  <Button variant="outline" onClick={() => setEnviado(false)}>
                    Mandar otra consulta
                  </Button>
                </div>
              </div>
            ) : (
              <form className="ac-form-stack contacto-form" onSubmit={onSubmit} noValidate>
                <div className="contacto-panel__head">
                  <h3 className="ac-h4">Escribime</h3>
                  <p className="ac-caption">Cuatro datos y te respondo yo, no un formulario.</p>
                </div>

                <div className="ac-form-row">
                  <Field label="Tu nombre" htmlFor="nombre" error={errores.nombre}>
                    <Input id="nombre" name="nombre" autoComplete="name" invalid={!!errores.nombre} />
                  </Field>
                  <Field label="Teléfono o mail" htmlFor="telefono" error={errores.telefono}>
                    <Input id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" invalid={!!errores.telefono} />
                  </Field>
                </div>
                <Field label="¿Qué tipo de unidad te interesa?" htmlFor="tipologia">
                  <Select
                    id="tipologia"
                    name="tipologia"
                    placeholder="Elegí una opción"
                    options={["Monoambiente", "2 ambientes", "3 ambientes", "4 ambientes", "Todavía no lo tengo definido"]}
                  />
                </Field>
                <Field label="Contame un poco más" htmlFor="mensaje" optional>
                  <Textarea id="mensaje" name="mensaje" rows={3} placeholder="Un dos ambientes con balcón para mudarme, un mono para invertir…" />
                </Field>
                <RadioGroup
                  name="canal"
                  legend="¿Cómo preferís que te escriba?"
                  options={["WhatsApp", "Llamado", "Mail"]}
                  value={canal}
                  onChange={setCanal}
                />
                <Checkbox id="consentimiento" name="consentimiento" label="Autorizo que me contacten por este medio." defaultChecked />
                <div className="contacto-panel__pie">
                  <Button variant="solid" size="lg" type="submit" fullWidth iconEnd={<Icon name="arrow-right" />}>
                    Enviar la consulta
                  </Button>
                  <p className="ac-caption">Uso tus datos sólo para responderte esta consulta.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
