import React from 'react';
import { ChevronDown, BarChart3, Fish, Lightbulb } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'Eco Impact Tracker',
      description: 'Analyze how your habits affect the ocean.',
      color: 'from-orange-400 to-red-400',
    },
    {
      icon: Fish,
      title: 'Marine Life Simulator',
      description: 'See your choices reflected in a living ecosystem.',
      color: 'from-cyan-400 to-blue-400',
    },
    {
      icon: Lightbulb,
      title: 'Smart Tips',
      description: 'Get personalized tips to reduce your footprint.',
      color: 'from-green-400 to-teal-400',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-blue-900/60 z-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-teal-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-cyan-300/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="text-center z-20 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent leading-tight">
            BlueConserve
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-4 text-blue-100">
            Your Virtual Marine Sanctuary
          </p>
          <p className="text-lg md:text-xl mb-12 text-blue-200 font-medium tracking-wide">
            Track. Simulate. Transform.
          </p>
          
          <button
            onClick={() => setCurrentPage('calculator')}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            Get Started
            <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Discover Your Ocean Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8 hover:bg-blue-700/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-100">{feature.title}</h3>
                  <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-100">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of ocean defenders in creating a sustainable future for our marine ecosystems.
          </p>
          <button
            onClick={() => setCurrentPage('calculator')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;