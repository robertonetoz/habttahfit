"use client";

import { useState } from "react";
import { mensagens, modalidades, whatsapp } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

export function Modalidades() {
  const [ativa, setAtiva] = useState(modalidades[0].id);

  return (
    <section id="modalidades" className="bg-concreto">
      <div className="faixa py-20 lg:py-32">
        <Degrau className="text-bordo" />
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="titulo titulo-2 lg:col-span-7">Modalidades</h2>
          <p className="max-w-[40ch] text-xl leading-snug lg:col-span-5 lg:pb-2">
            Cinco jeitos de treinar no mesmo endereço. Escolha um para ver os detalhes.
          </p>
        </div>

        {/* No celular cada item abre embaixo do nome. Em telas grandes o
            detalhe da modalidade ativa ocupa a coluna da direita. */}
        <div className="relative mt-12 lg:mt-16 lg:min-h-[34rem]">
          {modalidades.map((m) => {
            const aberta = m.id === ativa;
            return (
              <div
                key={m.id}
                data-ativa={aberta}
                data-longa={m.nome.length > 11}
                className="modalidade border-t-2 border-black last:border-b-2 lg:w-[54%]"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={aberta}
                    aria-controls={`modalidade-${m.id}`}
                    onClick={() => setAtiva(m.id)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setAtiva(m.id)}
                    onFocus={() => setAtiva(m.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left lg:py-5"
                  >
                    <span
                      className={`titulo modalidade-nome text-[clamp(2.5rem,11vw,5rem)] whitespace-nowrap lg:text-[clamp(3.4rem,5.5vw,5rem)] ${
                        aberta ? "text-bordo" : "text-black/55"
                      }`}
                    >
                      {m.nome}
                    </span>
                    <Icon
                      name="mais"
                      className={`size-6 flex-none transition-transform duration-300 lg:hidden ${
                        aberta ? "rotate-45 text-bordo" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`modalidade-${m.id}`}
                  data-aberto={aberta}
                  inert={!aberta}
                  className={`abre lg:absolute lg:top-0 lg:right-0 lg:block lg:w-[38%] lg:transition-[opacity,transform] lg:duration-500 ${
                    aberta ? "lg:opacity-100" : "lg:translate-y-3 lg:opacity-0"
                  }`}
                >
                  <div>
                    <div className="pb-8 lg:pb-0">
                      <Icon name={m.icone} className="size-16 text-bordo lg:size-24" />
                      <p className="mt-5 max-w-[42ch] text-lg lg:mt-8 lg:text-[1.35rem] lg:leading-normal">
                        {m.texto}
                      </p>
                      <figure className="mt-7 border-l-4 border-bordo pl-5">
                        <blockquote className="max-w-[44ch]">“{m.depoimento.texto}”</blockquote>
                        <figcaption className="mt-2 text-[0.95rem] font-semibold">
                          {m.depoimento.autor}, no Google
                        </figcaption>
                      </figure>
                      {m.id === "coletivas" && (
                        <a
                          href={whatsapp(mensagens.aulas)}
                          target="_blank"
                          rel="noopener"
                          className="botao mt-7 bg-bordo text-white hover:bg-black"
                        >
                          <Icon name="conversa" />
                          Pedir a grade de aulas
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
