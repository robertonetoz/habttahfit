import { Avaliacoes } from "@/components/Avaliacoes";
import { BarraWhatsApp } from "@/components/BarraWhatsApp";
import { Contato } from "@/components/Contato";
import { Estrutura } from "@/components/Estrutura";
import { Footer } from "@/components/Footer";
import { Galeria } from "@/components/Galeria";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Horarios } from "@/components/Horarios";
import { Modalidades } from "@/components/Modalidades";
import { Outubro } from "@/components/Outubro";
import { PrimeiroTreino } from "@/components/PrimeiroTreino";

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Outubro />
        <Estrutura />
        <Modalidades />
        <Galeria />
        <PrimeiroTreino />
        <Horarios />
        <Avaliacoes />
        <Contato />
      </main>
      <Footer />
      <BarraWhatsApp />
    </>
  );
}
