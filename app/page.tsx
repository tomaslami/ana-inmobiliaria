import { Header } from "../components/navigation/Header";
import { Footer } from "../components/navigation/Footer";
import { ContactRow } from "../components/content/ContactRow";
import { Hero, Sobre } from "../components/sections/Hero";
import { Emprendimiento, Proceso } from "../components/sections/Emprendimiento";
import { Tipologias } from "../components/sections/Tipologias";
import { Galeria } from "../components/sections/Galeria";
import { Ubicacion } from "../components/sections/Ubicacion";
import { Terminados } from "../components/sections/Terminados";
import { Faq } from "../components/sections/Faq";
import { Contacto } from "../components/sections/Contacto";
import { Motion } from "../components/motion/Motion";
import { SUPERCIELO_URL } from "../lib/heredia";
import { AGENCIA, ANA, MAIL, TELEFONO } from "../lib/contacto";

/* La banda de marcas (<Confianza />) está desconectada a pedido de la dueña
   hasta tener los logos: el componente y lib/confianza.ts quedan intactos y
   vuelven agregando el import y la etiqueta. */

const NAV = [
  { label: "Sobre mí", href: "#sobre" },
  { label: "Heredia", href: "#emprendimiento" },
  { label: "Tipologías", href: "#tipologias" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Entregados", href: "#terminados" },
  { label: "Preguntas", href: "#faq" },
];

export default function Home() {
  return (
    <>
      <a className="ac-skip-link" href="#inicio">
        Ir al contenido
      </a>
      <Header links={NAV} cta="Consultar" ctaHref="#contacto" logoHref="#inicio" />
      <main>
        <Hero />
        <Sobre />
        <Emprendimiento />
        <Tipologias />
        <Galeria />
        <Ubicacion />
        <Terminados />
        <Proceso />
        <Faq />
        <Contacto />
      </main>
      <Motion />
      <Footer
        legal="© 2026 Ana Chaher. Todos los derechos reservados."
        matricula={
          <>
            Intermediación Inmobiliaria realizada por{" "}
            <a href={AGENCIA.url} target="_blank" rel="noopener">
              {AGENCIA.razonSocial}
            </a>{" "}
            {AGENCIA.matriculados}
          </>
        }
        columns={[
          {
            heading: "Contacto",
            content: (
              <>
                <ContactRow icon="phone" value={TELEFONO.display} href={TELEFONO.href} />
                <ContactRow icon="mail" value={MAIL.display} href={MAIL.href} />
                <ContactRow
                  icon="map-pin"
                  value={AGENCIA.domicilio}
                  href="https://maps.google.com/?q=Franklin+D.+Roosevelt+3160,+CABA"
                />
              </>
            ),
          },
          {
            heading: "Secciones",
            links: [
              { label: "Sobre mí", href: "#sobre" },
              { label: "El emprendimiento", href: "#emprendimiento" },
              { label: "Tipologías y planos", href: "#tipologias" },
              { label: "Ubicación", href: "#ubicacion" },
              { label: "Obras entregadas", href: "#terminados" },
              { label: "Preguntas frecuentes", href: "#faq" },
            ],
          },
        ]}
      >
        <p className="ac-body-sm" style={{ color: "var(--text-on-inverse-muted)", maxWidth: "22rem" }}>
          {ANA.rol} en Buenos Aires. Departamentos desde el pozo y terminados, de la primera charla
          a la escritura. Hoy comercializo Heredia, un desarrollo de{" "}
          <a href={SUPERCIELO_URL} target="_blank" rel="noopener">
            Supercielo
          </a>
          .
        </p>
      </Footer>
    </>
  );
}
