import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pałac Pass — Where Timeless Stories Begin",
  description:
    "A restored 19th-century palace near Warsaw. An exclusive venue for weddings, corporate events, and unforgettable celebrations set within 17 hectares of English landscape park.",
  keywords: [
    "Pałac Pass",
    "palace wedding venue Poland",
    "luxury event venue Warsaw",
    "wedding venue near Warsaw",
    "corporate events palace",
    "historic venue Poland",
  ],
  openGraph: {
    title: "Pałac Pass — Where Timeless Stories Begin",
    description:
      "A restored 19th-century palace near Warsaw. Exclusive weddings & events in 17 hectares of heritage parkland.",
    url: "https://palacpass.pl",
    siteName: "Pałac Pass",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
