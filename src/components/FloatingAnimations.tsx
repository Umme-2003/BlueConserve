import React, { useEffect, useState } from 'react';
import { Fish, Waves, Shell, Droplets } from 'lucide-react';

const FloatingAnimations: React.FC = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    type: 'fish' | 'wave' | 'shell' | 'bubble';
    x: number;
    y: number;
    speed: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      const types: ('fish' | 'wave' | 'shell' | 'bubble')[] = ['fish', 'wave', 'shell', 'bubble'];
      
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.2 + Math.random() * 0.8,
          size: 0.5 + Math.random() * 0.5,
        });
      }
      
      setElements(newElements);
    };

    generateElements();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'fish':
        return Fish;
      case 'wave':
        return Waves;
      case 'shell':
        return Shell;
      case 'bubble':
        return Droplets;
      default:
        return Fish;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'fish':
        return 'text-cyan-300/30';
      case 'wave':
        return 'text-blue-300/20';
      case 'shell':
        return 'text-orange-300/25';
      case 'bubble':
        return 'text-white/20';
      default:
        return 'text-cyan-300/30';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => {
        const IconComponent = getIcon(element.type);
        return (
          <div
            key={element.id}
            className={`absolute ${getColor(element.type)} animate-pulse`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `scale(${element.size})`,
              animationDuration: `${2 + element.speed * 2}s`,
              animationDelay: `${element.id * 0.5}s`,
            }}
          >
            <IconComponent className="w-6 h-6" />
          </div>
        );
      })}
      
      {/* Floating bubbles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute w-2 h-2 bg-white/10 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Gradient overlay for depth effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-blue-900/10 pointer-events-none" />
    </div>
  );
};

export default FloatingAnimations;