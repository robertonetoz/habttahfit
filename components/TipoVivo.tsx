"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Props = {
  // Cada linha é uma lista de trechos. Os trechos ficam lado a lado em telas
  // grandes e, com `empilha`, viram linhas próprias no celular.
  linhas: string[][];
  className?: string;
  min?: number;
  max?: number;
  // Passa uma onda pelo texto assim que a página carrega.
  entrada?: boolean;
  atraso?: number;
  empilha?: boolean;
  mascara?: boolean;
};

// Texto que "flexiona": cada letra alarga conforme o cursor chega perto,
// usando o eixo de largura da fonte. É puramente visual; quem usa leitor de
// tela recebe o texto por outro elemento, então este vai com aria-hidden.
export function TipoVivo({
  linhas,
  className = "",
  min = 62,
  max = 104,
  entrada = false,
  atraso = 0,
  empilha = false,
  mascara = false,
}: Props) {
  const raiz = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letras = Array.from(el.querySelectorAll<HTMLElement>("[data-letra]"));
    const atual = letras.map(() => min);
    const DURACAO = 1400;

    let cursor: { x: number; y: number } | null = null;
    let inicio: number | null = entrada ? performance.now() + atraso : null;
    let quadro = 0;
    let rodando = false;

    const passo = (t: number) => {
      const caixa = el.getBoundingClientRect();
      const raio = parseFloat(getComputedStyle(el).fontSize) * 1.1;

      let alvoX: number | null = null;
      let alvoY = 0;
      let usaY = true;

      if (inicio !== null) {
        const p = (t - inicio) / DURACAO;
        if (p >= 1) inicio = null;
        else if (p >= 0) {
          // A onda de entrada varre da esquerda para a direita, em todas as linhas.
          alvoX = caixa.left - raio + p * (caixa.width + raio * 2);
          usaY = false;
        }
      }
      if (alvoX === null && inicio === null && cursor) {
        alvoX = cursor.x;
        alvoY = cursor.y;
      }

      const centros = letras.map((letra) => {
        const r = letra.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2];
      });

      let vivo = inicio !== null;
      letras.forEach((letra, i) => {
        let alvo = min;
        if (alvoX !== null) {
          const dx = centros[i][0] - alvoX;
          const dy = usaY ? centros[i][1] - alvoY : 0;
          alvo = min + (max - min) * Math.exp(-(dx * dx + dy * dy) / (raio * raio));
        }
        atual[i] += (alvo - atual[i]) * 0.16;
        if (Math.abs(alvo - atual[i]) > 0.15) vivo = true;
        else atual[i] = alvo;
        letra.style.fontVariationSettings = `"wdth" ${atual[i].toFixed(1)}`;
      });

      if (vivo) quadro = requestAnimationFrame(passo);
      else rodando = false;
    };

    const acorda = () => {
      if (rodando) return;
      rodando = true;
      quadro = requestAnimationFrame(passo);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const caixa = el.getBoundingClientRect();
      const folga = caixa.height * 0.6 + 80;
      const perto =
        e.clientX > caixa.left - folga &&
        e.clientX < caixa.right + folga &&
        e.clientY > caixa.top - folga &&
        e.clientY < caixa.bottom + folga;
      if (!perto && !cursor) return;
      cursor = perto ? { x: e.clientX, y: e.clientY } : null;
      acorda();
    };

    window.addEventListener("pointermove", move, { passive: true });
    if (entrada) acorda();

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(quadro);
    };
  }, [entrada, atraso, min, max]);

  return (
    <span ref={raiz} aria-hidden="true" className={`block ${className}`}>
      {linhas.map((linha, i) => (
        <span
          key={i}
          className={mascara ? "linha-mascara" : "block"}
          style={{ "--atraso": `${i * 0.12}s` } as CSSProperties}
        >
          <span className="whitespace-nowrap">
            {linha.map((trecho, j) => (
              <span key={j} className={empilha ? "block lg:inline" : "inline"}>
                {j > 0 && <span className={empilha ? "hidden lg:inline" : "inline"}>{" "}</span>}
                {Array.from(trecho).map((letra, k) => (
                  <span key={k} data-letra>
                    {letra === " " ? " " : letra}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
