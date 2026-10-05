"use client";

import { useEffect, useRef, useState } from "react";

// A hora só existe no navegador: no servidor devolve null para o HTML
// inicial ser igual para todo mundo, e atualiza a cada 30 s depois de montar.
export function useAgora() {
  const [agora, setAgora] = useState<Date | null>(null);

  useEffect(() => {
    setAgora(new Date());
    const id = window.setInterval(() => setAgora(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return agora;
}

// Fica true na primeira vez que o elemento entra na tela.
export function useNaTela<T extends Element>(margem = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visto) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true);
          obs.disconnect();
        }
      },
      { rootMargin: margem },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margem, visto]);

  return [ref, visto] as const;
}
