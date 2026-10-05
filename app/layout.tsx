import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { horarios, site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Endereço público do site, usado para montar o link da imagem de prévia.
// Na Vercel vem do domínio de produção do projeto; fora dela, de site.url.
const enderecoPublico =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : site.url);

export const metadata: Metadata = {
  metadataBase: new URL(enderecoPublico),
  title: "Habttah Fit | Academia no Centro de Araguari, MG",
  description: site.descricao,
  openGraph: {
    title: "Habttah Fit | Mais que academia, um estilo de vida",
    description: site.descricao,
    locale: "pt_BR",
    type: "website",
    siteName: site.nome,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#751215",
};

const hhmm = (hora: number) =>
  `${String(Math.floor(hora)).padStart(2, "0")}:${hora % 1 ? "30" : "00"}`;

const DIAS_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.nome,
  slogan: site.slogan,
  description: site.descricao,
  url: site.url,
  telephone: "+55 34 99167-8804",
  sameAs: [site.instagram.href],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.rua} - ${site.endereco.bairro}`,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.google.notaNumero,
    reviewCount: site.google.avaliacoes,
  },
  openingHoursSpecification: horarios.map((turno) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: turno.dias.map((d) => DIAS_SCHEMA[d]),
    opens: hhmm(turno.abre),
    closes: hhmm(turno.fecha),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
