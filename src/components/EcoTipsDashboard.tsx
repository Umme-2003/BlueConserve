import React, { useState } from 'react';
import { Lightbulb, Check, Bell, Star, Droplets, Recycle, Car, Fish as FishIcon } from 'lucide-react';
import { UserData } from '../App';

interface EcoTipsDashboardProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const EcoTipsDashboard: React.FC<EcoTipsDashboardProps> = ({ userData, setUserData }) => {
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const generatePersonalizedTips = () => {
    const tips = [];

    if (userData.plasticUse > 10) {
      tips.push({
        id: 'plastic-bottles',
        icon: Droplets,
        title: 'Switch to Reusable Water Bottles',
        description: `You use ${userData.plasticUse} plastic bottles per week. Switching to reusable bottles could save ${userData.plasticUse * 52} bottles annually and prevent 1,000L of ocean pollution.`,
        impact: 'High',
        color: 'from-blue-500 to-cyan-500',
        category: 'Plastic Reduction'
      });
    }

    if (userData.seafoodConsumption > 5) {
      tips.push({
        id: 'sustainable-seafood',
        icon: FishIcon,
        title: 'Choose Sustainable Seafood',
        description: `With ${userData.seafoodConsumption} seafood meals per week, choosing sustainable options or reducing by 2 meals could protect marine biodiversity and help fish populations recover.`,
        impact: 'High',
        color: 'from-teal-500 to-green-500',
        category: 'Marine Protection'
      });
    }

    if (userData.transportation === 'car' || userData.transportation === 'plane') {
      tips.push({
        id: 'transport-change',
        icon: Car,
        title: 'Reduce Carbon Footprint',
        description: `Your ${userData.transportation === 'plane' ? 'frequent flying' : 'car usage'} contributes to ocean acidification. Consider public transport, cycling, or walking for shorter trips.`,
        impact: 'Medium',
        color: 'from-green-500 to-teal-500',
        category: 'Transportation'
      });
    }

    if (userData.waterUsage > 15) {
      tips.push({
        id: 'water-conservation',
        icon: Droplets,
        title: 'Conserve Water Resources',
        description: `Your ${userData.waterUsage}-minute showers use significant water. Reducing by 5 minutes daily saves 1,825 gallons annually and reduces wastewater impact on oceans.`,
        impact: 'Medium',
        color: 'from-cyan-500 to-blue-500',
        category: 'Water Conservation'
      });
    }

    tips.push({
      id: 'beach-cleanup',
      icon: Recycle,
      title: 'Join Beach Cleanup Initiatives',
      description: 'Participate in local beach cleanups to directly remove harmful debris from marine environments. One person can collect 20+ pounds of trash per cleanup.',
      impact: 'High',
      color: 'from-orange-500 to-red-500',
      category: 'Direct Action'
    });

    if (userData.plasticUse < 5) {
      tips.push({
        id: 'influence-others',
        icon: Star,
        title: 'Inspire Your Community',
        description: 'Your low plastic usage is excellent! Share your habits with friends and family. One person can influence 5-10 others to adopt eco-friendly practices.',
        impact: 'High',
        color: 'from-purple-500 to-pink-500',
        category: 'Community Impact'
      });
    }

    return tips.slice(0, 5);
  };

  const tips = generatePersonalizedTips();

  const completeTip = (tipId: string) => {
    const updatedTips = [...userData.completedTips];
    if (!updatedTips.includes(tipId)) {
      updatedTips.push(tipId);
      setUserData({ ...userData, completedTips: updatedTips });
    }
  };

  const oceanFacts = [
    "A single plastic bottle takes 450 years to decompose in the ocean.",
    "Ocean acidification has increased by 30% since the Industrial Revolution.",
    "Over 8 million tons of plastic waste enter our oceans every year.",
    "Coral reefs support 25% of all marine species despite covering less than 1% of the ocean floor.",
    "The ocean produces over 50% of the world's oxygen.",
  ];

  const randomFact = oceanFacts[Math.floor(Math.random() * oceanFacts.length)];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Your Eco Tips Dashboard
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Personalized recommendations based on your Ocean Health Score of {userData.oceanHealthScore}%. 
            Small changes create big waves of positive impact.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{userData.completedTips.length}</div>
            <div className="text-blue-200">Tips Completed</div>
          </div>
          
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{userData.oceanHealthScore}%</div>
            <div className="text-blue-200">Ocean Health Score</div>
          </div>
          
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.round(userData.completedTips.length * 2.5)}kg</div>
            <div className="text-blue-200">CO₂ Saved (est.)</div>
          </div>
        </div>

        {/* Personalized Tips */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-100 mb-6">Personalized Action Tips</h2>
            
            {tips.map((tip) => {
              const IconComponent = tip.icon;
              const isCompleted = userData.completedTips.includes(tip.id);
              
              return (
                <div
                  key={tip.id}
                  className={`bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 transition-all duration-300 ${
                    isCompleted ? 'opacity-75 bg-green-900/20 border-green-700/50' : 'hover:bg-blue-700/40'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tip.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-cyan-100">{tip.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tip.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                          tip.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {tip.impact} Impact
                        </span>
                      </div>
                      
                      <p className="text-blue-200 text-sm mb-3">{tip.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-300 font-medium">{tip.category}</span>
                        
                        {!isCompleted ? (
                          <button
                            onClick={() => completeTip(tip.id)}
                            className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Mark Complete</span>
                          </button>
                        ) : (
                          <div className="flex items-center space-x-2 text-green-400">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Completed!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ocean Fact */}
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-cyan-100 mb-4">🌊 Ocean Fact</h3>
              <p className="text-blue-200 italic">"{randomFact}"</p>
            </div>

            {/* Daily Reminder */}
            <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-cyan-100 mb-4">Daily Eco Ping</h3>
              <p className="text-blue-200 text-sm mb-4">
                Get daily reminders and motivation to stick to your eco-friendly goals.
              </p>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    reminderEnabled ? 'bg-cyan-500' : 'bg-blue-700'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    reminderEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
                <span className="text-blue-200 text-sm">
                  {reminderEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              {reminderEnabled && (
                <div className="mt-4 p-3 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                  <div className="flex items-center space-x-2 text-cyan-300">
                    <Bell className="w-4 h-4" />
                    <span className="text-sm font-medium">Daily reminders activated!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Achievement Badges */}
            <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-cyan-100 mb-4">Your Achievements</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {userData.completedTips.length >= 1 && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-yellow-200 font-medium">First Step</div>
                  </div>
                )}
                
                {userData.completedTips.length >= 3 && (
                  <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <Recycle className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-green-200 font-medium">Eco Warrior</div>
                  </div>
                )}
                
                {userData.oceanHealthScore >= 80 && (
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-blue-200 font-medium">Ocean Guardian</div>
                  </div>
                )}
                
                {userData.completedTips.length >= 5 && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 text-center">
                    <FishIcon className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-xs text-purple-200 font-medium">Marine Hero</div>
                  </div>
                )}
              </div>
              
              {userData.completedTips.length === 0 && (
                <p className="text-blue-300 text-sm text-center italic">
                  Complete your first tip to earn badges!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTipsDashboard;