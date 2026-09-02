import Image from "next/image";
import { Button } from "../core/Button";
import { Icon } from "../core/Icon";
import { MediaFrame } from "../content/MediaFrame";
import heroFoto from "@/images/emprendimiento/hero-esquina-amanecer.jpg";
import anaRetrato from "@/images/ana-sobremi.png";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-photo">
        <Image
          src={heroFoto}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          style={{ objectFit: "cover", objectPosition: "62% 42%" }}
        />
      </div>

      <div className="ac-container hero-inner">
        <div className="hero-copy">
          <h1 className="ac-display">
            <span className="hero-line" data-hero-line>
              <span>Comprar bien</span>
            </span>
            <span className="hero-line" data-hero-line>
              <span>no es cuestión</span>
            </span>
            <span className="hero-line" data-hero-line>
              <span>de suerte.</span>
            </span>
          </h1>
        </div>

        <div className="stack-lg">
          <p className="hero-lead" data-hero-tail>
            Hace catorce años acompaño a inversores y compradores en Buenos Aires, especializada
            en la compra en pozo. Trabajo una operación a la vez para poder atenderte cuando
            aparece la pregunta difícil.
          </p>
          <div className="ac-actions" data-hero-tail>
            <Button variant="solid" size="lg" href="#contacto" iconEnd={<Icon name="arrow-right" />}>
              Quiero que me contactes
            </Button>
            <Button variant="outline" size="lg" href="#emprendimiento">
              Conocé la inversión
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

const PRINCIPIOS = [
  {
    icon: "file-text" as const,
    text: (
      <>
        Reviso el boleto y el fideicomiso <b>antes</b> de que firmes.
      </>
    ),
  },
  {
    icon: "handshake" as const,
    text: <>Negocio la forma de pago con la desarrolladora, no sólo el precio.</>,
  },
  {
    icon: "calendar-days" as const,
    text: <>Te informo el avance de obra todos los meses, sin que lo pidas.</>,
  },
];

export function Sobre() {
  return (
    <section className="ac-section" id="sobre">
      <div className="ac-container">
        <h2 className="ac-h1 sobre-head" data-reveal>
          Te acompaño en la parte que no aparece en el aviso.
        </h2>

        <div className="sobre-grid">
          <div className="sobre-portrait" data-reveal-media>
            <MediaFrame ratio="portrait" sharp caption="Ana Chaher · Matrícula CUCICBA 6.482">
              <Image
                src={anaRetrato}
                alt="Retrato de Ana Chaher"
                fill
                sizes="(min-width: 48rem) 40vw, 88vw"
                quality={85}
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
              />
            </MediaFrame>
          </div>

          <div className="stack-xl">
            <div className="stack-lg" data-reveal data-reveal-stagger>
              <p className="ac-body">
                Empecé en 2012 vendiendo usados en Villa Urquiza y terminé especializándome en
                emprendimientos desde el pozo, que es donde más preguntas aparecen y menos
                respuestas hay.
              </p>
              <p className="ac-body">
                No trabajo con volumen. Tomo una comercialización por vez y me involucro en todo:
                la elección de la unidad, el análisis del fideicomiso, la negociación de la forma de
                pago y el acompañamiento hasta la escritura.
              </p>
            </div>

            <ul className="ac-ruled-list" data-reveal data-reveal-stagger>
              {PRINCIPIOS.map((p, i) => (
                <li key={i}>
                  <span className="ac-ruled-list__icon">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span className="ac-ruled-list__text">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
