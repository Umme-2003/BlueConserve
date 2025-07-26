import React, { useState } from 'react';
import { Calculator, ArrowRight, Turtle, Waves, Fish } from 'lucide-react';
import { UserData } from '../App';

interface ImpactCalculatorProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
  setCurrentPage: (page: string) => void;
}

const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ userData, setUserData, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    plasticUse: userData.plasticUse,
    seafoodConsumption: userData.seafoodConsumption,
    transportation: userData.transportation,
    waterUsage: userData.waterUsage,
  });

  const calculateOceanHealthScore = () => {
    let score = 100;
    
    // Plastic use impact (0-50 bottles per week)
    score -= Math.min(formData.plasticUse * 1.5, 30);
    
    // Seafood consumption impact (0-20 meals per week)
    score -= Math.min(formData.seafoodConsumption * 2, 25);
    
    // Transportation impact
    const transportationImpact = {
      'walk': 0,
      'bike': 0,
      'public': 5,
      'car': 20,
      'plane': 30
    };
    score -= transportationImpact[formData.transportation as keyof typeof transportationImpact] || 0;
    
    // Water usage impact (5-60 minutes)
    score -= Math.min((formData.waterUsage - 5) * 0.8, 20);
    
    return Math.max(Math.round(score), 0);
  };

  const oceanHealthScore = calculateOceanHealthScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-400';
    if (score >= 40) return 'from-orange-400 to-red-400';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Ocean Health';
    if (score >= 60) return 'Good Ocean Health';
    if (score >= 40) return 'Moderate Impact';
    return 'High Impact - Action Needed';
  };

  const handleSubmit = () => {
    const updatedUserData = {
      ...userData,
      ...formData,
      oceanHealthScore,
    };
    setUserData(updatedUserData);
    setCurrentPage('simulator');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Calculator className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Ocean Impact Calculator
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Discover how your daily choices affect marine ecosystems and get your personalized Ocean Health Score.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-100">Your Lifestyle Habits</h2>
            
            <div className="space-y-6">
              {/* Plastic Use */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-3">
                  Plastic bottles per week: {formData.plasticUse}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.plasticUse}
                  onChange={(e) => setFormData({ ...formData, plasticUse: parseInt(e.target.value) })}
                  className="w-full h-2 bg-blue-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-blue-300 mt-1">
                  <span>0</span>
                  <span>50+</span>
                </div>
              </div>

              {/* Seafood Consumption */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-3">
                  Seafood meals per week: {formData.seafoodConsumption}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.seafoodConsumption}
                  onChange={(e) => setFormData({ ...formData, seafoodConsumption: parseInt(e.target.value) })}
                  className="w-full h-2 bg-blue-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-blue-300 mt-1">
                  <span>0</span>
                  <span>20+</span>
                </div>
              </div>

              {/* Transportation */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-3">
                  Primary transportation method
                </label>
                <select
                  value={formData.transportation}
                  onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                  className="w-full bg-blue-700/50 border border-blue-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="walk">Walking/Cycling</option>
                  <option value="public">Public Transport</option>
                  <option value="car">Private Car</option>
                  <option value="plane">Frequent Flying</option>
                </select>
              </div>

              {/* Water Usage */}
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-3">
                  Daily shower time (minutes): {formData.waterUsage}
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={formData.waterUsage}
                  onChange={(e) => setFormData({ ...formData, waterUsage: parseInt(e.target.value) })}
                  className="w-full h-2 bg-blue-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-blue-300 mt-1">
                  <span>5 min</span>
                  <span>60+ min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Section */}
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-100">Your Ocean Health Score</h2>
            
            <div className="text-center mb-8">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-blue-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - oceanHealthScore / 100)}`}
                    className={`bg-gradient-to-r ${getScoreColor(oceanHealthScore)} transition-all duration-1000`}
                    style={{
                      stroke: oceanHealthScore >= 80 ? '#10b981' : 
                              oceanHealthScore >= 60 ? '#f59e0b' :
                              oceanHealthScore >= 40 ? '#f97316' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{oceanHealthScore}</div>
                    <div className="text-sm text-blue-200">/ 100</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-cyan-100 mb-2">{getScoreLabel(oceanHealthScore)}</h3>
              <p className="text-blue-200 text-sm">
                {oceanHealthScore >= 80 ? 'Your lifestyle choices support healthy oceans!' :
                 oceanHealthScore >= 60 ? 'Good progress! Small changes can make a big difference.' :
                 oceanHealthScore >= 40 ? 'There\'s room for improvement to help marine life.' :
                 'Your choices significantly impact ocean health. Let\'s make some changes!'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-700/30 rounded-lg">
                <span className="text-blue-200 text-sm">Plastic Impact</span>
                <div className="flex items-center">
                  <div className={`w-16 h-2 rounded ${formData.plasticUse < 5 ? 'bg-green-500' : formData.plasticUse < 15 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-700/30 rounded-lg">
                <span className="text-blue-200 text-sm">Marine Life Impact</span>
                <div className="flex items-center">
                  <div className={`w-16 h-2 rounded ${formData.seafoodConsumption < 3 ? 'bg-green-500' : formData.seafoodConsumption < 8 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-700/30 rounded-lg">
                <span className="text-blue-200 text-sm">Carbon Footprint</span>
                <div className="flex items-center">
                  <div className={`w-16 h-2 rounded ${['walk', 'bike'].includes(formData.transportation) ? 'bg-green-500' : formData.transportation === 'public' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>See Your Ocean</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;