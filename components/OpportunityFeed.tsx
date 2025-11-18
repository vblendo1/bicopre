import React, { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, Globe, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { generateOpportunities } from '../services/geminiService';
import { GeneratedOpportunity } from '../types';

export const OpportunityFeed: React.FC = () => {
  const [opportunities, setOpportunities] = useState<GeneratedOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const loadOpportunities = async () => {
    setLoading(true);
    const newOps = await generateOpportunities(3);
    setOpportunities(prev => [...prev, ...newOps]);
    setLoading(false);
  };

  useEffect(() => {
    if (!initialized) {
      loadOpportunities();
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <section id="opportunities-feed" className="w-full max-w-6xl mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-brand-yellow">OPORTUNIDADES</span> EM TEMPO REAL
          </h3>
          <p className="text-brand-textGray text-sm">O algoritmo está minerando minas de ouro...</p>
        </div>
        <button 
          onClick={() => loadOpportunities()} 
          disabled={loading}
          className="bg-brand-dark border border-brand-yellow/30 hover:border-brand-yellow text-brand-yellow px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          Minerar Mais
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opportunities.map((op, idx) => (
          <div key={idx} className="bg-brand-card border border-brand-gray hover:border-brand-yellow/40 rounded-xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${idx * 100}ms` }}>
            
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-yellow/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-brand-yellow/10"></div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  op.category === 'Online' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                }`}>
                  {op.category === 'Online' ? <Globe size={10} className="inline mr-1"/> : <MapPin size={10} className="inline mr-1"/>}
                  {op.category}
                </span>
                <span className="text-brand-textGray text-xs font-medium border border-brand-gray px-2 py-0.5 rounded-full">
                  {op.difficulty}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-yellow transition-colors">
                {op.title}
              </h4>
              
              <p className="text-sm text-brand-textGray mb-4 line-clamp-3">
                {op.description}
              </p>
            </div>

            <div>
              <div className="bg-black/40 rounded-lg p-3 mb-4 border border-white/5">
                <div className="flex items-center gap-2 text-brand-yellow font-bold text-sm mb-1">
                  <DollarSign size={14} /> Potencial:
                </div>
                <div className="text-white text-sm font-mono">{op.estimatedEarnings}</div>
              </div>

              <div className="text-xs text-brand-textGray mb-2 font-bold uppercase tracking-wide">Primeiro Passo:</div>
              <div className="text-xs text-white bg-brand-gray/50 p-2 rounded border-l-2 border-brand-yellow italic">
                "{op.actionStep}"
              </div>

              <button className="w-full mt-4 bg-brand-yellow text-black font-bold py-2 rounded hover:bg-brand-yellowHover transition-colors text-sm flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Ver Guia Completo <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
        
        {/* Loading Placeholder Cards if loading and already have some items, or initial load */}
        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={`skel-${i}`} className="bg-brand-card border border-brand-gray rounded-xl p-5 h-[350px] animate-pulse">
                <div className="h-4 bg-brand-gray rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-brand-gray rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-brand-gray/50 rounded mb-4"></div>
                <div className="mt-auto h-12 bg-brand-gray/30 rounded"></div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};