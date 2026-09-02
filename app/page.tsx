import { Header } from "../components/navigation/Header";
import { Footer } from "../components/navigation/Footer";
import { ContactRow } from "../components/content/ContactRow";
import { Hero, Sobre } from "../components/sections/Hero";
import { Emprendimiento, Proceso } from "../components/sections/Emprendimiento";
import { Tipologias } from "../components/sections/Tipologias";
import { Galeria } from "../components/sections/Galeria";
import { Ubicacion } from "../components/sections/Ubicacion";
import { Propiedades } from "../components/sections/Propiedades";
import { Confianza } from "../components/sections/Confianza";
import { Faq } from "../components/sections/Faq";
import { Contacto } from "../components/sections/Contacto";
import { Motion } from "../components/motion/Motion";
import { SUPERCIELO_URL } from "../lib/heredia";

const NAV = [
  { label: "Sobre mí", href: "#sobre" },
  { label: "Heredia", href: "#emprendimiento" },
  { label: "Tipologías", href: "#tipologias" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Propiedades", href: "#propiedades" },
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
        <Confianza />
        <Emprendimiento />
        <Tipologias />
        <Galeria />
        <Ubicacion />
        <Propiedades />
        <Proceso />
        <Faq />
        <Contacto />
      </main>
      <Motion />
      <Footer
        legal="© 2026 Ana Chaher. Todos los derechos reservados."
        matricula="Matrícula CUCICBA 6.482"
        columns={[
          {
            heading: "Contacto",
            content: (
              <>
                <ContactRow icon="phone" value="+54 9 11 4023 7788" href="tel:+5491140237788" />
                <ContactRow icon="mail" value="hola@anachaher.com.ar" href="mailto:hola@anachaher.com.ar" />
                <ContactRow icon="map-pin" value="Heredia 1320, CABA" href="https://maps.google.com/?q=Heredia+1320,+CABA" />
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
              { label: "Propiedades en cartera", href: "#propiedades" },
              { label: "Preguntas frecuentes", href: "#faq" },
            ],
          },
        ]}
      >
        <p className="ac-body-sm" style={{ color: "var(--text-on-inverse-muted)", maxWidth: "22rem" }}>
          Asesora inmobiliaria en Buenos Aires. Una operación a la vez, de la primera charla a la
          escritura. Comercialización de Heredia, un desarrollo de{" "}
          <a href={SUPERCIELO_URL} target="_blank" rel="noopener">
            Supercielo
          </a>
          .
        </p>
      </Footer>
    </>
  );
}
