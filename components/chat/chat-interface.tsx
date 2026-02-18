'use client';

import { useState, useEffect } from 'react';
import ChatInput from './chat-input';
import PortfolioPanel from './portfolio-panel';
import AmongUsLoading from './among-us-loading';
import AmongUsChat from './among-us-chat';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  debateData?: any;
  agent?: string;
  emoji?: string;
  color?: string;
}

export default function ChatInterface({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Preparing debate...');

  // Show welcome message only if no messages yet
  useEffect(() => {
    if (messages.length === 0 && !hasStarted) {
      setMessages([{
        id: '1',
        role: 'system',
        content: 'Ask a prediction question to start the debate!',
        timestamp: new Date(),
      }]);
    }
  }, [messages.length, hasStarted]);

  const handleSendMessage = async (content: string) => {
    setHasStarted(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Step 1: Refine question with Gemini
      setLoadingMessage('🤖 Refining your question...');
      
      const geminiResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: content }),
      });

      if (!geminiResponse.ok) throw new Error('Failed to refine question');
      
      const { refinedQuery } = await geminiResponse.json();

      // Step 2: Fetch Polymarket data
      setLoadingMessage('📊 Fetching market data...');

      const polymarketResponse = await fetch('/api/polymarket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: refinedQuery }),
      });

      if (!polymarketResponse.ok) throw new Error('Failed to fetch market data');
      
      const marketData = await polymarketResponse.json();

      // Add market data message
      const marketSummary = `📊 Market: "${marketData.question}"\n\n${marketData.outcomes
        .map((o: any) => `${o.name}: ${o.liveProbability || o.probability}`)
        .join(' | ')}`;
      
      setMessages((prev) => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'system',
        content: marketSummary,
        timestamp: new Date(),
      }]);

      // Step 3: Run AI debate with streaming
      setLoadingMessage('🎭 Starting debate...');
      
      const response = await fetch('/api/debate-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: refinedQuery,
          marketData,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to start debate stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setIsLoading(false);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'agent_start') {
                // Add agent message placeholder
                const agentMessage: Message = {
                  id: `agent-${data.iteration}-${data.agent}`,
                  role: 'assistant',
                  content: `${data.emoji} ${data.agent} is thinking...`,
                  timestamp: new Date(),
                  agent: data.agent,
                  emoji: data.emoji,
                  color: data.color,
                };
                setMessages((prev) => [...prev, agentMessage]);
              } else if (data.type === 'agent_response') {
                // Update agent message with response
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === `agent-${data.iteration}-${data.agent}`
                      ? { ...msg, content: data.content }
                      : msg
                  )
                );
              } else if (data.type === 'iteration_end') {
                // Add iteration separator
                const separator: Message = {
                  id: `separator-${data.iteration}`,
                  role: 'system',
                  content: `━━━ Round ${data.iteration + 1} Complete ━━━`,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, separator]);
              } else if (data.type === 'judge_verdict') {
                // Add judge verdict
                const judgeMessage: Message = {
                  id: `judge-${Date.now()}`,
                  role: 'assistant',
                  content: data.content,
                  timestamp: new Date(),
                  agent: 'Judge',
                  emoji: '⚖️',
                };
                setMessages((prev) => [...prev, judgeMessage]);
              } else if (data.type === 'error') {
                const errorMessage: Message = {
                  id: (Date.now() + 99).toString(),
                  role: 'assistant',
                  content: `❌ Error: ${data.message}`,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
                setIsLoading(false);
                return;
              }
            } catch (e) {
              console.error('Error parsing stream data:', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 99).toString(),
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <AmongUsLoading message={loadingMessage} />}
      
      <div className="flex h-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4">
          <AmongUsChat messages={messages} />
          <div className="mt-4">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>

        {/* Portfolio Panel */}
        <PortfolioPanel />
      </div>
    </>
  );
}
