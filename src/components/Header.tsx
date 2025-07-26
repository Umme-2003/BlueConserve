import React from 'react';
import { Waves, Fish, Leaf, Users, Calculator } from 'lucide-react';
import { UserData } from '../App';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userData: UserData;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, userData }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Waves },
    { id: 'calculator', label: 'Impact Calculator', icon: Calculator },
    { id: 'simulator', label: 'Ocean Simulator', icon: Fish },
    { id: 'tips', label: 'Eco Tips', icon: Leaf },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blue-900/90 backdrop-blur-md border-b border-blue-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentPage('home')}
          >
            <Waves className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              BlueConserve
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 scale-105'
                      : 'text-blue-200 hover:text-cyan-300 hover:bg-blue-800/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-blue-800/50 px-3 py-2 rounded-lg">
              <Fish className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">Ocean Health: {userData.oceanHealthScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;