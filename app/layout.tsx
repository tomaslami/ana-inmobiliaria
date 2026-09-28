import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import GclidCapture from "../components/analytics/GclidCapture";
import "./globals.css";

/* Contenedor de Google Tag Manager del sitio. */
const GTM_ID = "GTM-NXWFNK55";

/* Las dos familias salen del logo, no del gusto: el monograma CAH es una
   Didone (asta gruesa, serifa plana sin corchete, hairline fina) y el
   descriptor "REAL ESTATE" es una geométrica muy espaciada.
   Ambas son variables, así que no se declaran pesos: viene el rango entero
   en un solo archivo. La disciplina de usar solo 400/500/600 vive en los
   tokens de typography.css, no en la carga. */

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  /* Eje óptico: sin esto el título de 96px y el h4 de 22px usarían el mismo
     dibujo, y las hairlines de una Didone se parten en los tamaños chicos.
     Con el eje cargado, font-optical-sizing (auto por defecto) lo resuelve
     contra el font-size de cada rol. */
  axes: ["opsz"],
  display: "swap",
  variable: "--ac-font-bodoni",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--ac-font-jost",
});

const TITULO = "Ana Chaher — Asesora inmobiliaria en Buenos Aires";
const DESCRIPCION =
  "Diez años vendiendo departamentos desde el pozo y terminados en Buenos Aires. Hoy comercializo Heredia, un edificio de Supercielo en Villa Ortúzar. Intermediación Inmobiliaria realizada por Premier Real Estate S.A.";

export const metadata: Metadata = {
  /* Base de las URLs absolutas de og:image. El respaldo es el dominio de
     producción, no localhost: si la variable faltaba en Vercel, WhatsApp y
     las redes recibían la imagen en http://localhost:3000 y no mostraban nada. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://anachaher.com"),
  title: TITULO,
  description: DESCRIPCION,
  /* La imagen la agrega sola app/opengraph-image.png; acá va el resto de la
     tarjeta que arman WhatsApp, Facebook y LinkedIn al pegar el link. */
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Ana Chaher — Real Estate",
    title: TITULO,
    description: DESCRIPCION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${bodoniModa.variable} ${jost.variable}`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <GclidCapture />
        {/* Respaldo de GTM para navegadores sin JavaScript. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
