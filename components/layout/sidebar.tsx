'use client';

import { Plus, Wallet, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from './sidebar-context';

const agents = [
  { id: 'market-analyst', name: 'Market Analyst', icon: '📊', color: 'monad-purple' },
  { id: 'prediction-expert', name: 'Prediction Expert', icon: '🔮', color: 'monad-cyan' },
  { id: 'risk-manager', name: 'Risk Manager', icon: '🛡️', color: 'monad-pink' },
  { id: 'portfolio-advisor', name: 'Portfolio Advisor', icon: '💼', color: 'monad-orange' },
];

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-monad-black/80 backdrop-blur-sm border border-monad-purple/30"
      >
        {isOpen ? <X className="w-6 h-6 text-monad-cyan" /> : <Menu className="w-6 h-6 text-monad-cyan" />}
      </button>

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-72 bg-monad-black border-r border-monad-purple/20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-monad-purple/20">
            <h1 className="text-2xl font-bold monad-gradient-text">PredictHive</h1>
            <p className="text-xs text-monad-light-purple mt-1">Monad Predictions</p>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Link href="/chat">
              <button className="w-full px-4 py-3 rounded-lg monad-gradient text-white font-semibold
                               hover:shadow-monad-glow transition-all duration-300
                               flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                New Prediction
              </button>
            </Link>
          </div>

          {/* Agents List */}
          <div className="flex-1 overflow-y-auto monad-scrollbar px-4">
            <div className="mb-2 text-xs font-semibold text-monad-light-purple uppercase tracking-wider">
              AI Agents
            </div>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  className="w-full p-3 rounded-lg bg-monad-black/50 border border-monad-purple/20
                           hover:border-monad-cyan hover:shadow-monad-cyan-glow
                           transition-all duration-300 group
                           flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full monad-agent-glow flex items-center justify-center text-xl
                                group-hover:scale-110 transition-transform duration-300">
                    {agent.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-monad-white group-hover:text-monad-cyan transition-colors">
                      {agent.name}
                    </div>
                    <div className="text-xs text-monad-light-purple/60">Available</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-monad-purple/20 space-y-2">
            <button className="w-full px-4 py-2 rounded-lg bg-monad-purple/10 border border-monad-purple/30
                             hover:bg-monad-purple/20 transition-all duration-300
                             flex items-center gap-2 text-monad-light-purple">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">Connect Wallet</span>
            </button>
            <button className="w-full px-4 py-2 rounded-lg bg-monad-black/50 border border-monad-purple/20
                             hover:border-monad-purple/40 transition-all duration-300
                             flex items-center gap-2 text-monad-light-purple">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
