import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StatisticsSection = () => {
  const { t } = useLanguage();
  const s = t.statistics;
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
                <span className="text-primary-600">{s.number} </span>
                {s.titleMiddle}
                <span className="text-primary-600"> {s.brand}</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-primary-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{s.card1Title}</h3>
                <p className="text-gray-600">{s.card1Desc}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-secondary-50 rounded-2xl">
              <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{s.card2Title}</h3>
                <p className="text-gray-600">{s.card2Desc}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Counter / Stats Display */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
              <span className="text-5xl md:text-6xl font-extrabold text-primary-600 font-mono">
                {count.toLocaleString()}+
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {s.titleMiddle} {s.brand}
            </h3>
            <p className="text-gray-600">
              {s.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
