import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { ContextProvider } from "./context/store";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Fikiri | home",
  description:
    " Fikiri est une plateforme web qui vise à cartographier les solutions locales en République Démocratique du Congo pour accélérer l'atteinte des Objectifs de Développement Durable (ODD).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-gray-700`}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
