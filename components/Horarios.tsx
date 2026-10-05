"use client";

import type { CSSProperties } from "react";
import { useAgora, useNaTela } from "@/lib/hooks";
import { horarios } from "@/lib/site";
import { statusAgora } from "@/lib/tempo";
import { Degrau } from "./Degrau";
import { Status } from "./Status";

// A régua vai das 5h às 23h: cobre todos os turnos sem desperdiçar a madrugada.
const INICIO = 5;
const FIM = 23;
const MARCAS = [6, 9, 12, 15, 18, 21];

const posicao = (hora: number) => `${((hora - INICIO) / (FIM - INICIO)) * 100}%`;

export function Horarios() {
  const agora = useAgora();
  const status = agora ? statusAgora(agora) : null;
  const [ref, visto] = useNaTela<HTMLDivElement>();

  return (
    <section id="horarios" className="bg-bordo text-white">
      <div className="faixa py-20 lg:py-32">
        <Degrau />
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="titulo titulo-2 lg:col-span-7">Aberta todos os dias.</h2>
          <p className="text-xl font-semibold lg:col-span-5 lg:pb-2">
            <Status />
          </p>
        </div>

        <div ref={ref} data-visto={visto} className="mt-12 lg:mt-16">
          {horarios.map((turno, i) => {
            const hoje = status?.turno.id === turno.id;
            const agulha =
              status && hoje && status.hora >= INICIO && status.hora <= FIM
                ? posicao(status.hora)
                : null;
            return (
              <div
                key={turno.id}
                className="grid gap-x-10 gap-y-5 border-t-2 border-white/30 py-8 lg:grid-cols-12 lg:items-end lg:py-10"
              >
                <div className="lg:col-span-5">
                  <h3 className="flex items-center gap-3 text-lg font-semibold text-rosa">
                    {turno.rotulo}
                    {hoje && (
                      <span className="bg-white px-2 py-0.5 text-sm font-bold text-bordo">Hoje</span>
                    )}
                  </h3>
                  <p className="titulo mt-3 text-[clamp(3.5rem,13vw,6rem)]">
                    {turno.abreTexto} às {turno.fechaTexto}
                  </p>
                </div>

                <div className="relative pt-7 lg:col-span-7 lg:mb-3" aria-hidden="true">
                  <div className="relative h-4 bg-white/15">
                    <div
                      className="barra-turno absolute inset-y-0 bg-white"
                      style={
                        {
                          left: posicao(turno.abre),
                          right: `calc(100% - ${posicao(turno.fecha)})`,
                          "--atraso": `${i * 0.15}s`,
                        } as CSSProperties
                      }
                    />
                  </div>
                  {agulha && (
                    <div
                      className="absolute top-0 bottom-[-0.5rem] w-0.5 bg-black"
                      style={{ left: agulha }}
                    >
                      <span className="absolute top-0 left-2 text-sm leading-none font-bold whitespace-nowrap">
                        agora
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="grid gap-x-10 border-t-2 border-white/30 pt-4 lg:grid-cols-12" aria-hidden="true">
            <div className="relative h-5 text-sm text-rosa lg:col-span-7 lg:col-start-6">
              {MARCAS.map((hora) => (
                <span key={hora} className="absolute -translate-x-1/2" style={{ left: posicao(hora) }}>
                  {hora}h
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-[52ch] text-lg text-rosa">
          Em feriados vale o horário de domingo, das 08h às 12h. Mudanças de última hora saem
          primeiro no Instagram.
        </p>
      </div>
    </section>
  );
}
