import React, { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, Clock, ExternalLink, Loader2, Lock, Briefcase, MapPin, Search } from 'lucide-react';
import { generateOpportunities } from '../services/geminiService';
import { GeneratedOpportunity } from '../types';

interface OpportunityFeedProps {
  isVip: boolean;
  onOpenVip: () => void;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({ isVip, onOpenVip }) => {
  const [opportunities, setOpportunities] = useState<GeneratedOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [city, setCity] = useState('');
  const [activeCity, setActiveCity] = useState('');

  // If not VIP, we show first 3 unlocked, and next 3 locked.
  // If VIP, all are unlocked.
  const loadOpportunities = async (isNewSearch = false) => {
    setLoading(true);
    
    // If searching a new city, clear current list to show "fresh" results
    if (isNewSearch) {
      setOpportunities([]);
    }

    // Always fetch a batch of 6 to show the "potential" content
    const newOps = await generateOpportunities(6, activeCity);
    
    setOpportunities(prev => isNewSearch ? newOps : [...prev, ...newOps]);
    setLoading(false);
  };

  useEffect(() => {
    if (!initialized) {
      loadOpportunities();
      setInitialized(true);
    }
  }, [initialized]);

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setActiveCity(city);
    // Trigger load with new city
    setTimeout(() => loadOpportunities(true), 100);
  };

  const getPlatformColor = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('workana')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (p.includes('99')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    if (p.includes('ninja') || p.includes('infojobs')) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (p.includes('facebook') || p.includes('grupo')) return 'text-blue-600 bg-blue-600/10 border-blue-600/20';
    return 'text-gray-300 bg-gray-500/10 border-gray-500/20';
  };

  return (
    <section id="opportunities-feed" className="w-full max-w-6xl mx-auto px-4 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-brand-yellow">FEED DE VAGAS</span> {activeCity ? `EM ${activeCity.toUpperCase()}` : 'AO VIVO'}
          </h3>
          <p className="text-brand-textGray text-sm">
            {activeCity 
              ? `Monitorando vagas presenciais e notícias em ${activeCity}...` 
              : 'Bicos simples disponíveis para execução imediata.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <form onSubmit={handleCitySearch} className="relative flex-1 md:w-64">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textGray" />
            <input 
              type="text" 
              placeholder="Sua cidade (ex: São Paulo)" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-brand-card border border-brand-gray focus:border-brand-yellow text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-yellow hover:text-white">
              <Search size={14} />
            </button>
          </form>

          <button 
            onClick={() => loadOpportunities(false)} 
            disabled={loading}
            className="bg-brand-dark border border-brand-yellow/30 hover:border-brand-yellow text-brand-yellow px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {activeCity ? 'Atualizar Lista' : 'Carregar Mais'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opportunities.map((op, idx) => {
          // Logic: Lock every item after index 2 if user is NOT VIP
          const isLocked = !isVip && idx >= 3;

          return (
            <div key={idx} className={`bg-brand-card border border-brand-gray hover:border-brand-textGray/50 rounded-lg p-4 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards ${isLocked ? 'cursor-pointer' : ''}`} 
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={isLocked ? onOpenVip : undefined}
            >
              
              {/* BLUR OVERLAY FOR LOCKED ITEMS */}
              {isLocked && (
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-brand-dark/80 flex flex-col items-center justify-center text-center p-4 transition-colors">
                  <div className="bg-brand-yellow p-2 rounded-full mb-2 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                    <Lock size={20} className="text-black" />
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase mb-1">Vaga Exclusiva VIP</h4>
                  <p className="text-brand-textGray text-xs mb-3">Pagamento acima da média.</p>
                  <button className="bg-brand-yellow text-black text-[10px] font-black uppercase py-2 px-4 rounded hover:scale-105 transition-transform">
                    Liberar Vaga
                  </button>
                </div>
              )}

              <div className={isLocked ? 'opacity-20 pointer-events-none' : ''}>
                {/* Header: Platform & Time */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1 ${getPlatformColor(op.platform)}`}>
                    <Briefcase size={10} /> {op.platform}
                  </span>
                  <span className="text-brand-textGray text-[10px] flex items-center gap-1">
                    <Clock size={10} /> {op.postedAt}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-brand-yellow transition-colors line-clamp-2">
                  {op.title}
                </h4>
                
                <p className="text-xs text-brand-textGray mb-4 line-clamp-3">
                  {op.description}
                </p>

                <div className="mt-auto pt-3 border-t border-brand-gray/50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-brand-textGray uppercase font-bold">Pagamento</span>
                      <span className="text-green-400 font-mono font-bold text-sm">{op.price}</span>
                   </div>
                   
                   <button className="bg-brand-gray hover:bg-white hover:text-black text-white text-xs font-bold py-1.5 px-3 rounded transition-colors flex items-center gap-1">
                     Candidatar <ExternalLink size={12} />
                   </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Loading Placeholders */}
        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={`skel-${i}`} className="bg-brand-card border border-brand-gray rounded-lg p-4 h-[200px] animate-pulse">
                <div className="flex justify-between mb-4">
                   <div className="h-4 bg-brand-gray rounded w-1/3"></div>
                   <div className="h-3 bg-brand-gray rounded w-1/6"></div>
                </div>
                <div className="h-5 bg-brand-gray rounded w-3/4 mb-2"></div>
                <div className="h-16 bg-brand-gray/50 rounded mb-4"></div>
                <div className="mt-auto h-8 bg-brand-gray/30 rounded"></div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};