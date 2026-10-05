import { horarios, type Turno } from "./site";

// A academia fica em Araguari: todo cálculo de horário usa o fuso de Brasília,
// não o do aparelho de quem está visitando o site.
const FUSO = "America/Sao_Paulo";
const DIAS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const relogio = new Intl.DateTimeFormat("en-US", {
  timeZone: FUSO,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function agoraEmAraguari(data: Date) {
  const partes = relogio.formatToParts(data);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dia = DIAS.indexOf(valor("weekday"));
  const hora = Number(valor("hour")) + Number(valor("minute")) / 60;
  return { dia, hora };
}

export function turnoDoDia(dia: number): Turno {
  return horarios.find((t) => t.dias.includes(dia)) ?? horarios[0];
}

export type Status = {
  aberta: boolean;
  texto: string;
  turno: Turno;
  hora: number;
};

export function statusAgora(data: Date): Status {
  const { dia, hora } = agoraEmAraguari(data);
  const hoje = turnoDoDia(dia);

  if (hora >= hoje.abre && hora < hoje.fecha) {
    return { aberta: true, texto: `Aberta agora, fecha às ${hoje.fechaTexto}`, turno: hoje, hora };
  }
  if (hora < hoje.abre) {
    return { aberta: false, texto: `Fechada, abre hoje às ${hoje.abreTexto}`, turno: hoje, hora };
  }
  const amanha = turnoDoDia((dia + 1) % 7);
  return { aberta: false, texto: `Fechada, abre amanhã às ${amanha.abreTexto}`, turno: hoje, hora };
}

const diaCivil = new Intl.DateTimeFormat("en-CA", {
  timeZone: FUSO,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Dias de calendário entre agora e uma data, contados em Araguari.
export function diasAte(agora: Date, alvo: string) {
  const inicio = Date.parse(`${diaCivil.format(agora)}T00:00:00Z`);
  const fim = Date.parse(`${diaCivil.format(new Date(alvo))}T00:00:00Z`);
  return Math.round((fim - inicio) / 86_400_000);
}
