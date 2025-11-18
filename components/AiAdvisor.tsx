import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Loader2, X } from 'lucide-react';
import { getMoneyMakingAdvice } from '../services/geminiService';
import { Message } from '../types';

interface AiAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '🔥 E aí, futuro milionário? Me fala: o que você sabe fazer ou quanto quer ganhar hoje? O tempo tá passando!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getMoneyMakingAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-brand-card w-full max-w-md h-[600px] rounded-2xl border border-brand-yellow shadow-[0_0_50px_rgba(255,215,0,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-brand-yellow p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-black p-1.5 rounded-full">
              <MessageSquare size={16} className="text-brand-yellow" />
            </div>
            <h3 className="text-black font-black tracking-wide">ORÁCULO DO LUCRO</h3>
          </div>
          <button onClick={onClose} className="text-black hover:bg-black/10 rounded-full p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-xl text-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-brand-gray text-white rounded-br-none' 
                  : 'bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-brand-yellow/10 p-3 rounded-xl rounded-bl-none">
                <Loader2 size={16} className="animate-spin text-brand-yellow" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-brand-card border-t border-brand-gray">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: Tenho um carro e tempo livre..."
              className="flex-1 bg-black border border-brand-gray text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-brand-yellow hover:bg-brand-yellowHover disabled:opacity-50 text-black rounded-lg px-4 transition-colors font-bold"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-brand-textGray text-center mt-2">
            IA alimentada por Gemini™ - Otimizada para Lucro
          </p>
        </div>

      </div>
    </div>
  );
};