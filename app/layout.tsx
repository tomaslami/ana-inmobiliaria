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
    "Asesora inmobiliaria matriculada (CUCICBA 6.482). Inversión en pozo en Heredia, un edificio de Supercielo en Villa Ortúzar: monoambientes a 4 ambientes con terraza, pileta y parrilla.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${newsreader.variable} ${sourceSans3.variable}`}>
      <body>{children}</body>
    </html>
  );
}
