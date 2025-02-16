import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useChat } from '@/contexts/chat-context';

import { Plus, MessageSquare } from 'lucide-react'; // Import icons
import { ScrollArea } from './ui/scroll-area';

export default function Sidebar() {
  const [chats, setChats] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedChats = localStorage.getItem('chats');
      return storedChats ? JSON.parse(storedChats) : ['Chat 1'];
    }
    return ['Chat 1'];
  });

  const { selectedChat, setSelectedChat } = useChat();

  const handleSelectChat = (index: number) => {
    setSelectedChat(index);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);

  const addChat = () => {
    const newChat = `Chat ${chats.length + 1}`;
    setChats([...chats, newChat]);
  };

  return (
    <div className="h-screen w-64 border-r bg-card">
      <div className="p-4 border-b">
        <Button className="w-full" onClick={addChat}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {chats.map((chat, index) => (
            <button
              key={chat}
              onClick={() => handleSelectChat(index)}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors my-4',
                selectedChat === index
                  ? 'bg-primary text-primary-foreground transition-colors' // Primary colors for the selected chat
                  : 'hover:bg-muted dark:hover:bg-gray-700 hover:text-black dark:hover:text-white' // Different hover effect based on theme
              )}
            >
              <MessageSquare
                className={cn(
                  'h-4 w-4',
                  selectedChat === index
                    ? 'text-primary-foreground' // Icon color when selected
                    : 'text-muted-foreground dark:text-gray-400' // Icon color for unselected in light/dark mode
                )}
              />
              <span
                className={cn(
                  selectedChat === index
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground dark:text-gray-300' // Text color changes for light/dark mode
                )}
              >
                Chat Session {index + 1}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
