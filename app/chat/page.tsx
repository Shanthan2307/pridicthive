'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Get the current chat count from localStorage
    const chatCount = parseInt(localStorage.getItem('chatCount') || '0', 10);
    const newChatCount = chatCount + 1;
    
    // Save the new count
    localStorage.setItem('chatCount', newChatCount.toString());
    
    // Redirect to the new chat
    router.push(`/chat/chat-${newChatCount}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-monad-dark-bg">
      <div className="text-monad-light-purple">Creating new chat...</div>
    </div>
  );
}
