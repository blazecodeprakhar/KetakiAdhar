import React from 'react';
import { CloudRain, Sun, AlertTriangle } from 'lucide-react';

const ClimateSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Split screen layout */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* <div className="relative">
            <div 
              className="h-96 lg:h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <Sun className="w-16 h-16 text-accent-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Good Season</h3>
                <p className="text-primary-100">When nature cooperates</p>
              </div>
            </div>
          </div> */}

          {/* Right side - Dried, cracked field */}
          {/* <div className="relative">
            <div 
              className="h-96 lg:h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-l from-red-900/90 to-orange-900/90"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <CloudRain className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Harsh Reality</h3>
                <p className="text-red-100">When climate strikes</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Content section */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Climate Change Hits 
              <span className="text-accent-400"> Farmers First</span>
            </h2>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Erratic rains, extreme heat, and poor soil affect farmers more than anyone else.
          </p>

          <p className="text-2xl font-semibold text-white mb-12">
            And yet, they are the 
            <span className="text-red-400"> least protected</span>.
          </p>

          {/* Climate stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">40°C+</div>
              <div className="text-gray-300">Extreme Heat Days</div>
              <div className="text-sm text-gray-400 mt-2">Increasing every year</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
              <div className="text-gray-300">Rainfall Variability</div>
              <div className="text-sm text-gray-400 mt-2">Unpredictable patterns</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">₹3L</div>
              <div className="text-gray-300">Average Crop Loss</div>
              <div className="text-sm text-gray-400 mt-2">Per affected farmer</div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
            Ketaki Adhar provides daily weather updates to farmers, helping them make smarter decisions about sowing, irrigation, and harvest.
            </h3>
            <p className="text-primary-100 text-lg mb-6">
            This reduces risk in an unpredictable climate.
            </p>
            {/* <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Learn About Our Solutions
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateSection;