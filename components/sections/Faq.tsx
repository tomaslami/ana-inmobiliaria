import { Accordion, type AccordionItem } from "../content/Accordion";

const ITEMS: AccordionItem[] = [
  {
    question: "¿Por qué conviene entrar en pozo?",
    answer:
      "Porque entrás al valor de obra, antes de que el edificio esté terminado, y lo pagás en etapas mientras se construye. La contracara es que comprás sobre planos y papeles — y ahí es donde me meto yo: fideicomiso, boleto y avance de obra, revisados antes de cada firma.",
  },
  {
    question: "¿Por qué no publicás los precios?",
    answer:
      "Porque cambian con el avance de obra y según la unidad, y no quiero que veas un número viejo. Me escribís, te paso la lista vigente completa con la forma de pago, y la analizamos juntos.",
  },
  {
    question: "¿Se puede comprar desde el exterior?",
    answer:
      "Sí. Se puede firmar con poder o de manera presencial en la fecha que coordines. Ya acompañé operaciones de argentinos viviendo afuera; te armo el circuito completo antes de que viajes.",
  },
  {
    question: "¿Qué pasa si la obra se demora?",
    answer:
      "El boleto fija un plazo de entrega con una tolerancia y las penalidades por mora de la desarrolladora. Te muestro esas cláusulas antes de firmar y te mando el avance de obra todos los meses.",
  },
  {
    question: "¿Puedo comprar para alquilar?",
    answer:
      "Sí. Te paso los valores de alquiler actuales de la zona por tipología y el retorno estimado, con los supuestos a la vista para que los discutas.",
  },
  {
    question: "¿Cómo es la forma de pago?",
    answer:
      "Se ingresa con un 40% de anticipo y el saldo se paga en cuotas mientras avanza la obra. Como en todo pozo, el precio y el plan cambian con el avance: cuanto antes entrás, mejores condiciones. Antes de que decidas te armo la proyección completa, cuota por cuota.",
  },
  {
    question: "¿Toman mi propiedad como parte de pago?",
    answer:
      "Sí. Tomamos tu departamento, casa o PH como parte de pago de una unidad en Heredia. Contame qué tenés y te digo cómo puede funcionar en tu caso.",
  },
];

export function Faq() {
  return (
    <section className="ac-section" id="faq">
      <div className="ac-container">
        <div className="two-col">
          <div className="faq-sticky">
            <h2 className="ac-h2 faq-head" data-reveal>
              Lo que casi todos me preguntan.
            </h2>
          </div>
          <div data-reveal>
            <Accordion idPrefix="faq" items={ITEMS} defaultOpen={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
