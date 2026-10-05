import { pilares } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

export function Estrutura() {
  return (
    <section id="estrutura" className="bg-white">
      <div className="faixa py-20 lg:py-32">
        <Degrau className="text-bordo" />
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="titulo titulo-2 text-bordo lg:col-span-7">
            Seu treino começa antes do primeiro movimento.
          </h2>
          <p className="max-w-[40ch] text-xl leading-snug lg:col-span-5 lg:pb-2">
            Começa na recepção que acolhe, no ambiente bem cuidado e na atenção de quem orienta
            você. É isso que a Habttah chama de estrutura, método e acompanhamento.
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          {pilares.map((pilar) => (
            <article
              key={pilar.titulo}
              className="grid gap-x-10 gap-y-4 border-t-2 border-black py-9 lg:grid-cols-12 lg:items-start lg:py-12"
            >
              <Icon name={pilar.icone} className="size-14 text-bordo lg:col-span-2 lg:size-18" />
              <h3 className="titulo text-5xl lg:col-span-5 lg:text-[4.25rem]">{pilar.titulo}</h3>
              <p className="max-w-[54ch] text-lg lg:col-span-5 lg:text-xl lg:leading-normal">
                {pilar.texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
