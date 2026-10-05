"use client";

import { useNaTela } from "@/lib/hooks";

// As duas barras desencontradas do H da marca. Marcam o começo de cada seção
// e se encaixam quando a seção entra na tela.
export function Degrau({ className = "" }: { className?: string }) {
  const [ref, visto] = useNaTela<HTMLSpanElement>();
  return <span ref={ref} aria-hidden="true" data-visto={visto} className={`degrau ${className}`} />;
}
