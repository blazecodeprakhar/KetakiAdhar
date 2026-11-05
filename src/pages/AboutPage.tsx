import React from 'react';
import { Heart, Target, Eye, Users, Leaf, Shield, Award, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every farmer with respect and understanding"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building lasting relationships through reliable support"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting practices that protect our environment"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering quality services that make a real difference"
    }
  ];

  const stats = [
    { number: "21,000+", label: "Farmers Supported" },
    { number: "10+", label: "States Covered" },
    { number: "500+", label: "Medical Camps" },
    { number: "15,000+", label: "Soil Tests Conducted" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              A Promise in
              <span className="block text-accent-400">Every Seed</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Farming is more than a profession. It is the foundation of life in India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Ketaki Adhar, we work to support the people who grow our food. From seed and fertilizer distribution to soil testing, daily weather updates, and rural medical camps, we provide practical help where it matters most.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We aim to reduce risk, improve well-being, and empower farmers with the tools and knowledge they need to grow with confidence.
                </p>
                <p className="text-xl font-semibold text-primary-600">
                  Our journey is built on one belief: No farmer should be left behind.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>See Our Impact</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all">
                  Join Our Mission
                </button>
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
                  ></div>
                  <div 
                    className="h-32 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop')`
                    }}
                  ></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div 
                    className="h-32 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop')`
                    }}
                  ></div>
                  <div 
                    className="h-48 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop')`
                    }}
                  ></div>
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
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To empower India's farmers by providing access to quality seeds, soil testing, weather updates, healthcare, and education in sustainable farming.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We focus on reducing financial pressure, improving crop outcomes, and supporting the overall well-being of farming communities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ketaki Adhar works closely with farmers in the field to offer consistent support and restore dignity to one of the most essential professions in our country.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To build a future where every farmer in India has the opportunity to thrive.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We imagine a nation where agriculture is respected, rural communities are self-reliant, and farmers have access to the tools, knowledge, and care they deserve.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through long-term, grassroots efforts, Ketaki Adhar aims to create lasting change in the lives of farmers across all regions of India.
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-all">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
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
              Our Impact So Far
            </h2>
            <p className="text-xl text-gray-300">
              Real numbers, real change, real lives transformed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Join Us in Making a Difference
              </h3>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Every farmer we support, every seed we provide, every life we touch - it all starts with people like you who believe in our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Start Supporting Farmers
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all">
                  Learn About Volunteering
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;