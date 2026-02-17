'use client';

import { Bell, Search } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-16 border-b border-monad-purple/20 bg-monad-black/50 backdrop-blur-sm px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-monad-light-purple/50" />
          <input
            type="text"
            placeholder="Search predictions, markets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-monad-black/50 border border-monad-purple/20
                     text-monad-white placeholder-monad-light-purple/50
                     focus:outline-none focus:border-monad-cyan focus:shadow-monad-cyan-glow
                     transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        {/* x402 Pay Badge */}
        <div className="px-3 py-1 rounded-full bg-monad-purple/20 border border-monad-purple/40">
          <span className="text-monad-cyan text-xs font-semibold">x402 Pay</span>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg bg-monad-black/50 border border-monad-purple/20
                         hover:border-monad-cyan hover:shadow-monad-cyan-glow
                         transition-all duration-300">
          <Bell className="w-5 h-5 text-monad-light-purple" />
        </button>

        {/* User Avatar */}
        <button className="w-10 h-10 rounded-full monad-gradient flex items-center justify-center
                         hover:shadow-monad-strong transition-all duration-300">
          <span className="text-white font-bold">U</span>
        </button>
      </div>
    </header>
  );
}
