import React, { useState } from 'react';
import { X, Monitor } from 'lucide-react';

export const NotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-brand-yellow text-black font-bold text-sm py-3 px-4 flex items-center justify-between shadow-lg relative z-50">
      <div className="flex items-center gap-3 mx-auto">
        <Monitor size={20} />
        <span>Dica nova: R$ 300 com um item da sua casa. <span className="underline cursor-pointer ml-1 opacity-80 hover:opacity-100">Ver o segredo</span></span>
      </div>
      <button onClick={() => setIsVisible(false)} className="absolute right-4 hover:bg-black/10 p-1 rounded-full transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};