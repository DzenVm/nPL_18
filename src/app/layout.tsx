import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Rajdhani, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleTag } from "@/components/GoogleTag";
import { site } from "@/content/site";

const rajdhani = Rajdhani({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Przeglądarkowa gra wyścigowa o podwórkowych torach | " + site.domain,
    template: "%s | " + site.domain,
  },
  description:
    "Darmowa gra przeglądarkowa o wyścigach modeli zbudowanych własnoręcznie: ręczna skrzynia biegów na wyczucie, tory z desek, kredy i węża ogrodowego. Bez instalacji, bez mikropłatności.",
  applicationName: site.domain,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.domain,
    title: "Przeglądarkowa gra wyścigowa o podwórkowych torach",
    description:
      "Ręczna skrzynia biegów na wyczucie, balast dobierany przed startem i tory zbudowane z tego, co akurat było pod ręką. Zero mikropłatności, zero instalacji.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Przeglądarkowa gra wyścigowa o podwórkowych torach",
    description:
      "Ręczna skrzynia biegów na wyczucie i tory zbudowane z desek, kredy i węża ogrodowego. Zagraj w przeglądarce, bez instalacji.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#171310",
  colorScheme: "dark",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.domain,
  url: site.url,
  inLanguage: site.language,
  description:
    "Darmowa przeglądarkowa gra wyścigowa o modelach budowanych ręcznie i torach ułożonych z domowych przedmiotów, bez mikropłatności i bez elementów losowych.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${rajdhani.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Przejdź do treści głównej
        </a>
        <div style={{ viewTransitionName: "site-header" }}>
          <SiteHeader />
        </div>
        <ViewTransition name="page-content">
          <main id="main">{children}</main>
        </ViewTransition>
        <SiteFooter />
        <CookieConsent />
        <GoogleTag />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
