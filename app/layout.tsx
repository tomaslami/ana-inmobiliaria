import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Ana Chaher — Asesora inmobiliaria en Buenos Aires",
  description:
    "Diez años vendiendo departamentos desde el pozo y terminados en Buenos Aires. Hoy comercializo Heredia, un edificio de Supercielo en Villa Ortúzar. Intermediación Inmobiliaria realizada por Premier Real Estate S.A.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${bodoniModa.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
