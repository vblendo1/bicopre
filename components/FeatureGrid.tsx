import React from 'react';
import { Zap, TrendingUp, Book, Coins, Lock } from 'lucide-react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, isVip, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-brand-card border border-brand-gray hover:border-brand-yellow/50 p-6 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
    >
      {isVip && (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-red-900/50 shadow-lg z-10">
          <Lock size={10} /> VIP
        </div>
      )}
      
      <div className="mb-4 text-brand-yellow group-hover:text-white transition-colors">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-yellow transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-brand-textGray leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

interface FeatureGridProps {
  onFeatureClick: (feature: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onFeatureClick }) => {
  const features = [
    {
      title: "Ganhe Agora",
      description: "Métodos testados para fazer grana HOJE. Para quem tem pressa e não aceita desculpas.",
      icon: <Zap size={32} />,
      isVip: true,
      id: "win_now"
    },
    {
      title: "Oportunidades de Elite",
      description: "Uma lista filtrada de bicos que pagam bem de verdade. Esqueça o salário mínimo.",
      icon: <TrendingUp size={32} />,
      isVip: false, // Teaser feature
      id: "elite_ops"
    },
    {
      title: "Guias Black",
      description: "O passo a passo mastigado dos métodos mais quentes. É só copiar, colar e lucrar.",
      icon: <Book size={32} />,
      isVip: true,
      id: "black_guides"
    },
    {
      title: "Calculadora de Grana",
      description: "Descubra o quanto de dinheiro você está deixando na mesa e como virar o jogo.",
      icon: <Coins size={32} />,
      isVip: true,
      id: "calculator"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 pb-12">
      <h3 className="text-2xl font-bold text-center mb-8 text-white">Seu Arsenal para Fazer Dinheiro</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <FeatureCard 
            key={f.title}
            {...f}
            onClick={() => onFeatureClick(f.id)}
          />
        ))}
      </div>

      {/* Forbidden Zone Banner */}
      <div className="mt-8 bg-brand-card/50 border border-brand-gray rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/5 to-transparent opacity-20"></div>
        <h3 className="text-brand-yellow font-bold text-xl mb-2 flex items-center justify-center gap-2">
          Comunidade VIP: Acesso Proibido
        </h3>
        <p className="text-brand-textGray text-sm mb-6">
          Alertas em tempo real e dicas que não postamos em nenhum outro lugar. Só para a elite.
        </p>
        <button onClick={() => onFeatureClick('community')} className="bg-brand-gray hover:bg-brand-gray/80 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto border border-gray-600">
          <Lock size={14} /> Apenas para Membros VIP
        </button>
      </div>
    </section>
  );
};