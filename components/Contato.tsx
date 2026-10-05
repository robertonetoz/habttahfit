import { mensagens, site, whatsapp } from "@/lib/site";
import { Degrau } from "./Degrau";
import { Icon, type IconName } from "./Icon";

const canais: { icone: IconName; rotulo: string; valor: string; href: string }[] = [
  {
    icone: "conversa",
    rotulo: "WhatsApp",
    valor: site.whatsapp.texto,
    href: whatsapp(mensagens.comecar),
  },
  { icone: "telefone", rotulo: "Telefone", valor: site.telefone.texto, href: site.telefone.href },
  {
    icone: "camera",
    rotulo: "Instagram",
    valor: site.instagram.usuario,
    href: site.instagram.href,
  },
  { icone: "rota", rotulo: "Como chegar", valor: "Abrir a rota no Google Maps", href: site.google.rota },
];

export function Contato() {
  const { endereco } = site;

  return (
    <section id="contato" className="bg-concreto">
      <div className="faixa grid gap-x-16 gap-y-12 py-20 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <Degrau className="text-bordo" />
          <h2 className="titulo titulo-2 mt-7">No Centro de Araguari.</h2>
          <address className="mt-6 text-xl leading-snug not-italic">
            {endereco.rua}, {endereco.bairro}
            <br />
            {endereco.cidade}, {endereco.uf}, CEP {endereco.cep}
          </address>

          <ul className="mt-10">
            {canais.map((canal) => (
              <li key={canal.rotulo} className="border-t-2 border-black last:border-b-2">
                <a
                  href={canal.href}
                  target={canal.href.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener"
                  className="group flex items-center gap-5 py-5 transition-[padding,background-color,color] duration-300 hover:bg-bordo hover:px-5 hover:text-white"
                >
                  <Icon name={canal.icone} className="size-8 flex-none text-bordo group-hover:text-white" />
                  <span>
                    <span className="block text-sm">{canal.rotulo}</span>
                    <span className="block text-xl font-bold">{canal.valor}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mapa min-h-[26rem] bg-black/10 lg:col-span-7 lg:min-h-[38rem]">
          <iframe
            src={site.google.mapa}
            title="Mapa: Habttah Fit, R. Dr. Afrânio, 197, Centro, Araguari"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-[inherit] border-0"
          />
        </div>
      </div>
    </section>
  );
}
