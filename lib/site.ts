// Todo o conteúdo do site fica aqui. Para trocar um texto, telefone, horário
// ou foto, edite este arquivo: os componentes só leem o que está abaixo.

import type { IconName } from "@/components/Icon";

export const site = {
  nome: "Habttah Fit",
  slogan: "Mais que academia, um estilo de vida.",
  descricao:
    "Academia no Centro de Araguari, MG. Musculação, Bike Indoor, Fit Dance, cardio e aulas coletivas, com estrutura, método e acompanhamento.",
  url: "https://habttahfit.com.br",
  endereco: {
    rua: "R. Dr. Afrânio, 197",
    bairro: "Centro",
    cidade: "Araguari",
    uf: "MG",
    cep: "38440-072",
  },
  telefone: { texto: "(34) 99167-8804", href: "tel:+5534991678804" },
  whatsapp: { numero: "5534999962969", texto: "(34) 99996-2969" },
  instagram: {
    usuario: "@habttahfit",
    href: "https://www.instagram.com/habttahfit/",
    seguidores: "8 mil",
  },
  google: {
    nota: "4,9",
    notaNumero: 4.9,
    avaliacoes: 59,
    href: "https://www.google.com/maps/search/?api=1&query=Habttah+Fit+Araguari+MG",
    rota: "https://www.google.com/maps/dir/?api=1&destination=Habttah+Fit%2C+R.+Dr.+Afr%C3%A2nio%2C+197+-+Centro%2C+Araguari+-+MG",
    mapa: "https://www.google.com/maps?q=Habttah+Fit%2C+R.+Dr.+Afr%C3%A2nio%2C+197+-+Centro%2C+Araguari+-+MG&z=16&output=embed",
  },
} as const;

export function whatsapp(mensagem: string) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagens = {
  comecar: "Olá! Vi o site e quero começar a treinar na Habttah Fit.",
  promo:
    "Olá! Vi o site e quero começar na Habttah Fit com a 1ª mensalidade por R$ 9,90 no plano anual.",
  amigo: "Olá! Quero levar um amigo para treinar comigo na catraca liberada.",
  corrida: "Olá! Quero me inscrever na Corrida Esperança Rosa.",
  aulas: "Olá! Quero saber os horários das aulas coletivas da Habttah Fit.",
};

// ─── Horários ────────────────────────────────────────────────────────────────
// `dias` segue o padrão do JavaScript: 0 = domingo … 6 = sábado.
// `abre` e `fecha` são horas decimais (5.5 = 05h30).

export type Turno = {
  id: string;
  rotulo: string;
  dias: number[];
  abre: number;
  fecha: number;
  abreTexto: string;
  fechaTexto: string;
};

export const horarios: Turno[] = [
  {
    id: "semana",
    rotulo: "Segunda a sexta",
    dias: [1, 2, 3, 4, 5],
    abre: 5.5,
    fecha: 22,
    abreTexto: "05h30",
    fechaTexto: "22h",
  },
  {
    id: "sabado",
    rotulo: "Sábado",
    dias: [6],
    abre: 9,
    fecha: 14,
    abreTexto: "09h",
    fechaTexto: "14h",
  },
  {
    id: "domingo",
    rotulo: "Domingo e feriado",
    dias: [0],
    abre: 8,
    fecha: 12,
    abreTexto: "08h",
    fechaTexto: "12h",
  },
];

// ─── Outubro ─────────────────────────────────────────────────────────────────

export const promo = {
  preco: "9,90",
  // Último instante em que a oferta vale (horário de Brasília).
  termina: "2026-10-31T23:59:59-03:00",
  regra:
    "O valor de R$ 9,90 vale só para a primeira mensalidade, na contratação do plano anual. Da segunda em diante, a mensalidade segue o valor normal do plano. Consulte condições com a equipe.",
};

export type Evento = {
  id: string;
  quando: string;
  inicio: string;
  fim: string;
  titulo: string;
  texto: string;
  acao: { rotulo: string; mensagem: string };
};

export const agenda: Evento[] = [
  {
    id: "catraca",
    quando: "01 a 12/10",
    inicio: "2026-10-01T00:00:00-03:00",
    fim: "2026-10-12T23:59:59-03:00",
    titulo: "Catraca liberada",
    texto:
      "Traga um amigo que ainda não treinou na Habttah para treinar com você, sem pagar nada. Ele ainda concorre a 1 mês grátis de academia.",
    acao: { rotulo: "Avisar que vou levar um amigo", mensagem: mensagens.amigo },
  },
  {
    id: "corrida",
    quando: "25/10",
    inicio: "2026-10-25T00:00:00-03:00",
    fim: "2026-10-25T23:59:59-03:00",
    titulo: "Corrida Esperança Rosa",
    texto:
      "5 km de movimento e conexão no Outubro Rosa. Convide alguém especial, calce o tênis e venha correr com a gente. As inscrições são feitas na academia.",
    acao: { rotulo: "Perguntar sobre a inscrição", mensagem: mensagens.corrida },
  },
];

