import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('statistics');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-slide-up">
          <span className="block">How does</span>
          <span className="block bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
            Ketaki Adhar
          </span>
          <span className="block">Helps Farmers</span>
          <span className="block bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
            Grow and Thrive
          </span>
        </h1>
        
        <div className="mt-16 animate-bounce-subtle">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors group"
          >
            <span className="text-lg font-medium">Scroll to Learn More</span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;