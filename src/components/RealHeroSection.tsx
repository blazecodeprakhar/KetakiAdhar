import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const RealHeroSection = () => {
  const { t } = useLanguage();
  const r = t.realHero;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {r.title}
            <span className="block text-primary-600"> {r.titleHighlight}</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Hero text */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed">
                {r.line1}
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-primary-600 leading-relaxed">
                {r.line2}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {r.line3}
              </p>
              <p className="text-xl font-medium text-gray-900">
                {r.line4}
              </p>
              <p className="text-lg text-gray-700">
                {r.line5}
                <span className="text-primary-600 font-semibold"> {r.line5Highlight}</span>
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/donate"
                className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg text-center"
              >
                {r.btnSupport}
              </Link>
              <Link 
                to="/our-story"
                className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all text-center"
              >
                {r.btnStories}
              </Link>
            </div>
          </div>

          {/* Right side - Hero visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1710170909047-135c7a010e41?q=80&w=1974&auto=format&fit=crop"
                alt="Farmer working in field"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Every Grain Tells a Story Section */}
        <div className="mt-16">
          <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {r.grainTitle}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {r.grainDesc}
              </p>
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600">{r.stat1Val}</div>
                  <div className="text-gray-600">{r.stat1Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600">{r.stat2Val}</div>
                  <div className="text-gray-600">{r.stat2Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600">{r.stat3Val}</div>
                  <div className="text-gray-600">{r.stat3Label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealHeroSection;
