import React from 'react';
import { X, CheckCircle, Shield, Lock } from 'lucide-react';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-brand-card border border-brand-yellow w-full max-w-2xl rounded-2xl relative shadow-[0_0_100px_rgba(255,215,0,0.15)] my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-textGray hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-brand-yellow" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-2">DESBLOQUEIE O <span className="text-brand-yellow">BICO PREMIUM</span></h2>
          <p className="text-brand-textGray mb-8">Pare de catar migalhas. Entre para a elite que fatura de verdade.</p>

          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            <div className="space-y-3">
              <h3 className="text-white font-bold border-b border-brand-gray pb-2 mb-3">Membro Free (Você)</h3>
              <div className="flex items-center gap-2 text-brand-textGray text-sm opacity-60">
                <CheckCircle size={14} /> Acesso limitado a bicos simples
              </div>
              <div className="flex items-center gap-2 text-brand-textGray text-sm opacity-60">
                <CheckCircle size={14} /> 5 créditos de pesquisa/mês
              </div>
              <div className="flex items-center gap-2 text-brand-textGray text-sm line-through opacity-40">
                <Lock size={14} /> Acesso aos Guias Black
              </div>
              <div className="flex items-center gap-2 text-brand-textGray text-sm line-through opacity-40">
                <Lock size={14} /> Calculadora de Lucro Real
              </div>
            </div>

            <div className="space-y-3 bg-brand-yellow/5 p-4 rounded-xl border border-brand-yellow/20">
              <h3 className="text-brand-yellow font-bold border-b border-brand-yellow/20 pb-2 mb-3">Membro VIP 👑</h3>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle size={14} className="text-brand-yellow" /> Acesso ILIMITADO a tudo
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle size={14} className="text-brand-yellow" /> Guias Black (R$ 2k+/mês)
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle size={14} className="text-brand-yellow" /> Suporte Prioritário
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle size={14} className="text-brand-yellow" /> Acesso à Comunidade Secreta
              </div>
            </div>
          </div>

          <button className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-black font-black text-xl py-4 rounded-xl shadow-lg shadow-brand-yellow/20 transform transition hover:-translate-y-1">
            QUERO SER VIP AGORA
            <span className="block text-xs font-normal mt-1 opacity-80">Apenas R$ 29,90/mês - Cancele quando quiser</span>
          </button>
          
          <p className="mt-4 text-xs text-brand-textGray">
            🔒 Pagamento 100% seguro. Garantia de 7 dias.
          </p>
        </div>
      </div>
    </div>
  );
};