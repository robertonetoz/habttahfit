import { avaliacoes, site } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon } from "./Icon";

function Estrelas() {
  const cheio = `${(site.google.notaNumero / 5) * 100}%`;
  const fila = (
    <span className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="estrela" className="size-7 flex-none" />
      ))}
    </span>
  );
  return (
    <span className="relative inline-block text-black/15" aria-hidden="true">
      {fila}
      <span className="absolute inset-0 overflow-hidden text-bordo" style={{ width: cheio }}>
        {fila}
      </span>
    </span>
  );
}

export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-white">
      <div className="faixa grid gap-x-16 gap-y-14 py-20 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Degrau className="text-bordo" />
            <h2 className="mt-7 text-xl font-semibold">Quem treina aqui deu nota</h2>
            <p className="titulo mt-2 text-[clamp(9rem,30vw,15rem)] leading-[0.8] text-bordo">
              {site.google.nota}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Estrelas />
              <span className="font-semibold">{site.google.avaliacoes} avaliações no Google</span>
            </p>
            <a
              href={site.google.href}
              target="_blank"
              rel="noopener"
              className="botao mt-8 border-2 border-black hover:bg-black hover:text-white"
            >
              Ler todas no Google
            </a>
          </div>
        </div>

        <div className="gap-x-14 sm:columns-2 lg:col-span-8">
          {avaliacoes.map((a) => (
            <figure key={a.autor} className="mb-12 break-inside-avoid">
              <blockquote
                className={
                  a.destaque
                    ? "titulo text-[2.6rem] leading-[0.95] text-bordo lg:text-5xl lg:leading-[0.95]"
                    : "text-lg"
                }
              >
                “{a.texto}”
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 font-semibold">
                {a.autor}
                {a.guia && <span className="text-sm font-normal text-black/60">Local Guide</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
