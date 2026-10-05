import type { CSSProperties } from "react";
import { mensagens, site, whatsapp } from "@/lib/site";
import { Icon } from "./Icon";
import { Status } from "./Status";
import { TipoVivo } from "./TipoVivo";

const atraso = (s: number) => ({ "--atraso": `${s}s` }) as CSSProperties;

// O H da marca em tamanho de parede: as duas metades entram de lados opostos
// e travam desencontradas, como no logotipo.
function HGigante() {
  return (
    <svg
      viewBox="0 0 360 520"
      aria-hidden="true"
      className="pointer-events-none absolute top-[10%] -right-[30%] -z-10 w-[92%] fill-bordo-fundo sm:-right-[10%] sm:w-[60%] lg:top-[7%] lg:right-[3%] lg:h-[104%] lg:w-auto"
    >
      <g className="h-esquerda">
        <rect width="84" height="520" />
        <rect x="84" y="227" width="134" height="36" />
      </g>
      <g className="h-direita">
        <rect x="276" width="84" height="520" />
        <rect x="98" y="291" width="178" height="36" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-clip bg-bordo text-white">
      <HGigante />

      <div className="faixa flex min-h-svh flex-col pt-30 pb-8 lg:pt-40 lg:pb-10">
        <h1 className="titulo text-[21.5vw] lg:text-[min(9.6vw,11.5rem)]">
          <span className="sr-only">{site.slogan}</span>
          <TipoVivo
            linhas={[
              ["Mais que", "academia,"],
              ["um estilo", "de vida."],
            ]}
            entrada
            atraso={650}
            empilha
            mascara
          />
        </h1>

        <div className="aparece mt-8 lg:mt-12" style={atraso(0.55)}>
          <p className="max-w-[36ch] text-xl leading-snug lg:text-[1.45rem]">
            Estrutura, método e acompanhamento no Centro de Araguari. Você não precisa chegar
            sabendo: a gente te ajuda a começar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
            <a
              href={whatsapp(mensagens.promo)}
              target="_blank"
              rel="noopener"
              className="botao bg-white text-bordo hover:bg-black hover:text-white"
            >
              <Icon name="whatsapp" />
              Quero começar por R$ 9,90
            </a>
            <a
              href="#outubro"
              className="botao border-2 border-white hover:bg-white hover:text-bordo"
            >
              Ver a oferta de outubro
            </a>
          </div>
        </div>

        <dl
          className="aparece mt-auto grid gap-x-10 gap-y-5 pt-14 text-[0.95rem] sm:grid-cols-3"
          style={atraso(0.75)}
        >
          <div className="border-t-2 border-white/30 pt-4">
            <dt className="text-rosa">Agora</dt>
            <dd className="mt-1 text-lg font-semibold">
              <Status />
            </dd>
          </div>
          <div className="border-t-2 border-white/30 pt-4">
            <dt className="text-rosa">Endereço</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href={site.google.rota} target="_blank" rel="noopener" className="hover:underline">
                {site.endereco.rua}, {site.endereco.bairro}
              </a>
            </dd>
          </div>
          <div className="border-t-2 border-white/30 pt-4">
            <dt className="text-rosa">No Google</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href="#avaliacoes" className="inline-flex items-center gap-2 hover:underline">
                <Icon name="estrela" className="size-4.5" />
                {site.google.nota} em {site.google.avaliacoes} avaliações
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
