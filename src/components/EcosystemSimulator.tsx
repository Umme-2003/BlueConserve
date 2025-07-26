import React, { useState, useEffect } from 'react';
import { Fish, Waves, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { UserData } from '../App';

interface EcosystemSimulatorProps {
  userData: UserData;
}

const EcosystemSimulator: React.FC<EcosystemSimulatorProps> = ({ userData }) => {
  const [isDayMode, setIsDayMode] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  const getEcosystemState = () => {
    const score = userData.oceanHealthScore;
    
    if (score >= 80) {
      return {
        waterColor: 'from-cyan-400 to-blue-500',
        coralHealth: 'Vibrant coral reefs with diverse colors',
        fishCount: 'Abundant fish schools swimming freely',
        visibility: 'Crystal clear water with excellent visibility',
        debris: 'Clean ocean floor with no pollution',
        mood: 'thriving'
      };
    } else if (score >= 60) {
      return {
        waterColor: 'from-cyan-500 to-blue-600',
        coralHealth: 'Healthy coral with some minor bleaching',
        fishCount: 'Good fish population with normal activity',
        visibility: 'Clear water with good visibility',
        debris: 'Minimal debris, mostly natural materials',
        mood: 'healthy'
      };
    } else if (score >= 40) {
      return {
        waterColor: 'from-blue-600 to-gray-600',
        coralHealth: 'Stressed coral showing bleaching signs',
        fishCount: 'Reduced fish population, some species missing',
        visibility: 'Cloudy water with reduced visibility',
        debris: 'Some plastic waste and pollution visible',
        mood: 'stressed'
      };
    } else {
      return {
        waterColor: 'from-gray-600 to-gray-800',
        coralHealth: 'Severely bleached and dying coral',
        fishCount: 'Very few fish, mostly bottom feeders',
        visibility: 'Murky water with poor visibility',
        debris: 'Heavy pollution with plastic and toxic waste',
        mood: 'critical'
      };
    }
  };

  const ecosystem = getEcosystemState();

  const MarineLife = () => {
    const fishCount = userData.oceanHealthScore >= 80 ? 12 : 
                     userData.oceanHealthScore >= 60 ? 8 :
                     userData.oceanHealthScore >= 40 ? 4 : 2;

    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: fishCount }).map((_, i) => (
          <div
            key={i}
            className={`absolute ${userData.oceanHealthScore >= 60 ? 'text-cyan-300' : 'text-gray-400'} animate-pulse`}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 60 + 20}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Fish className="w-6 h-6" />
          </div>
        ))}
        
        {/* Floating debris for poor scores */}
        {userData.oceanHealthScore < 60 && Array.from({ length: Math.floor((60 - userData.oceanHealthScore) / 10) }).map((_, i) => (
          <div
            key={`debris-${i}`}
            className="absolute text-red-400/60 animate-bounce"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 50 + 30}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random()}s`
            }}
          >
            <div className="w-3 h-3 bg-red-500/60 rounded-sm rotate-12"></div>
          </div>
        ))}

        {/* Coral representations */}
        <div className="absolute bottom-0 left-0 w-full h-32">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`coral-${i}`}
              className={`absolute bottom-0 ${
                userData.oceanHealthScore >= 80 ? 'text-pink-400' :
                userData.oceanHealthScore >= 60 ? 'text-orange-400' :
                userData.oceanHealthScore >= 40 ? 'text-yellow-600' : 'text-gray-600'
              }`}
              style={{
                left: `${i * 12 + Math.random() * 8}%`,
                height: `${20 + Math.random() * 40}px`
              }}
            >
              <div className="w-4 h-full bg-current rounded-t-full opacity-70"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Fish className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Your Ocean Ecosystem
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            This is how your lifestyle choices affect the ocean in real time. Every action creates ripples through the marine ecosystem.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsDayMode(!isDayMode)}
            className="flex items-center space-x-2 bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg px-4 py-2 text-blue-200 hover:text-cyan-300 transition-colors"
          >
            {isDayMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span>{isDayMode ? 'Night Mode' : 'Day Mode'}</span>
          </button>
          
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center space-x-2 bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg px-4 py-2 text-blue-200 hover:text-cyan-300 transition-colors"
          >
            {showLegend ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showLegend ? 'Hide' : 'Show'} Legend</span>
          </button>
        </div>

        {/* Ocean Simulator */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`relative h-96 rounded-2xl overflow-hidden ${isDayMode ? 'brightness-100' : 'brightness-75'} transition-all duration-1000`}>
              <div className={`absolute inset-0 bg-gradient-to-b ${ecosystem.waterColor} transition-all duration-2000`}>
                <MarineLife />
                
                {/* Water surface effect */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/10 to-transparent animate-pulse"></div>
                
                {/* Sunlight rays (day mode only) */}
                {isDayMode && (
                  <div className="absolute top-0 left-1/4 w-2 h-32 bg-gradient-to-b from-yellow-300/30 to-transparent transform rotate-12 animate-pulse"></div>
                )}
                
                {/* Ocean floor */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-yellow-600/40 to-yellow-800/40"></div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-cyan-100 mb-2">
                Ocean Health Score: {userData.oceanHealthScore}%
              </h3>
              <p className={`text-lg font-medium ${
                ecosystem.mood === 'thriving' ? 'text-green-400' :
                ecosystem.mood === 'healthy' ? 'text-yellow-400' :
                ecosystem.mood === 'stressed' ? 'text-orange-400' : 'text-red-400'
              }`}>
                Ecosystem Status: {ecosystem.mood.charAt(0).toUpperCase() + ecosystem.mood.slice(1)}
              </p>
            </div>
          </div>

          {/* Legend Panel */}
          <div className={`transition-all duration-500 ${showLegend ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full lg:translate-x-0 lg:opacity-30'}`}>
            <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-cyan-100 mb-6">Ecosystem Impact</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-700/30 rounded-lg">
                  <h4 className="font-semibold text-cyan-200 mb-2">Coral Health</h4>
                  <p className="text-sm text-blue-200">{ecosystem.coralHealth}</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg">
                  <h4 className="font-semibold text-cyan-200 mb-2">Marine Life</h4>
                  <p className="text-sm text-blue-200">{ecosystem.fishCount}</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg">
                  <h4 className="font-semibent text-cyan-200 mb-2">Water Quality</h4>
                  <p className="text-sm text-blue-200">{ecosystem.visibility}</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg">
                  <h4 className="font-semibold text-cyan-200 mb-2">Pollution Level</h4>
                  <p className="text-sm text-blue-200">{ecosystem.debris}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                <h4 className="font-semibold text-cyan-200 mb-2">Impact Factors</h4>
                <div className="space-y-2 text-sm text-blue-200">
                  <div className="flex justify-between">
                    <span>Plastic Use:</span>
                    <span className={userData.plasticUse < 5 ? 'text-green-400' : userData.plasticUse < 15 ? 'text-yellow-400' : 'text-red-400'}>
                      {userData.plasticUse < 5 ? 'Low' : userData.plasticUse < 15 ? 'Moderate' : 'High'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seafood Impact:</span>
                    <span className={userData.seafoodConsumption < 3 ? 'text-green-400' : userData.seafoodConsumption < 8 ? 'text-yellow-400' : 'text-red-400'}>
                      {userData.seafoodConsumption < 3 ? 'Low' : userData.seafoodConsumption < 8 ? 'Moderate' : 'High'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon Footprint:</span>
                    <span className={['walk', 'bike'].includes(userData.transportation) ? 'text-green-400' : userData.transportation === 'public' ? 'text-yellow-400' : 'text-red-400'}>
                      {['walk', 'bike'].includes(userData.transportation) ? 'Low' : userData.transportation === 'public' ? 'Moderate' : 'High'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Updates Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/50 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-200 text-sm font-medium">
              This ecosystem updates in real-time based on your choices
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemSimulator;