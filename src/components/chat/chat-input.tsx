import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  appendChat: (message: { owner: boolean; content: string }) => void;
}

export default function ChatInput({ appendChat }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    appendChat({
      owner: true,
      content: message.trim(),
    });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit" size="icon" className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
        <SendHorizontal className="h-6 w-6 text-white" />
      </Button>
    </form>
  );
}