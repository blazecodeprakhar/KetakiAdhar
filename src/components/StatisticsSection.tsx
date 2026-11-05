import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { span } from 'framer-motion/client';

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && count < 21000) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 200, 21000));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isVisible, count]);

  return (
    <section id="statistics" className="pt-20 pb-0 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Text */}
          <div className="space-y-4 animate-slide-in-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-primary-600"> 21,000+ </span>
               Farmers Empowered by 
              <span className="text-primary-600"> Ketaki Adhar</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
              Over 21,000 farmers across India have received support through seeds, fertilizers, organic farming education, soil testing, tree plantation, and healthcare.
              </p>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-primary-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">600+ Million People</h3>
                <p className="text-gray-600">Depend on agriculture for their livelihood</p>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Counter */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              {/* Background circle */}
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative overflow-hidden p-4">
                <div className="absolute inset-4 rounded-full bg-white shadow-inner"></div>
                
                {/* Counter */}
                <div className="relative z-10 text-center px-4">
                  <div className="text-5xl md:text-6xl font-bold text-primary-600 leading-tight">
                    {count.toLocaleString()}+
                  </div>
                  <div className="text-gray-700 font-medium text-lg">
                    Farmers Empowered
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <TrendingUp className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="text-sm text-gray-600">Growing Impact</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-accent-400 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-12 left-12 w-3 h-3 bg-primary-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-8 w-2 h-2 bg-secondary-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;