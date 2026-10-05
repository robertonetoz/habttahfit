import type { ReactNode } from "react";

// Ícones próprios da Habttah: traço grosso e cantos vivos, no mesmo desenho
// das hastes do H da marca. Grade de 48 px.

const solido = { fill: "currentColor", stroke: "none" } as const;

const desenhos = {
  halter: (
    <>
      <path d="M3 24h42" />
      <rect x="8" y="11" width="7" height="26" {...solido} />
      <rect x="33" y="11" width="7" height="26" {...solido} />
      <rect x="17" y="16" width="3" height="16" {...solido} />
      <rect x="28" y="16" width="3" height="16" {...solido} />
    </>
  ),
  bike: (
    <>
      <circle cx="15" cy="31" r="11" />
      <circle cx="15" cy="31" r="2.5" {...solido} />
      <path d="M15 31 31 15M31 21V8M25 8h13M31 17l8 25M32 42h13" />
    </>
  ),
  pulso: <path d="M2 26h11l5-15 7 28 6-19 3 6h12" />,
  danca: (
    <>
      <circle cx="26" cy="8" r="4.5" {...solido} />
      <path d="M9 13l15 6 13-9M24 19l-3 12-10 12M21 31l12 4-2 10" />
    </>
  ),
  grupo: (
    <>
      <circle cx="24" cy="11" r="5.5" {...solido} />
      <circle cx="9" cy="17" r="4" {...solido} />
      <circle cx="39" cy="17" r="4" {...solido} />
      <path d="M14 44V30h20v14M3 44V28h6M45 44V28h-6" />
    </>
  ),
  rack: (
    <>
      <path d="M12 4v40M36 4v40M2 17h44M5 44h14M29 44h14" />
      <rect x="4" y="10" width="5" height="14" {...solido} />
      <rect x="39" y="10" width="5" height="14" {...solido} />
    </>
  ),
  degraus: <path d="M3 42h13V30h12V18h12V6h6" />,
  cronometro: (
    <>
      <circle cx="24" cy="28" r="15" />
      <path d="M19 5h10M24 5v8M24 29V19M24 28l8 5" />
    </>
  ),
  pin: (
    <>
      <path d="M24 45S9 30 9 19a15 15 0 0 1 30 0c0 11-15 26-15 26Z" />
      <rect x="20" y="15" width="8" height="8" {...solido} />
    </>
  ),
  relogio: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M24 11v13l9 6" />
    </>
  ),
  telefone: (
    <>
      <rect x="13" y="4" width="22" height="40" />
      <path d="M20 37h8" />
    </>
  ),
  conversa: <path d="M5 7h38v27H23l-11 9v-9H5Z" />,
  camera: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="9" />
      <circle cx="24" cy="24" r="8" />
      <rect x="32" y="11" width="4.5" height="4.5" {...solido} />
    </>
  ),
  estrela: (
    <path
      d="M24 3l6.5 13.2 14.5 2.1-10.5 10.2 2.5 14.5L24 36.2 11 43l2.5-14.5L3 18.3l14.5-2.1Z"
      {...solido}
    />
  ),
  catraca: (
    <>
      <circle cx="24" cy="24" r="5.5" {...solido} />
      <path d="M24 24V3M24 24l18.2 10.5M24 24 5.8 34.5" />
    </>
  ),
  rota: <path d="M24 5 41 43 24 34 7 43Z" />,
  mais: <path d="M24 6v36M6 24h36" />,
  menu: <path d="M4 15h40M4 33h26" />,
  fechar: <path d="M8 8l32 32M40 8 8 40" />,
  ampliar: <path d="M28 6h14v14M20 42H6V28M42 6 27 21M6 42l15-15" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof desenhos;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {desenhos[name]}
    </svg>
  );
}