// ─── Estrutura, método e acompanhamento ──────────────────────────────────────

export const pilares: { icone: IconName; titulo: string; texto: string }[] = [
  {
    icone: "rack",
    titulo: "Estrutura",
    texto:
      "Aparelhos novos, uma área inteira de cardio e a sala de Bike Indoor recém-reformada. Espaço amplo, temperatura agradável e tudo no Centro, perto de onde você já passa.",
  },
  {
    icone: "degraus",
    titulo: "Método",
    texto:
      "Resultado não se constrói no improviso. Aqui o treino é feito com intenção, técnica e constância, um degrau de cada vez.",
  },
  {
    icone: "cronometro",
    titulo: "Acompanhamento",
    texto:
      "Da recepção que acolhe ao professor que orienta na sala, sempre tem alguém por perto. Pode perguntar, aprender e encontrar o seu ritmo.",
  },
];

// ─── Modalidades ─────────────────────────────────────────────────────────────

export type Modalidade = {
  id: string;
  nome: string;
  icone: IconName;
  texto: string;
  depoimento: { texto: string; autor: string };
};

export const modalidades: Modalidade[] = [
  {
    id: "musculacao",
    nome: "Musculação",
    icone: "halter",
    texto:
      "Sala completa, com aparelhos novos para trabalhar força, controle e qualidade de movimento. Tem professor por perto para ajustar a carga e a execução.",
    depoimento: {
      texto:
        "Ambiente acolhedor, com modalidades incríveis e ótimos profissionais na sala de musculação.",
      autor: "Larissa Gabriel Rodrigues",
    },
  },
  {
    id: "bike",
    nome: "Bike Indoor",
    icone: "bike",
    texto:
      "Sala nova, bikes novas. O espaço foi renovado em setembro para você entrar no ritmo, se desafiar e sentir a energia de pedalar junto.",
    depoimento: {
      texto: "Aulas coletivas ótimas, Spinning nota 10. Super indico.",
      autor: "Kely de Fátima Silva Sousa",
    },
  },
  {
    id: "fitdance",
    nome: "Fit Dance",
    icone: "danca",
    texto:
      "Dança, ritmo e turma animada. É cardio de verdade, só que você nem vê o tempo passar.",
    depoimento: {
      texto:
        "As aulas de Spinning e de fit dance são excelentes! Um show de profissionalismo e preparo!",
      autor: "Denise Morais",
    },
  },
  {
    id: "cardio",
    nome: "Cardio",
    icone: "pulso",
    texto:
      "Uma área dedicada só ao cardio, com equipamentos novos para aquecer, queimar ou fechar o treino.",
    depoimento: {
      texto:
        "Os equipamentos são ótimos, principalmente a área de cardio. Academia perto de tudo e muito boa para treinar!",
      autor: "Raquel F. Perin",
    },
  },
  {
    id: "coletivas",
    nome: "Aulas coletivas",
    icone: "grupo",
    texto:
      "Várias modalidades em grupo ao longo da semana. A grade atual você consulta com a equipe pelo WhatsApp.",
    depoimento: {
      texto:
        "Excelente academia, muito bem localizada, com várias modalidades de aulas coletivas e com excelentes profissionais.",
      autor: "Lurian Kesia",
    },
  },
];

// ─── Galeria ─────────────────────────────────────────────────────────────────
// Para publicar uma foto: salve o arquivo em /public/galeria e coloque o nome
// dele em `src` (ex.: src: "/galeria/fachada.jpg"). Enquanto `src` for null,
// o site mostra um espaço reservado com a legenda.

export type Foto = {
  id: string;
  legenda: string;
  alt: string;
  src: string | null;
  icone: IconName;
  // Tamanho do quadro no mosaico (em telas grandes).
  formato: "grande" | "alto" | "largo" | "quadrado";
};

