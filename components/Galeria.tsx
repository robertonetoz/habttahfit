"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { galeria, site, type Foto } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

const quadro: Record<Foto["formato"], string> = {
  grande: "col-span-2 row-span-2",
  alto: "row-span-2",
  largo: "col-span-2",
  quadrado: "",
};

export function Galeria() {
  const fotos = galeria.filter((f) => f.src);
  const [indice, setIndice] = useState<number | null>(null);
  const visor = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = visor.current;
    if (!el) return;
    if (indice !== null && !el.open) el.showModal();
    if (indice === null && el.open) el.close();
  }, [indice]);

  const anda = (passo: number) =>
    setIndice((i) => (i === null ? i : (i + passo + fotos.length) % fotos.length));

  const atual = indice !== null ? fotos[indice] : null;

  return (
    <section id="galeria" className="bg-white">
      <div className="faixa py-20 lg:py-32">
        <Degrau className="text-bordo" />
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="titulo titulo-2 text-bordo lg:col-span-7">Por dentro da Habttah.</h2>
          <p className="max-w-[40ch] text-xl leading-snug lg:col-span-5 lg:pb-2">
            Da fachada na Dr. Afrânio às máquinas. Toque em uma foto para ampliar.
          </p>
        </div>

        <ul className="mt-12 grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-2.5 sm:auto-rows-[13rem] lg:mt-16 lg:auto-rows-[17rem] lg:grid-cols-4 lg:gap-3.5">
          {galeria.map((foto) => (
            <li key={foto.id} className={quadro[foto.formato]}>
              {foto.src ? (
                <button
                  type="button"
                  onClick={() => setIndice(fotos.indexOf(foto))}
                  className="group relative block size-full overflow-hidden bg-black text-left text-white"
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-trava group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/75 to-transparent p-4 pt-14 font-semibold">
                    {foto.legenda}
                    <Icon name="ampliar" className="size-5 flex-none" />
                  </span>
                </button>
              ) : (
                <div className="reservado flex size-full flex-col justify-between p-4 lg:p-5">
                  <Icon name={foto.icone} className="size-9 text-bordo lg:size-11" />
                  <p className="leading-tight font-semibold">
                    {foto.legenda}
                    <span className="block text-sm font-normal text-black/60">Foto em breve</span>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-lg">
          Tem mais no Instagram:{" "}
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener"
            className="font-bold text-bordo underline decoration-2 underline-offset-4 hover:text-black"
          >
            {site.instagram.usuario}
          </a>
        </p>
      </div>

      <dialog
        ref={visor}
        className="visor"
        aria-label="Foto ampliada"
        onClose={() => setIndice(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") anda(1);
          if (e.key === "ArrowLeft") anda(-1);
        }}
      >
        {atual?.src && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 p-4 lg:px-8">
              <p className="font-semibold">
                {atual.legenda}
                <span className="ml-3 font-normal text-white/60">
                  {indice! + 1} de {fotos.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setIndice(null)}
                className="grid size-12 place-items-center"
              >
                <span className="sr-only">Fechar foto</span>
                <Icon name="fechar" className="size-7" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image src={atual.src} alt={atual.alt} fill sizes="100vw" className="object-contain" />
            </div>
            {fotos.length > 1 && (
              <div className="flex justify-between gap-4 p-4 font-semibold lg:px-8">
                <button type="button" onClick={() => anda(-1)} className="min-h-12 px-2 hover:underline">
                  Foto anterior
                </button>
                <button type="button" onClick={() => anda(1)} className="min-h-12 px-2 hover:underline">
                  Próxima foto
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
