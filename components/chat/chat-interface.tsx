'use client';

import { useState } from 'react';
import ChatMessages from './chat-messages';
import ChatInput from './chat-input';
import PortfolioPanel from './portfolio-panel';
import GalagaVisualizer from './galaga-visualizer';
import { Menu } from 'lucide-react';
import { useSidebar } from '../layout/sidebar-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to PredictHive! I\'m your AI prediction assistant. Ask me a prediction question to enter debate mode!',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [debateMode, setDebateMode] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const { toggleSidebar } = useSidebar();

  const handleSendMessage = async (content: string) => {
    // Enter debate mode immediately on first query
    if (!debateMode) {
      setDebateMode(true);
      setCurrentQuery(content);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Debate mode active! Watch the AI agents battle it out.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Show full-screen Galaga visualizer when in debate mode
  if (debateMode) {
    return (
      <div className="relative h-full">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-50 p-3 rounded-lg bg-purple-900/80 backdrop-blur-md border-2 border-purple-500/50 hover:bg-purple-800/80 transition-all shadow-lg hover:shadow-cyan-500/50"
        >
          <Menu className="w-5 h-5 text-cyan-400" />
        </button>
        
        <GalagaVisualizer query={currentQuery} />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>

      {/* Portfolio Panel */}
      <PortfolioPanel />
    </div>
  );
}
