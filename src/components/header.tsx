import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './themeToggle';

export default function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="h-16 border-b bg-card px-4">
      <div className="h-full flex items-center justify-between">
        <h1 className="text-lg font-semibold">Echo Chat</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle/>
          <div onClick={handleLogout} className='cursor-pointer'>
            <LogOut className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}