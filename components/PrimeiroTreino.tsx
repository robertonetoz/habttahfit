"use client";

import { useState } from "react";
import { duvidas, mensagens, whatsapp } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

export function PrimeiroTreino() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="primeiro-treino" className="bg-concreto">
      <div className="faixa grid gap-x-16 gap-y-12 py-20 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <Degrau className="text-bordo" />
          <h2 className="titulo titulo-2 mt-7">Você não precisa chegar sabendo.</h2>
          <p className="mt-6 max-w-[36ch] text-xl leading-snug">
            O primeiro treino costuma vir com muitas dúvidas, e tudo bem. Estas são as que a gente
            mais ouve.
          </p>
          <a
            href={whatsapp(mensagens.comecar)}
            target="_blank"
            rel="noopener"
            className="botao mt-8 bg-bordo text-white hover:bg-black"
          >
            <Icon name="whatsapp" />
            Tirar outra dúvida no WhatsApp
          </a>
        </div>

        <div className="lg:col-span-7">
          {duvidas.map((duvida, i) => {
            const estaAberta = aberta === i;
            return (
              <div key={duvida.pergunta} className="border-t-2 border-black last:border-b-2">
                <h3>
                  <button
                    type="button"
                    aria-expanded={estaAberta}
                    aria-controls={`duvida-${i}`}
                    onClick={() => setAberta(estaAberta ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-2xl leading-tight font-bold lg:text-[1.75rem]"
                  >
                    {duvida.pergunta}
                    <Icon
                      name="mais"
                      className={`size-6 flex-none text-bordo transition-transform duration-300 ${
                        estaAberta ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div id={`duvida-${i}`} data-aberto={estaAberta} inert={!estaAberta} className="abre">
                  <div>
                    <p className="max-w-[58ch] pb-7 text-lg">{duvida.resposta}</p>
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
