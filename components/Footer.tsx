import Image from "next/image";
import { horarios, navegacao, site } from "@/lib/site";
import { TipoVivo } from "./TipoVivo";

export function Footer() {
  const { endereco } = site;

  return (
    <footer className="overflow-clip bg-bordo-fundo pb-24 text-white lg:pb-0">
      <div className="faixa pt-16 lg:pt-24">
        <p className="titulo text-[19.5vw] lg:text-[min(17.5vw,21rem)]">
          <span className="sr-only">{site.nome}</span>
          <TipoVivo linhas={[["Habttah", "Fit"]]} max={88} />
        </p>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/logo.png"
              alt=""
              width={64}
              height={64}
              className="size-16 brightness-0 invert"
            />
            <p className="mt-5 max-w-[22ch] text-xl leading-snug font-semibold">{site.slogan}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-rosa">Endereço</h2>
            <address className="mt-2 not-italic">
              {endereco.rua}, {endereco.bairro}
              <br />
              {endereco.cidade}, {endereco.uf}
              <br />
              CEP {endereco.cep}
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-rosa">Horários</h2>
            <ul className="mt-2">
              {horarios.map((turno) => (
                <li key={turno.id}>
                  {turno.rotulo}: {turno.abreTexto} às {turno.fechaTexto}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <h2 className="text-rosa">Seções</h2>
            <ul className="mt-2">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t-2 border-white/20 py-6 text-sm text-rosa">
          © {new Date().getFullYear()} {site.nome}. {endereco.cidade}, {endereco.uf}.
        </p>
      </div>
    </footer>
  );
}
