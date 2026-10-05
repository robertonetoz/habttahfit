import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Imagem que aparece quando o link do site é colado no WhatsApp, Instagram
// ou outra rede. O Next gera o PNG no build e aponta a tag og:image para ele.

export const alt = "Habttah Fit: mais que academia, um estilo de vida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BORDO = "#751215";
const BORDO_FUNDO = "#5c0d10";

const TITULO = ["Mais que academia,", "um estilo de vida."];
const RODAPE = [
  `Academia no ${site.endereco.bairro} de ${site.endereco.cidade}, ${site.endereco.uf}`,
  `Nota ${site.google.nota} no Google`,
];

// O gerador de imagem não lê fonte variável: pede ao Google Fonts uma versão
// fixa da Archivo, só com as letras usadas.
async function archivo(eixos: string, texto: string) {
  const url = `https://fonts.googleapis.com/css2?family=Archivo:${eixos}&text=${encodeURIComponent(texto)}`;
  const css = await (await fetch(url)).text();
  const arquivo = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!arquivo) throw new Error(`Fonte Archivo (${eixos}) não encontrada no Google Fonts`);
  return (await fetch(arquivo)).arrayBuffer();
}

export default async function Imagem() {
  const condensada = (TITULO.join("") + site.nome).toUpperCase();
  const [titulo, texto] = await Promise.all([
    archivo("wdth,wght@62.5,800", condensada),
    archivo("wght@600", RODAPE.join("")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: BORDO,
          color: "#fff",
        }}
      >
        {/* O H da marca, com as duas barras desencontradas. Fica deslocado
            para cima para as barras aparecerem acima do título. */}
        <div
          style={{
            position: "absolute",
            top: -196,
            right: 64,
            display: "flex",
            width: 492,
            height: 900,
          }}
        >
          <div style={{ position: "absolute", left: 0, width: 115, height: 900, background: BORDO_FUNDO }} />
          <div style={{ position: "absolute", left: 115, top: 310, width: 183, height: 49, background: BORDO_FUNDO }} />
          <div style={{ position: "absolute", right: 0, width: 115, height: 900, background: BORDO_FUNDO }} />
          <div style={{ position: "absolute", left: 134, top: 397, width: 243, height: 49, background: BORDO_FUNDO }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "60px 72px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Titulo",
              fontSize: 46,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                width: 68,
                height: 68,
                marginRight: 20,
                border: "5px solid #fff",
                borderRadius: 34,
              }}
            >
              <div style={{ position: "absolute", left: 19, top: 14, width: 5, height: 30, background: "#fff" }} />
              <div style={{ position: "absolute", left: 24, top: 25, width: 8, height: 3, background: "#fff" }} />
              <div style={{ position: "absolute", left: 34, top: 14, width: 5, height: 30, background: "#fff" }} />
              <div style={{ position: "absolute", left: 25, top: 31, width: 9, height: 3, background: "#fff" }} />
            </div>
            {site.nome}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              fontFamily: "Titulo",
              fontSize: 138,
              lineHeight: 0.9,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {TITULO.map((linha) => (
              <span key={linha}>{linha}</span>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 34, fontFamily: "Texto", fontSize: 30 }}>
            {RODAPE.map((item, i) => (
              <span
                key={item}
                style={{
                  marginRight: 36,
                  paddingLeft: i ? 36 : 0,
                  borderLeft: i ? "3px solid rgba(255,255,255,0.45)" : "none",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Titulo", data: titulo, weight: 800, style: "normal" },
        { name: "Texto", data: texto, weight: 600, style: "normal" },
      ],
    },
  );
}
