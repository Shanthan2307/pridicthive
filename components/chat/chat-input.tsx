'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
}) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t border-monad-purple/20 bg-monad-black/50 backdrop-blur-sm p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3">
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about predictions, markets, or place a bet..."
            disabled={disabled}
            minRows={1}
            maxRows={6}
            className="flex-1 px-4 py-3 rounded-xl bg-monad-black/50 border border-monad-purple/20
                     text-monad-white placeholder-monad-light-purple/50
                     focus:outline-none focus:border-monad-cyan focus:shadow-monad-cyan-glow
                     transition-all duration-300 resize-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="p-3 rounded-xl monad-gradient text-white
                     hover:shadow-monad-strong transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-monad-light-purple/50 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
}
