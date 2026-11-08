import React from 'react';
import { Heart, Target, Eye, Users, Leaf, Shield, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();
  const a = t.aboutPage;

  const valueIcons = [Heart, Shield, Leaf, Award];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#02241b] bg-gradient-to-br from-[#021f17] via-[#064e3b] to-[#043324] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-md">
              {a.heroTitle}
              <span className="block bg-gradient-to-r from-accent-300 via-primary-300 to-emerald-200 bg-clip-text text-transparent">
                {a.heroHighlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              {a.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20" id="programs">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {a.storyP1}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {a.storyP2}
                </p>
                <p className="text-xl font-semibold text-primary-600">
                  {a.storyP3}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/donate#pledge-form" 
                  className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>{a.btnImpact}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/volunteer#volunteer-form"
                  className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all text-center"
                >
                  {a.btnMission}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div 
                    className="h-48 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop')`
                    }}
                  />
                  <div 
                    className="h-32 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop')`
                    }}
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <div 
                    className="h-32 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop')`
                    }}
                  />
                  <div 
                    className="h-48 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop')`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{a.missionTitle}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {a.missionP1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {a.missionP2}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {a.missionP3}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{a.visionTitle}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {a.visionP1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {a.visionP2}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {a.visionP3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {a.valuesTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {a.valuesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.values.map((value, index) => {
              const Icon = valueIcons[index] || Heart;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-all">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-primary-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {a.impactTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {a.impactSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50" id="volunteer">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {a.ctaTitle}
              </h3>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                {a.ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/donate#pledge-form"
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-center"
                >
                  {a.ctaBtn1}
                </Link>
                <Link 
                  to="/volunteer#volunteer-form"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all text-center"
                >
                  {a.ctaBtn2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