export const galeria: Foto[] = [
  {
    id: "fachada",
    legenda: "Fachada",
    alt: "Fachada da Habttah Fit na Rua Dr. Afrânio, Centro de Araguari",
    src: null,
    icone: "pin",
    formato: "grande",
  },
  {
    id: "musculacao",
    legenda: "Sala de musculação",
    alt: "Aparelhos da sala de musculação",
    src: null,
    icone: "halter",
    formato: "alto",
  },
  {
    id: "pesos",
    legenda: "Pesos livres",
    alt: "Área de pesos livres com halteres e barras",
    src: null,
    icone: "rack",
    formato: "quadrado",
  },
  {
    id: "cardio",
    legenda: "Área de cardio",
    alt: "Esteiras e equipamentos da área de cardio",
    src: null,
    icone: "pulso",
    formato: "quadrado",
  },
  {
    id: "bike",
    legenda: "Sala de Bike Indoor",
    alt: "Bikes da nova sala de Bike Indoor",
    src: null,
    icone: "bike",
    formato: "largo",
  },
  {
    id: "maquinas",
    legenda: "Máquinas",
    alt: "Máquinas de musculação em detalhe",
    src: null,
    icone: "degraus",
    formato: "quadrado",
  },
  {
    id: "coletivas",
    legenda: "Aulas coletivas",
    alt: "Turma em aula coletiva",
    src: null,
    icone: "grupo",
    formato: "quadrado",
  },
];

// ─── Primeiro treino ─────────────────────────────────────────────────────────

export const duvidas: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Será que vou conseguir?",
    resposta:
      "Vai. Todo mundo que treina aqui teve um primeiro dia. Você começa no seu ritmo e evolui a partir dele, sem comparação com quem está ao lado.",
  },
  {
    pergunta: "Como uso os aparelhos?",
    resposta:
      "Perguntando. A equipe está na sala para mostrar a regulagem, o movimento e a carga de cada aparelho, quantas vezes você precisar.",
  },
  {
    pergunta: "Por onde eu começo?",
    resposta:
      "Mande uma mensagem ou passe na recepção. A gente apresenta a academia, entende o que você quer conquistar e orienta seus primeiros treinos.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "Em outubro, a 1ª mensalidade do plano anual sai por R$ 9,90. Os valores e as condições de cada plano você consulta com a equipe pelo WhatsApp.",
  },
  {
    pergunta: "Posso levar alguém comigo?",
    resposta:
      "Até 12/10 a catraca está liberada para convidados que ainda não treinaram na Habttah. Depois dessa data, fale com a equipe.",
  },
];

// ─── Avaliações do Google ────────────────────────────────────────────────────

export type Avaliacao = {
  autor: string;
  texto: string;
  guia?: boolean;
  destaque?: boolean;
};

export const avaliacoes: Avaliacao[] = [
  {
    autor: "Claudio Gustavo",
    texto: "A melhor academia da cidade. Excelentes profissionais.",
    destaque: true,
  },
  {
    autor: "Denise Morais",
    texto:
      "Lá tem os melhores e mais novos aparelhos, sem falar no material humano que é sempre cordial e prestativo, e as aulas de Spinning e de fit dance são excelentes! Um show de profissionalismo e preparo!",
  },
  {
    autor: "José Lucas Zezão",
    texto: "A melhor academia da região, super completa e o preço ótimo.",
    guia: true,
    destaque: true,
  },
  {
    autor: "Marco Antonio Guimarães",
    texto:
      "Uma academia diferente. Oferece muitas opções por uma mensalidade justa. Além dos excelentes instrutores. Num espaço e numa temperatura adequados. Ótima academia!",
    guia: true,
  },
  {
    autor: "Fernando",
    texto:
      "Sou de fora da cidade e tive toda atenção necessária. Recomendo. Academia top e funcionários atenciosos.",
    guia: true,
  },
  {
    autor: "João Batista",
    texto:
      "Melhor atendimento e estrutura de Araguari e região! Parabéns a todos envolvidos.",
    destaque: true,
  },
  {
    autor: "Raquel F. Perin",
    texto:
      "Excelente espaço. Os equipamentos são ótimos, principalmente a área de cardio. Academia perto de tudo e muito boa para treinar! Recomendo demais.",
  },
  {
    autor: "Larissa Gabriel Rodrigues",
    texto:
      "Ambiente acolhedor, com modalidades incríveis e ótimos profissionais na sala de musculação. Araguari só ganhou saúde com essa academia.",
  },
  {
    autor: "Lurian Kesia",
    texto:
      "Excelente academia, muito bem localizada, com várias modalidades de aulas coletivas e com excelentes profissionais.",
  },
];

export const navegacao = [
  { href: "#outubro", rotulo: "Outubro" },
  { href: "#estrutura", rotulo: "Estrutura" },
  { href: "#modalidades", rotulo: "Modalidades" },
  { href: "#galeria", rotulo: "Galeria" },
  { href: "#horarios", rotulo: "Horários" },
  { href: "#avaliacoes", rotulo: "Avaliações" },
  { href: "#contato", rotulo: "Contato" },
];
