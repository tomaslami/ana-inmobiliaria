import { Button } from "../core/Button";
import { Icon, type IconName } from "../core/Icon";
import { Badge } from "../content/Badge";
import { WA, SUPERCIELO_URL } from "../../lib/heredia";

/* El pliego. Los datos del emprendimiento se leen como una ficha técnica de
   arquitectura — rótulo, cifra, aclaración. Sin precios a la vista: la
   decisión fue que el número se conversa, no se publica. La fila de precios
   existe igual, porque callarla del todo parecería descuido y no decisión. */
const PLIEGO = [
  { label: "Tipologías", value: "Mono a 4 amb.", note: "Ocho plantas distintas, todas con balcón o terraza propia", lead: true },
  { label: "Superficies", value: "37 a 166 m²", note: "Totales, incluyendo superficie descubierta y común" },
  { label: "Terraza común", value: "Pileta + parrilla", note: "Con deck, solárium y área verde, en el último piso" },
  { label: "Precio y pago", value: "A consultar", note: "Esquema en pozo: te paso la lista vigente y la proyección de cuotas" },
];

/* Sólo lo que figura en brochure y planos. Nada inventado. */
const EDIFICIO: { icon: IconName; text: string }[] = [
  { icon: "waves", text: "Pileta en la terraza común, con vista abierta" },
  { icon: "flame", text: "Parrilla común — y propia en los pisos 6 y 7" },
  { icon: "trees", text: "Terraza verde con deck y solárium" },
  { icon: "sun", text: "Balcón o terraza propia en todas las unidades" },
  { icon: "car", text: "Cocheras en subsuelo con montacoche y bicicletero" },
  { icon: "store", text: "Local comercial en la esquina, a nivel de vereda" },
];

export function Emprendimiento() {
  return (
    <section className="ac-section zona-terra" id="emprendimiento">
      <div className="ac-container">
        <div className="emp-head" data-reveal>
          <h2 className="ac-h1">Heredia — Villa Ortúzar</h2>
          <div className="ac-actions">
            <Badge>Heredia y Av. Álvarez Thomas</Badge>
            <Badge variant="filled">Inversión en pozo</Badge>
          </div>
        </div>
        <p className="ac-lead" style={{ marginTop: "var(--space-lg)" }} data-reveal>
          Veintitrés unidades para entrar en pozo, en la esquina de Heredia y Av. Álvarez Thomas:
          comprás al valor de obra, pagás mientras se construye y recibís un edificio de Supercielo
          donde la evolución de Colegiales se encuentra con la tranquilidad de Villa Ortúzar.
        </p>

        <dl className="pliego" data-pliego>
          {PLIEGO.map((fila) => (
            <div className={`pliego__row${fila.lead ? " pliego__row--lead" : ""}`} key={fila.label}>
              <dt className="pliego__label">{fila.label}</dt>
              <dd className="pliego__value" style={{ margin: 0 }}>
                <span data-mask-rise>{fila.value}</span>
              </dd>
              <p className="pliego__note">{fila.note}</p>
            </div>
          ))}
        </dl>

        <p className="ac-caption" style={{ marginTop: "var(--space-lg)", maxWidth: "34rem" }}>
          Las imágenes y medidas del proyecto son ilustrativas y pueden ajustarse; las
          características definitivas surgen del boleto de compraventa. Te muestro todo antes.
        </p>

        <div className="emp-cierre">
          <div className="stack-lg" data-reveal>
            <h3 className="ac-h3">Qué tiene el edificio</h3>
            <p className="ac-body-sm" style={{ maxWidth: "30ch" }}>
              El brochure completo tiene los planos, las terminaciones y los renders en alta.
              Pedímelo y te lo mando directo.
            </p>
            <div className="ac-actions">
              <Button variant="solid" href={WA.brochure} target="_blank" rel="noopener" iconEnd={<Icon name="arrow-right" />}>
                Pedime el brochure
              </Button>
            </div>
            <p className="ac-caption">
              Desarrolla{" "}
              <a href={SUPERCIELO_URL} target="_blank" rel="noopener">
                Supercielo
              </a>
              , con diecisiete edificios en la zona.
            </p>
          </div>

          <ul className="ac-ruled-list ac-ruled-list--split" data-reveal data-reveal-stagger>
            {EDIFICIO.map((a) => (
              <li key={a.text}>
                <span className="ac-ruled-list__icon">
                  <Icon name={a.icon} size={20} />
                </span>
                <span className="ac-ruled-list__text">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Las cuatro etapas. La numeración se gana: es una secuencia real y el orden
   es la información. El filete que las une se dibuja con el scroll — ese
   recorrido ES el paso del tiempo de la operación. */
const ETAPAS = [
  {
    n: "01",
    t: "Nos juntamos",
    d: "Media hora, presencial o por videollamada. Escucho qué buscás y te digo con franqueza si esto te sirve o no.",
  },
  {
    n: "02",
    t: "Elegimos la unidad",
    d: "Comparamos orientación, piso, superficie y forma de pago. Te muestro también lo que no te conviene y por qué.",
  },
  {
    n: "03",
    t: "Revisamos los papeles",
    d: "Fideicomiso, plano aprobado, boleto. Te explico cada cláusula antes de la firma, sin apuro.",
  },
  {
    n: "04",
    t: "Seguimos la obra",
    d: "Informe mensual de avance hasta la posesión. Si algo se corre, te enterás por mí primero.",
  },
];

export function Proceso() {
  return (
    <section className="ac-section surface-raised" id="proceso">
      <div className="ac-container">
        <h2 className="ac-h1" style={{ maxWidth: "20ch" }} data-reveal>
          Cuatro etapas, sin sorpresas en el medio.
        </h2>

        <div className="obra">
          <div className="obra__rail" aria-hidden="true">
            <div className="obra__rail-fill" />
          </div>
          <ol className="obra__steps">
            {ETAPAS.map((e) => (
              <li className="obra__step" key={e.n}>
                <span className="obra__dot" aria-hidden="true" />
                <p className="obra__num">{e.n}</p>
                <h3 className="obra__title">{e.t}</h3>
                <p className="obra__text">{e.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
