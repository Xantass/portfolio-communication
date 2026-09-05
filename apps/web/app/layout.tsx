import { nav } from "@portfolio/content";
import { NavBar } from "@portfolio/ui";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Alizée — Portfolio",
  description: "Portfolio d'Alizée, communication et création visuelle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <div className="relative w-full overflow-x-hidden">
          <NavBar brand={nav.brand} items={nav.items} />
          {children}
        </div>
      </body>
    </html>
  );
}
