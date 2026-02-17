import ChatInterface from '@/components/chat/chat-interface';

export default async function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChatInterface chatId={id} />;
}
