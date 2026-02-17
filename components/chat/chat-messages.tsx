'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatMessages({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto monad-scrollbar p-6 space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-2xl rounded-2xl px-6 py-4 ${
              message.role === 'user'
                ? 'monad-gradient text-white'
                : 'bg-monad-black/50 border border-monad-purple/20 text-monad-light-purple'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full monad-agent-glow flex items-center justify-center text-sm">
                  🤖
                </div>
                <span className="text-xs font-semibold text-monad-cyan">AI Agent</span>
              </div>
            )}
            <p className="text-sm leading-relaxed">{message.content}</p>
            <div className="mt-2 text-xs opacity-50">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      ))}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="max-w-2xl rounded-2xl px-6 py-4 bg-monad-black/50 border border-monad-purple/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-monad-cyan animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-monad-purple animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-monad-pink animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="ml-2 text-sm text-monad-light-purple">Thinking...</span>
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
