import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SupportArea = () => {
  const { t } = useLanguage();
  const s = t.supportArea;

  const images = [
    '/seed.png',
    '/soil_test.png',
    '/medical.png',
    '/weather.png'
  ];

  return (
    <section id="initiatives" className="py-12 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {s.title} 
            <span className="text-primary-600"> {s.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {s.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {s.items.map((challenge, index) => (
            <div key={index} className="group transition-all duration-300 ease-in-out hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
                <img
                  src={images[index]}
                  alt={challenge.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                  <h3
                    className="text-white font-bold uppercase text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight break-words"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif'
                    }}
                  >
                    {challenge.title}
                  </h3>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 text-base leading-relaxed mb-4">{challenge.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportArea;
