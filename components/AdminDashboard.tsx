import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Activity, 
  LogOut, 
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  Zap
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // Mock Data
  const stats = [
    { title: 'Receita Total', value: 'R$ 14.250,00', change: '+12%', icon: <DollarSign size={20} />, color: 'text-green-400' },
    { title: 'Membros VIP', value: '482', change: '+5%', icon: <Users size={20} />, color: 'text-brand-yellow' },
    { title: 'Taxa de Conversão', value: '3.8%', change: '-1%', icon: <Activity size={20} />, color: 'text-blue-400' },
    { title: 'Uso da IA (Tokens)', value: '1.2M', change: '+22%', icon: <Zap size={20} />, color: 'text-purple-400' },
  ];

  const recentSales = [
    { id: '#PIX-9928', user: 'carlos@email.com', plan: 'VIP Mensal', value: 'R$ 29,90', status: 'Aprovado', time: '2 min atrás' },
    { id: '#PIX-9927', user: 'ana.beatriz@uol.com', plan: 'VIP Mensal', value: 'R$ 29,90', status: 'Aprovado', time: '15 min atrás' },
    { id: '#PIX-9926', user: 'roberto.silva@gmail.com', plan: 'VIP Mensal', value: 'R$ 29,90', status: 'Pendente', time: '32 min atrás' },
    { id: '#PIX-9925', user: 'julia.m@hotmail.com', plan: 'VIP Mensal', value: 'R$ 29,90', status: 'Falha', time: '1h atrás' },
    { id: '#PIX-9924', user: 'marcos.dev@outlook.com', plan: 'VIP Mensal', value: 'R$ 29,90', status: 'Aprovado', time: '2h atrás' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-gray hidden md:flex flex-col bg-brand-card">
        <div className="p-6 border-b border-brand-gray">
          <h1 className="font-black text-xl tracking-wider">ADMIN <span className="text-brand-yellow">PANEL</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-brand-yellow/10 text-brand-yellow rounded-lg font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Users size={20} /> Usuários
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <CreditCard size={20} /> Financeiro
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <TrendingUp size={20} /> Analytics
          </a>
        </nav>

        <div className="p-4 border-t border-brand-gray">
          <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 md:hidden">
           <h1 className="font-black text-xl">ADMIN</h1>
           <button onClick={onLogout}><LogOut size={20} /></button>
        </header>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Visão Geral</h2>
            <p className="text-gray-400">Bem-vindo de volta, Administrador.</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-gray-500 uppercase font-bold">Última atualização</p>
            <p className="text-sm font-mono text-brand-yellow">Hoje, 14:32</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-brand-card border border-brand-gray p-6 rounded-xl hover:border-brand-yellow/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/5 p-2 rounded-lg text-gray-300">
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Sales Table */}
        <div className="bg-brand-card border border-brand-gray rounded-xl overflow-hidden">
          <div className="p-6 border-b border-brand-gray flex justify-between items-center">
            <h3 className="font-bold text-lg">Transações Recentes (Pix)</h3>
            <button className="text-brand-yellow text-sm font-bold hover:underline flex items-center gap-1">
              Ver Todas <ArrowUpRight size={14} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-gray-400 text-xs uppercase">
                  <th className="p-4 font-medium">ID Transação</th>
                  <th className="p-4 font-medium">Usuário</th>
                  <th className="p-4 font-medium">Plano</th>
                  <th className="p-4 font-medium">Valor</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray/50">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-300">{sale.id}</td>
                    <td className="p-4 text-sm font-medium">{sale.user}</td>
                    <td className="p-4 text-xs text-gray-400">{sale.plan}</td>
                    <td className="p-4 font-bold text-green-400">{sale.value}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                        sale.status === 'Aprovado' ? 'bg-green-500/20 text-green-400' : 
                        sale.status === 'Pendente' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-xs text-gray-500">{sale.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};