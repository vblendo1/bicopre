import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Shield, Lock, QrCode, Copy, Loader2, Check } from 'lucide-react';
import { createPixCharge } from '../services/paymentService';
import { PaymentStatus, PaymentData } from '../types';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when reopening
      setStatus('IDLE');
      setPaymentData(null);
    }
  }, [isOpen]);

  const handleStartPayment = async () => {
    setStatus('LOADING');
    try {
      const data = await createPixCharge();
      setPaymentData(data);
      setStatus('WAITING_PAYMENT');
    } catch (error) {
      setStatus('ERROR');
    }
  };

  const handleCopyPix = () => {
    if (paymentData?.copyPasteCode) {
      navigator.clipboard.writeText(paymentData.copyPasteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSimulateApproval = () => {
    setStatus('APPROVED');
    setTimeout(() => {
      onUpgradeSuccess();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-brand-card border border-brand-yellow w-full max-w-2xl rounded-2xl relative shadow-[0_0_100px_rgba(255,215,0,0.15)] my-8 flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-textGray hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {status === 'IDLE' && (
          <div className="p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-brand-yellow" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2">DESBLOQUEIE O <span className="text-brand-yellow">BICO PREMIUM</span></h2>
            <p className="text-brand-textGray mb-8">Pare de catar migalhas. Entre para a elite que fatura de verdade.</p>

            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <div className="space-y-3 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                <h3 className="text-white font-bold border-b border-brand-gray pb-2 mb-3">Membro Free (Você)</h3>
                <div className="flex items-center gap-2 text-brand-textGray text-sm">
                  <CheckCircle size={14} /> Acesso limitado a bicos simples
                </div>
                <div className="flex items-center gap-2 text-brand-textGray text-sm">
                  <CheckCircle size={14} /> 5 créditos de pesquisa/mês
                </div>
                <div className="flex items-center gap-2 text-brand-textGray text-sm line-through opacity-40">
                  <Lock size={14} /> Acesso aos Guias Black
                </div>
                <div className="flex items-center gap-2 text-brand-textGray text-sm line-through opacity-40">
                  <Lock size={14} /> Oportunidades Ocultas
                </div>
              </div>

              <div className="space-y-3 bg-brand-yellow/5 p-4 rounded-xl border border-brand-yellow/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-yellow/5 animate-pulse-slow pointer-events-none"></div>
                <h3 className="text-brand-yellow font-bold border-b border-brand-yellow/20 pb-2 mb-3 flex items-center gap-2">
                  Membro VIP 👑
                </h3>
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <CheckCircle size={14} className="text-brand-yellow" /> Acesso ILIMITADO a tudo
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <CheckCircle size={14} className="text-brand-yellow" /> Guias Black (R$ 2k+/mês)
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <CheckCircle size={14} className="text-brand-yellow" /> Acesso às Melhores Oportunidades
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <CheckCircle size={14} className="text-brand-yellow" /> Comunidade Secreta
                </div>
              </div>
            </div>

            <button 
              onClick={handleStartPayment}
              className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-black font-black text-xl py-4 rounded-xl shadow-lg shadow-brand-yellow/20 transform transition hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              QUERO SER VIP AGORA
            </button>
            
            <p className="mt-4 text-xs text-brand-textGray">
              🔒 Pagamento único de <span className="text-white font-bold">R$ 29,90</span>. Acesso vitalício ao MVP.
            </p>
          </div>
        )}

        {status === 'LOADING' && (
          <div className="p-12 flex flex-col items-center justify-center h-[500px]">
            <Loader2 size={48} className="text-brand-yellow animate-spin mb-4" />
            <p className="text-white font-bold">Gerando sua chave PIX exclusiva...</p>
          </div>
        )}

        {status === 'WAITING_PAYMENT' && paymentData && (
          <div className="p-8 text-center animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-white mb-2">Finalize seu Acesso VIP</h3>
            <p className="text-brand-textGray mb-6">Escaneie o QR Code ou copie o código abaixo para pagar com Pix.</p>

            <div className="bg-white p-4 rounded-xl mx-auto w-64 h-64 mb-6 flex items-center justify-center border-4 border-brand-yellow">
              {/* Placeholder QR Code Display */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500 text-xs text-center p-2 break-words overflow-hidden relative">
                  <QrCode size={120} className="text-black opacity-20 absolute" />
                  <span className="relative z-10 font-bold text-black">QR CODE MOCK<br/>(Use o botão simular abaixo)</span>
              </div>
            </div>

            <div className="bg-brand-dark border border-brand-gray p-3 rounded-lg flex items-center gap-2 mb-6 max-w-md mx-auto">
              <input 
                readOnly 
                value={paymentData.copyPasteCode} 
                className="bg-transparent text-brand-textGray text-xs flex-1 focus:outline-none truncate font-mono"
              />
              <button 
                onClick={handleCopyPix}
                className="text-brand-yellow hover:text-white transition-colors p-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <button className="w-full bg-transparent border border-brand-yellow text-brand-yellow font-bold py-3 rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                <Loader2 size={16} className="animate-spin" /> Aguardando confirmação do banco...
              </button>
              
              {/* DEV BUTTON FOR MVP TESTING */}
              <button 
                onClick={handleSimulateApproval}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition-colors uppercase tracking-wider"
              >
                [DEV] Simular Pagamento Aprovado
              </button>
            </div>
          </div>
        )}

        {status === 'APPROVED' && (
          <div className="p-12 flex flex-col items-center justify-center h-[500px] animate-in zoom-in duration-500">
            <div className="bg-green-500 rounded-full p-4 mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
              <Check size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">PAGAMENTO APROVADO!</h2>
            <p className="text-brand-textGray text-lg">Bem-vindo à elite.</p>
            <p className="text-brand-yellow mt-4 font-bold animate-pulse">Desbloqueando recursos...</p>
          </div>
        )}
      </div>
    </div>
  );
};