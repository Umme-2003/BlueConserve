import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImpactCalculator from './components/ImpactCalculator';
import EcosystemSimulator from './components/EcosystemSimulator';
import EcoTipsDashboard from './components/EcoTipsDashboard';
import CommunityPledge from './components/CommunityPledge';
import FloatingAnimations from './components/FloatingAnimations';

export interface UserData {
  plasticUse: number;
  seafoodConsumption: number;
  transportation: string;
  waterUsage: number;
  oceanHealthScore: number;
  completedTips: string[];
  hasPledged: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [userData, setUserData] = useState<UserData>({
    plasticUse: 0,
    seafoodConsumption: 0,
    transportation: 'car',
    waterUsage: 10,
    oceanHealthScore: 50,
    completedTips: [],
    hasPledged: false,
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'calculator':
        return <ImpactCalculator userData={userData} setUserData={setUserData} setCurrentPage={setCurrentPage} />;
      case 'simulator':
        return <EcosystemSimulator userData={userData} />;
      case 'tips':
        return <EcoTipsDashboard userData={userData} setUserData={setUserData} />;
      case 'community':
        return <CommunityPledge userData={userData} setUserData={setUserData} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      <FloatingAnimations />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} userData={userData} />
      <main className="relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;