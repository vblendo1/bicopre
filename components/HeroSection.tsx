import React from 'react';
import { MessageSquare } from 'lucide-react';

interface HeroSectionProps {
  onActivate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onActivate }) => {
  return (
    <section className="w-full max-w-6xl mx-auto mt-8 mb-12 px-4">
      <div className="border border-brand-yellow/30 bg-gradient-to-b from-brand-card to-brand-dark rounded-2xl p-10 text-center relative overflow-hidden group">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-brand-yellow drop-shadow-lg relative z-10 uppercase">
          A Máquina de Fazer Grana no Seu Bolso
        </h2>
        <p className="text-brand-textGray text-lg max-w-2xl mx-auto mb-8 relative z-10">
          Chega de perder tempo. Aqui você encontra os atalhos, as ferramentas e as informações que os outros não te contam para fazer dinheiro RÁPIDO.
        </p>

        <button 
          onClick={onActivate}
          className="relative z-10 bg-brand-yellow hover:bg-brand-yellowHover text-black text-lg font-black py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-center gap-3 mx-auto animate-pulse-slow"
        >
          <MessageSquare size={24} fill="black" />
          ATIVAR MODO LUCRATIVO
        </button>
      </div>
    </section>
  );
};