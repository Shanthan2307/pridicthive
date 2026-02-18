'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agent?: string;
  emoji?: string;
  color?: string;
}

const agentColors: Record<string, string> = {
  'Optimist': 'bg-green-500',
  'Skeptic': 'bg-red-500',
  'Visionary': 'bg-blue-500',
  'Analyst': 'bg-yellow-500',
  'user': 'bg-orange-500',
};

export default function AmongUsChat({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border-8 border-gray-700 shadow-2xl">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-t-xl border-b-4 border-gray-700">
        <h2 className="text-white font-bold text-xl text-center">Emergency Meeting</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isSystem = message.role === 'system';
          const agent = message.agent || 'user';
          const colorClass = agentColors[agent] || 'bg-gray-500';

          if (isSystem) {
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="px-4 py-2 bg-gray-700/50 rounded-full text-gray-300 text-sm border-2 border-gray-600">
                  {message.content}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: isUser ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Character avatar */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-14 ${colorClass} rounded-t-full border-4 border-black relative`}>
                    {/* Visor */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-cyan-300 rounded-full border-2 border-black">
                      <div className="absolute top-0.5 right-1 w-2 h-1.5 bg-white/60 rounded-full" />
                    </div>
                  </div>
                  {/* Legs */}
                  <div className="flex gap-1 justify-center -mt-1">
                    <div className={`w-3 h-4 ${colorClass} rounded-b border-2 border-black border-t-0`} />
                    <div className={`w-3 h-4 ${colorClass} rounded-b border-2 border-black border-t-0`} />
                  </div>
                </div>

                {/* Message bubble */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.emoji && <span className="text-lg">{message.emoji}</span>}
                    <span className="text-white font-bold text-sm">
                      {isUser ? 'You' : agent}
                    </span>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl border-4 border-black shadow-lg ${
                    isUser 
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-tr-none' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
