import React, { useState } from 'react';
import { Users, Heart, Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { UserData } from '../App';

interface CommunityPledgeProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const CommunityPledge: React.FC<CommunityPledgeProps> = ({ userData, setUserData }) => {
  const [userName, setUserName] = useState('');
  const [pledgeMessage, setPledgeMessage] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulated community data
  const totalPledges = 12345 + (userData.hasPledged ? 1 : 0);
  const recentPledges = [
    { name: 'Sarah M.', message: 'I pledge to reduce my plastic use by 80%!', time: '2 hours ago' },
    { name: 'Alex K.', message: 'Committed to sustainable seafood choices for my family.', time: '5 hours ago' },
    { name: 'Maya P.', message: 'No more single-use plastics in my household!', time: '1 day ago' },
    { name: 'David L.', message: 'Switching to public transport to reduce my carbon footprint.', time: '1 day ago' },
    { name: 'Emma R.', message: 'Organizing beach cleanups in my community!', time: '2 days ago' },
  ];

  const handlePledge = () => {
    if (userName.trim()) {
      setUserData({ ...userData, hasPledged: true });
      setShowShareOptions(true);
    }
  };

  const shareText = `I just pledged to protect marine life with BlueConserve! Join me in making a difference for our oceans. 🌊 #BlueConserve #OceanConservation`;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Join Our Ocean Community
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Together, we're creating waves of change. Make your pledge and inspire others to protect our marine ecosystems.
          </p>
        </div>

        {/* Community Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-700/50 rounded-full px-8 py-4">
            <Heart className="w-6 h-6 text-red-400" />
            <span className="text-2xl font-bold text-cyan-100">{totalPledges.toLocaleString()}</span>
            <span className="text-blue-200">ocean protectors have pledged so far!</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pledge Form */}
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
            {!userData.hasPledged ? (
              <>
                <h2 className="text-2xl font-bold text-cyan-100 mb-6">Make Your Pledge</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-blue-700/50 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-3">
                      Your Commitment (Optional)
                    </label>
                    <textarea
                      value={pledgeMessage}
                      onChange={(e) => setPledgeMessage(e.target.value)}
                      placeholder="Share your specific commitment to ocean conservation..."
                      rows={4}
                      className="w-full bg-blue-700/50 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-200 mb-2">The Ocean Pledge</h3>
                    <p className="text-blue-200 text-sm italic">
                      "I commit to protecting marine life and ocean ecosystems through conscious choices in my daily life. 
                      I will reduce my environmental impact and inspire others to join this vital mission."
                    </p>
                  </div>

                  <button
                    onClick={handlePledge}
                    disabled={!userName.trim()}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Make My Pledge</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h2>
                <p className="text-blue-200 mb-6">
                  You've officially joined our community of ocean protectors. Your commitment makes a difference!
                </p>
                
                {pledgeMessage && (
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 mb-6">
                    <p className="text-green-200 italic">"{pledgeMessage}"</p>
                    <p className="text-green-300 text-sm mt-2">- {userName}</p>
                  </div>
                )}

                <button
                  onClick={() => setShowShareOptions(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Your Pledge</span>
                </button>
              </div>
            )}
          </div>

          {/* Community Wall */}
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-cyan-100 mb-6">Recent Pledges</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userData.hasPledged && userName && (
                <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-cyan-200">{userName}</span>
                        <span className="text-xs text-blue-300">just now</span>
                      </div>
                      <p className="text-blue-200 text-sm">
                        {pledgeMessage || "I commit to protecting marine life!"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {recentPledges.map((pledge, index) => (
                <div key={index} className="bg-blue-700/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{pledge.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-blue-200">{pledge.name}</span>
                        <span className="text-xs text-blue-400">{pledge.time}</span>
                      </div>
                      <p className="text-blue-300 text-sm">{pledge.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareOptions && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-blue-800 border border-blue-700 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-cyan-100 mb-4 text-center">Share Your Impact</h3>
              <p className="text-blue-200 text-center mb-6">
                Inspire your friends and family to join the ocean conservation movement!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowShareOptions(false)}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPledge;