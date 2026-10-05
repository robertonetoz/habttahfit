"use client";

import { useAgora } from "@/lib/hooks";
import { statusAgora } from "@/lib/tempo";

// "Aberta agora, fecha às 22h", calculado na hora pelo horário de Araguari.
export function Status({ className = "" }: { className?: string }) {
  const agora = useAgora();
  const status = agora ? statusAgora(agora) : null;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`size-2.5 flex-none rounded-full ${
          status?.aberta ? "ponto-aberta bg-aberta" : "border-2 border-current"
        }`}
      />
      {status?.texto ?? "Seg a sex, 05h30 às 22h"}
    </span>
  );
}
