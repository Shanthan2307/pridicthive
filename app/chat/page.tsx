'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a new chat ID and redirect
    const newChatId = `chat-${Date.now()}`;
    router.push(`/chat/${newChatId}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-monad-dark-bg">
      <div className="text-monad-light-purple">Loading...</div>
    </div>
  );
}
