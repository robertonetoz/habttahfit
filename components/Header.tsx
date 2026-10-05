"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mensagens, navegacao, whatsapp } from "@/lib/site";
import { Icon } from "./Icon";
import { Status } from "./Status";

export function Header() {
  const [solido, setSolido] = useState(false);
  const [aberto, setAberto] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoRolar = () => setSolido(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = aberto ? "hidden" : "";
    if (!aberto) return;
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const claro = solido && !aberto;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          claro ? "bg-white text-black shadow-[0_1px_0_rgb(0_0_0/0.12)]" : "text-white"
        }`}
      >
        <div className="faixa flex h-18 items-center gap-6">
          <a href="#topo" className="flex items-center gap-3" onClick={() => setAberto(false)}>
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              priority
              className={`size-11 transition-[filter] duration-300 ${claro ? "" : "brightness-0 invert"}`}
            />
            <span className="titulo text-[1.7rem] leading-none whitespace-nowrap">Habttah Fit</span>
          </a>

          <nav aria-label="Seções" className="ml-auto hidden xl:block">
            <ul className="flex gap-5 text-[0.95rem] font-semibold xl:gap-7">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="underline-offset-8 decoration-2 hover:underline"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <span className="hidden text-sm font-semibold whitespace-nowrap xl:block">
            <Status />
          </span>

          <a
            href={whatsapp(mensagens.comecar)}
            target="_blank"
            rel="noopener"
            className={`botao ml-auto hidden min-h-11! px-5! py-2! text-[0.95rem] lg:inline-flex xl:ml-0 ${
              claro ? "bg-bordo text-white hover:bg-black" : "bg-white text-bordo hover:bg-black hover:text-white"
            }`}
          >
            <Icon name="whatsapp" />
            WhatsApp
          </a>

          <button
            type="button"
            aria-expanded={aberto}
            aria-controls="menu"
            onClick={() => setAberto((v) => !v)}
            className="-mr-2 ml-auto grid size-12 place-items-center lg:ml-0 xl:hidden"
          >
            <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
            <Icon name={aberto ? "fechar" : "menu"} className="size-7" />
          </button>
        </div>
      </header>

      <div
        id="menu"
        ref={menu}
        inert={!aberto}
        className={`fixed inset-0 z-30 flex flex-col overflow-y-auto bg-bordo px-5 pt-24 pb-8 text-white transition-[opacity,visibility] duration-300 xl:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Seções">
          <ul>
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="titulo block py-1.5 text-[3.4rem]"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-8">
          <Status className="font-semibold" />
          <a
            href={whatsapp(mensagens.comecar)}
            target="_blank"
            rel="noopener"
            className="botao mt-5 w-full bg-white text-bordo"
          >
            <Icon name="whatsapp" />
            Falar com a equipe no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
