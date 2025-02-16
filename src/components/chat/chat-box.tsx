import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubble from './chat-bubble';
import ChatInput from './chat-input';
import { useChat } from '@/contexts/chat-context'; 
import io, { Socket } from "socket.io-client";

type ChatMessage = {
  owner: boolean;
  content: string;
};

export default function ChatBox() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedChat } = useChat();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/");
      return;
    }

    const socketConnection = io("wss://ec2-3-108-64-113.ap-south-1.compute.amazonaws.com:4000", {
      transports: ["websocket"],
    });
    setSocket(socketConnection);

    socketConnection.on("message", (message: ChatMessage) => {
      appendChat(message);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [navigate, selectedChat]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return;

    const { id } = JSON.parse(user);
    const storedChat = localStorage.getItem(
      `chatMessages_${selectedChat}-${id}`
    );
    if (storedChat) {
      setChat(JSON.parse(storedChat));
    } else {
      setChat([]);
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const appendChat = (message: ChatMessage) => {
    setChat((prevChat) => {
      const updatedChat = [...prevChat, message];
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) {
          const { id } = JSON.parse(user);
          localStorage.setItem(
            `chatMessages_${selectedChat}-${id}`,
            JSON.stringify(updatedChat)
          );
        }
      }
      return updatedChat;
    });
  };

  const sendMessage = (message: ChatMessage) => {
    appendChat(message);
    if (!socket) return;
    socket.emit("message", message);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="relative flex flex-col h-[90vh]">
      <div className="flex-grow overflow-y-scroll px-4 pb-4 sm:px-6 lg:px-10 bg-white dark:bg-transparent text-black dark:text-white">
        {chat.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-gray-100 dark:bg-background text-slate-black dark:text-slate-200">
        <ChatInput appendChat={sendMessage} />
      </div>
    </div>
  );
};

