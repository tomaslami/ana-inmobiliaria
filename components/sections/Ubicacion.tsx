import { Button } from "../core/Button";
import { Icon } from "../core/Icon";
import { MapaActivable } from "../content/MapaActivable";
import { DIRECCION, ENTORNO } from "../../lib/heredia";

/**
 * Ubicación — el mapa interactivo de Google, enmarcado por el sistema.
 *
 * El iframe carga perezoso y en reposo lleva un tratamiento tonal suave que
 * lo acerca a la paleta; al pasar el cursor o enfocarlo recupera el color
 * pleno: el mapa "despierta" cuando lo vas a usar.
 *
 * La lista de al lado no repite el mapa: cuenta lo que el mapa no dice
 * (qué significa cada punto del entorno, sacado del brochure).
 */
export function Ubicacion() {
  return (
    <section className="ac-section zona-terra" id="ubicacion">
      <div className="ac-container">
        <div className="mapa__head" data-reveal>
          <h2 className="ac-h1" style={{ maxWidth: "16ch" }}>
            Dónde está.
          </h2>
          <p className="ac-lead">
            {DIRECCION.esquina}, {DIRECCION.barrio}. El límite exacto donde Villa Ortúzar se
            encuentra con Colegiales y Belgrano R.
          </p>
        </div>

        <div className="mapa">
          <div className="mapa__embed" data-reveal>
            <MapaActivable
              src={DIRECCION.embedUrl}
              title="Mapa de Google con la ubicación de Heredia 1320, Villa Ortúzar"
            />
          </div>

          <div className="mapa__datos">
            <div className="stack-sm" data-reveal>
              <p className="ac-eyebrow">Dirección</p>
              <p className="mapa__direccion">{DIRECCION.calle}</p>
              <p className="ac-body-sm">
                {DIRECCION.esquina} · {DIRECCION.barrio}
              </p>
            </div>

            <ul className="ac-ruled-list mapa__entorno" data-reveal data-reveal-stagger>
              {ENTORNO.map((p) => (
                <li key={p.nombre}>
                  <span className="contacto-canal">
                    <span className="contacto-canal__label">{p.nombre}</span>
                    <span className="mapa__entorno-detalle">{p.detalle}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="ac-actions" data-reveal>
              <Button
                variant="outline"
                href={DIRECCION.comoLlegarUrl}
                target="_blank"
                rel="noopener"
                iconStart={<Icon name="map-pin" />}
              >
                Cómo llegar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
