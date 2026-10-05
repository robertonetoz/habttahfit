"use client";

import { useAgora } from "@/lib/hooks";
import { agenda, mensagens, promo, whatsapp, type Evento } from "@/lib/site";
import { diasAte } from "@/lib/tempo";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

function Contagem({ agora }: { agora: Date | null }) {
  const dias = agora ? diasAte(agora, promo.termina) : null;

  if (dias === null) {
    return <p className="text-lg font-semibold">Válida até 31/10</p>;
  }
  if (dias < 0) {
    return <p className="titulo text-5xl">Oferta encerrada</p>;
  }
  if (dias === 0) {
    return <p className="titulo text-6xl">Último dia</p>;
  }
  return (
    <p className="flex items-end gap-3">
      <span className="titulo text-[6.5rem] leading-[0.8]">{dias}</span>
      <span className="pb-1 text-lg leading-tight font-semibold">
        {dias === 1 ? "dia" : "dias"} para
        <br />a oferta acabar
      </span>
    </p>
  );
}

function situacao(evento: Evento, agora: Date | null) {
  if (!agora) return null;
  const t = agora.getTime();
  if (t > Date.parse(evento.fim)) return "Encerrado";
  if (t >= Date.parse(evento.inicio)) return "Acontecendo agora";
  const dias = diasAte(agora, evento.inicio);
  return dias === 1 ? "Amanhã" : `Em ${dias} dias`;
}

export function Outubro() {
  const agora = useAgora();
  const encerrada = agora ? diasAte(agora, promo.termina) < 0 : false;

  return (
    <section id="outubro" className="bg-black text-white">
      <div className="faixa py-20 lg:py-32">
        <Degrau className="text-bordo" />
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="titulo titulo-2 lg:col-span-7">Outubro: escolha você.</h2>
          <p className="max-w-[40ch] text-xl leading-snug text-white/80 lg:col-span-5 lg:pb-2">
            Você cabe na sua agenda, não só nos seus planos. O primeiro passo não precisa esperar
            outra segunda-feira.
          </p>
        </div>

        <div className="bilhete mt-12 grid bg-bordo lg:mt-16 lg:grid-cols-[1fr_24rem]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xl font-semibold">1ª mensalidade do plano anual por</p>
            <p className="titulo bilhete-preco mt-4 flex items-start whitespace-nowrap">
              <span className="mt-[0.5em] mr-[0.25em] text-[clamp(1.75rem,5vw,3.5rem)]">R$</span>
              <span className="text-[clamp(7.5rem,27vw,19rem)] leading-[0.78] lg:text-[min(19vw,19rem)]">
                {promo.preco}
              </span>
              <span aria-hidden="true" className="text-[clamp(2.5rem,6vw,5rem)]">
                *
              </span>
            </p>
            <p className="mt-8 max-w-[60ch] text-[0.95rem] text-rosa">* {promo.regra}</p>
          </div>

          <div className="bilhete-canhoto relative flex flex-col justify-between gap-10 border-t-2 border-dashed border-black p-7 sm:p-10 lg:border-t-0 lg:border-l-2">
            <Contagem agora={agora} />
            <a
              href={whatsapp(encerrada ? mensagens.comecar : mensagens.promo)}
              target="_blank"
              rel="noopener"
              className="botao catraca bg-white text-bordo hover:bg-black hover:text-white"
            >
              <Icon name="catraca" />
              {encerrada ? "Consultar os planos" : "Garantir os R$ 9,90 no WhatsApp"}
            </a>
          </div>
        </div>

        <h3 className="titulo mt-20 text-4xl lg:mt-28 lg:text-5xl">Também neste mês</h3>
        <ul className="mt-8 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {agenda.map((evento) => {
            const estado = situacao(evento, agora);
            const passou = estado === "Encerrado";
            return (
              <li
                key={evento.id}
                className={`border-t-2 border-white/25 pt-6 ${passou ? "opacity-50" : ""}`}
              >
                <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="titulo text-6xl text-white lg:text-7xl">{evento.quando}</span>
                  {estado && (
                    <span
                      className={`text-[0.95rem] font-semibold ${
                        estado === "Acontecendo agora" ? "text-aberta" : "text-white/70"
                      }`}
                    >
                      {estado}
                    </span>
                  )}
                </p>
                <h4 className="mt-5 text-2xl font-bold">{evento.titulo}</h4>
                <p className="mt-2 max-w-[52ch] text-white/80">{evento.texto}</p>
                {!passou && (
                  <a
                    href={whatsapp(evento.acao.mensagem)}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex items-center gap-2.5 font-bold underline decoration-bordo decoration-4 underline-offset-8 hover:decoration-white"
                  >
                    <Icon name="conversa" className="size-5" />
                    {evento.acao.rotulo}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
