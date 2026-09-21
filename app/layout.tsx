import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ac-font-newsreader",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ac-font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Ana Chaher — Asesora inmobiliaria en Buenos Aires",
  description:
    "Diez años vendiendo departamentos desde el pozo y terminados en Buenos Aires. Hoy comercializo Heredia, un edificio de Supercielo en Villa Ortúzar. Intermediación Inmobiliaria realizada por Premier Real Estate S.A.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${newsreader.variable} ${sourceSans3.variable}`}>
      <body>{children}</body>
    </html>
  );
}
