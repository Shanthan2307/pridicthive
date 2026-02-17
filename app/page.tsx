'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      router.push('/chat');
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-monad-black overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(110, 84, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110, 84, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-monad-purple/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-monad-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <AnimatePresence>
        {!isEntering && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl font-bold monad-gradient-text mb-4">
                PredictHive
              </h1>
              <p className="text-monad-light-purple text-center text-lg">
                AI-Powered Prediction Markets on Monad
              </p>
            </motion.div>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={handleEnter}
                disabled={isEntering}
                className="relative px-10 py-4 text-lg font-semibold text-white rounded-full 
                           monad-gradient hover:shadow-monad-strong
                           transition-all duration-300 ease-out
                           disabled:opacity-50 disabled:cursor-not-allowed
                           group overflow-hidden"
              >
                <span className="relative z-10">Enter the Hive</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                 translate-x-[-100%] group-hover:translate-x-[100%] 
                                 transition-transform duration-700 ease-in-out" />
              </button>
            </motion.div>

            {/* x402 Pay Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-8 right-8"
            >
              <div className="px-4 py-2 rounded-full bg-monad-purple/20 border border-monad-purple/40 backdrop-blur-sm">
                <span className="text-monad-cyan text-sm font-semibold">Powered by x402 Pay</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
