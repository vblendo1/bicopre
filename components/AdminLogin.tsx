import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP Hardcoded password: "admin"
    if (password === 'admin') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white">
      <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
        <ArrowLeft size={20} /> Voltar ao App
      </button>

      <div className="w-full max-w-md bg-brand-card border border-brand-gray p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-900/30 p-4 rounded-full mb-4">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider">Acesso Restrito</h2>
          <p className="text-gray-400 text-sm">Área administrativa do Bico Premium</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Senha de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-black border border-brand-gray focus:border-brand-yellow text-white pl-10 pr-4 py-3 rounded-lg outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-xs font-bold text-center bg-red-900/20 py-2 rounded">
              Senha incorreta. Tente "admin".
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-black font-black py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ACESSAR SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
};