import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ClimateSection = () => {
  const { t } = useLanguage();
  const c = t.climate;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Content section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">
              {c.title1}
              <span className="text-accent-400"> {c.titleHighlight}</span>
            </h2>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {c.desc}
          </p>

          <p className="text-2xl font-semibold text-white mb-12">
            {c.quote1}
            <span className="text-red-400"> {c.quoteHighlight}</span>
          </p>

          {/* Climate stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{c.stat1Val}</div>
              <div className="text-gray-300">{c.stat1Label}</div>
              <div className="text-sm text-gray-400 mt-2">{c.stat1Desc}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{c.stat2Val}</div>
              <div className="text-gray-300">{c.stat2Label}</div>
              <div className="text-sm text-gray-400 mt-2">{c.stat2Desc}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">{c.stat3Val}</div>
              <div className="text-gray-300">{c.stat3Label}</div>
              <div className="text-sm text-gray-400 mt-2">{c.stat3Desc}</div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              {c.ctaTitle}
            </h3>
            <p className="text-primary-100 text-lg">
              {c.ctaSubtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateSection;
