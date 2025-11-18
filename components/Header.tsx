import React, { useState, useEffect } from 'react';
import { Zap, BarChart2, Calculator, BookOpen, Users, Shield, Crown, CheckCircle } from 'lucide-react';
import { UserTier } from '../types';

interface HeaderProps {
  onOpenVip: () => void;
  userTier?: UserTier;
  onSecretTrigger?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVip, userTier = UserTier.FREE, onSecretTrigger }) => {
  const isVip = userTier === UserTier.VIP;
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset clicks if user stops clicking for 2 seconds
  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    e.stopPropagation();
    
    // Visual Feedback
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);

    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        // Trigger immediately and reset
        if (onSecretTrigger) onSecretTrigger();
        return 0;
      }
      return newCount;
    });
  };

  return (
    <header className="w-full bg-brand-dark border-b border-brand-gray/50 py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      <div 
        className={`flex items-center gap-2 cursor-pointer select-none transition-transform duration-75 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100'}`}
        onMouseDown={(e) => e.preventDefault()} // Double check to prevent selection
        onClick={handleLogoClick}
        title="Bico Premium (Clique 5x para Admin)"
      >
        <div className="bg-brand-yellow p-1.5 rounded-full">
          <Zap size={20} className="text-black fill-current" />
        </div>
        <h1 className="text-xl font-black tracking-wider text-white">BICO <span className="text-brand-yellow">PREMIUM</span></h1>
      </div>

      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-textGray">
        <a href="#" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
          <Zap size={16} /> Ganhe Agora
        </a>
        <a href="#" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
          <BarChart2 size={16} /> Oportunidades
        </a>
        <a href="#" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
          <Calculator size={16} /> Calculadora
        </a>
        <a href="#" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
          <BookOpen size={16} /> Guias Black
        </a>
        <a href="#" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
          <Users size={16} /> Indique e Ganhe
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          {isVip ? (
            <>
              <span className="text-xs font-bold text-brand-yellow flex items-center gap-1"><Crown size={10}/> MEMBRO VIP</span>
              <span className="text-[10px] text-brand-textGray">Acesso Total</span>
            </>
          ) : (
            <>
              <span className="text-xs font-bold text-white">MEMBRO FREE</span>
              <span className="text-[10px] text-brand-textGray">5 créditos</span>
            </>
          )}
        </div>
        
        {!isVip ? (
          <button 
            onClick={onOpenVip}
            className="bg-brand-yellow hover:bg-brand-yellowHover text-black font-bold py-2 px-5 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          >
            <Shield size={18} />
            Seja VIP
          </button>
        ) : (
           <div className="bg-brand-card border border-brand-yellow/30 text-brand-yellow font-bold py-2 px-5 rounded-lg flex items-center gap-2">
             <CheckCircle size={18} />
             Ativo
           </div>
        )}
      </div>
    </header>
  );
};