import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import ChatBox from '@/components/chat/chat-box';
import { ChatProvider } from '@/contexts/chat-context';

export default function Chat() {
  const navigate = useNavigate();
   useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token ",token)
        if (!token) {
          navigate('/login');
        }
      }, []);


  return (
    <ChatProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <ChatBox />
        </div>
      </div>
    </ChatProvider>
  );
}