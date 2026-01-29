import { FileText, BarChart3, Home, Sparkles, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'Create CV', icon: FileText },
    { id: 'analyze', label: 'Analyze', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
  ];
  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-cyan-400 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" />
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              CVision Pro
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (item.id === 'home') navigate('/');
                    else navigate(`/${item.id}`);
                  }}
                  className={`relative px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group ${isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 blur-xl opacity-50 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
