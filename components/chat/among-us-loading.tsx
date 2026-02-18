'use client';

import { useEffect, useState } from 'react';

export default function AmongUsLoading({ message = 'Loading...' }: { message?: string }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 3) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <div className="relative flex flex-col items-center">
        {/* Circular loading bar */}
        <div className="relative w-64 h-64">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="3"
            />
            {/* Animated loading circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="70"
              transform={`rotate(${rotation} 50 50)`}
              style={{ transition: 'transform 0.016s linear' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Among Us Character */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-40 animate-bounce">
              {/* Character body */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-purple-600 rounded-t-full border-4 border-black">
                {/* Visor */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-12 bg-cyan-400 rounded-full border-4 border-black overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute top-1 right-2 w-6 h-4 bg-white/60 rounded-full" />
                </div>
              </div>
              
              {/* Legs */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-6 h-8 bg-purple-600 rounded-b-lg border-4 border-black border-t-0" />
                <div className="w-6 h-8 bg-purple-600 rounded-b-lg border-4 border-black border-t-0" />
              </div>

              {/* Backpack */}
              <div className="absolute top-12 -right-2 w-8 h-16 bg-purple-700 rounded-r-lg border-4 border-black" />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-white mb-2">{message}</p>
          <div className="flex gap-1 justify-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
