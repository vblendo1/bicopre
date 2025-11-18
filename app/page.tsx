import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NotificationBar } from '../components/NotificationBar';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { OpportunityFeed } from '../components/OpportunityFeed';
import { AiAdvisor } from '../components/AiAdvisor';
import { VipModal } from '../components/VipModal';
import { AdminLogin } from '../components/AdminLogin';
import { AdminDashboard } from '../components/AdminDashboard';
import { UserTier, PageView } from '../types';
import { Lock } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('APP');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [userTier, setUserTier] = useState<UserTier>(UserTier.FREE);

  const isVip = userTier === UserTier.VIP;

  const handleFeatureClick = (featureId: string) => {
    if (isVip) {
      if (featureId === 'elite_ops') {
        document.getElementById('opportunities-feed')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      return;
    }

    if (featureId === 'elite_ops') {
      const element = document.getElementById('opportunities-feed');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsVipModalOpen(true);
    }
  };

  const handleOpenAi = () => {
    setIsAiOpen(true);
  };

  const handleUpgradeSuccess = () => {
    setUserTier(UserTier.VIP);
  };

  // --- ADMIN ROUTING ---
  if (currentView === 'ADMIN_LOGIN') {
    return <AdminLogin onLogin={() => setCurrentView('ADMIN_DASHBOARD')} onBack={() => setCurrentView('APP')} />;
  }

  if (currentView === 'ADMIN_DASHBOARD') {
    return <AdminDashboard onLogout={() => setCurrentView('APP')} />;
  }

  // --- MAIN APP VIEW ---
  return (
    <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-yellow selection:text-black">
      <NotificationBar />
      
      <Header 
        onOpenVip={() => setIsVipModalOpen(true)} 
        userTier={userTier} 
        onSecretTrigger={() => setCurrentView('ADMIN_LOGIN')}
      />
      
      <main className="flex-1 flex flex-col items-center relative">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
             style={{
               backgroundImage: 'radial-gradient(circle at 50% 0%, #333 0%, transparent 70%)'
             }}>
        </div>

        <div className="z-10 w-full">
          <HeroSection onActivate={handleOpenAi} />
          <FeatureGrid onFeatureClick={handleFeatureClick} />
          <OpportunityFeed isVip={isVip} onOpenVip={() => setIsVipModalOpen(true)} />
        </div>
      </main>

      <footer className="w-full border-t border-brand-gray py-12 text-center text-brand-textGray text-sm bg-brand-dark z-10 flex flex-col items-center gap-4">
        <p>&copy; 2024 Bico Premium. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 text-xs opacity-60">
          <a href="#" className="hover:text-white">Termos de Uso</a>
          <a href="#" className="hover:text-white">Privacidade</a>
          <a href="#" className="hover:text-white">Suporte</a>
        </div>
        
        <button 
          onClick={() => setCurrentView('ADMIN_LOGIN')} 
          className="mt-4 bg-red-900/30 hover:bg-red-900/50 text-red-500 border border-red-900 rounded px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <Lock size={12} />
          Acessar Painel Admin
        </button>
      </footer>

      <AiAdvisor isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      <VipModal 
        isOpen={isVipModalOpen} 
        onClose={() => setIsVipModalOpen(false)} 
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </div>
  );
};

