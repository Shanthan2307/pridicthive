'use client';

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const activeBets = [
  { id: 1, market: 'ETH > $4000 by March', amount: 100, odds: 2.5, status: 'active', change: 12.5 },
  { id: 2, market: 'BTC Dominance < 50%', amount: 50, odds: 1.8, status: 'active', change: -5.2 },
  { id: 3, market: 'Monad TVL > $1B', amount: 200, odds: 3.2, status: 'winning', change: 28.3 },
];

export default function PortfolioPanel() {
  return (
    <aside className="w-80 border-l border-monad-purple/20 bg-monad-black/30 backdrop-blur-sm overflow-y-auto monad-scrollbar">
      <div className="p-6">
        {/* Portfolio Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-monad-white mb-4">Portfolio</h2>
          
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-monad-purple/10 border border-monad-purple/30">
              <div className="text-xs text-monad-light-purple mb-1">Total Value</div>
              <div className="text-2xl font-bold monad-gradient-text">$1,247.50</div>
              <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +15.3% (24h)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-monad-black/50 border border-monad-purple/20">
                <div className="text-xs text-monad-light-purple mb-1">Active Bets</div>
                <div className="text-xl font-bold text-monad-cyan">3</div>
              </div>
              <div className="p-3 rounded-lg bg-monad-black/50 border border-monad-purple/20">
                <div className="text-xs text-monad-light-purple mb-1">Win Rate</div>
                <div className="text-xl font-bold text-green-400">68%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Bets */}
        <div>
          <h3 className="text-sm font-semibold text-monad-white mb-3">Active Predictions</h3>
          <div className="space-y-3">
            {activeBets.map((bet) => (
              <div
                key={bet.id}
                className="p-4 rounded-lg bg-monad-black/50 border border-monad-purple/20
                         hover:border-monad-cyan hover:shadow-monad-cyan-glow
                         transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-monad-white mb-1">
                      {bet.market}
                    </div>
                    <div className="text-xs text-monad-light-purple/60">
                      ${bet.amount} @ {bet.odds}x
                    </div>
                  </div>
                  {bet.status === 'winning' && (
                    <div className="px-2 py-1 rounded bg-green-500/20 border border-green-500/30">
                      <span className="text-xs text-green-400 font-semibold">Winning</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-xs font-semibold flex items-center gap-1 ${
                    bet.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {bet.change > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {bet.change > 0 ? '+' : ''}{bet.change}%
                  </div>
                  <div className="text-xs text-monad-cyan font-semibold">
                    ${(bet.amount * bet.odds).toFixed(2)} potential
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Place Bet Button */}
        <button className="w-full mt-6 px-4 py-3 rounded-lg monad-gradient text-white font-semibold
                         hover:shadow-monad-strong transition-all duration-300
                         flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5" />
          Place New Bet
        </button>

        {/* Quick Stats */}
        <div className="mt-6 p-4 rounded-lg bg-monad-purple/5 border border-monad-purple/20">
          <div className="text-xs font-semibold text-monad-light-purple mb-3">Quick Stats</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-monad-light-purple/60">Total Wagered</span>
              <span className="text-monad-white font-semibold">$2,450</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-monad-light-purple/60">Total Won</span>
              <span className="text-green-400 font-semibold">$3,247</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-monad-light-purple/60">Profit</span>
              <span className="text-monad-cyan font-semibold">+$797</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
