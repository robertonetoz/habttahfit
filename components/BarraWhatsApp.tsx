"use client";

import { useEffect, useState } from "react";
import { mensagens, whatsapp } from "@/lib/site";
import { Icon } from "./Icon";

// No celular, o botão de conversa acompanha a rolagem depois do hero.
export function BarraWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.7);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div
      inert={!visivel}
      className={`fixed inset-x-0 bottom-0 z-20 bg-white p-2.5 shadow-[0_-1px_0_rgb(0_0_0/0.15)] transition-transform duration-300 lg:hidden ${
        visivel ? "" : "translate-y-full"
      }`}
    >
      <a
        href={whatsapp(mensagens.promo)}
        target="_blank"
        rel="noopener"
        className="botao w-full bg-bordo text-white"
      >
        <Icon name="conversa" />
        Quero começar por R$ 9,90
      </a>
    </div>
  );
}
