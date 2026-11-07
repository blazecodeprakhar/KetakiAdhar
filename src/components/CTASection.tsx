import React from 'react';
import { HandHeart, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CTASection = () => {
  const { t } = useLanguage();
  const c = t.cta;

  const actions = [
    {
      icon: TrendingUp,
      title: c.card1Title,
      description: c.card1Desc,
      buttonText: c.card1Btn,
      link: "/our-story",
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      hoverColor: "hover:bg-primary-100"
    },
    {
      icon: HandHeart,
      title: c.card2Title,
      description: c.card2Desc,
      buttonText: c.card2Btn,
      link: "/donate",
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
      hoverColor: "hover:bg-accent-100"
    },
    {
      icon: Users,
      title: c.card3Title,
      description: c.card3Desc,
      buttonText: c.card3Btn,
      link: "/volunteer",
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      hoverColor: "hover:bg-secondary-100"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-white via-primary-25 to-secondary-25">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {c.title}
            <span className="block text-primary-600"> {c.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {actions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <div
                key={index}
                className={`group ${action.bgColor} rounded-3xl p-8 ${action.hoverColor} transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {action.description}
                  </p>
                  
                  <Link 
                    to={action.link}
                    className={`w-full bg-gradient-to-r ${action.color} text-white py-4 px-6 rounded-full font-semibold hover:shadow-lg transition-all group-hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>{action.buttonText}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section with urgency */}
        <div className="bg-gradient-to-r from-gray-900 to-primary-900 rounded-3xl p-12 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {c.urgencyTitle}
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {c.urgencyDesc}
            </p>
            
            {/* Urgency stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-accent-400 mb-2">{c.urgency1Val}</div>
                <div className="text-gray-300">{c.urgency1Label}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-400 mb-2">{c.urgency2Val}</div>
                <div className="text-gray-300">{c.urgency2Label}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary-400 mb-2">{c.urgency3Val}</div>
                <div className="text-gray-300">{c.urgency3Label}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/donate"
                className="bg-accent-500 text-white px-8 py-4 rounded-full font-bold hover:bg-accent-600 transition-all transform hover:scale-105 shadow-lg text-center"
              >
                {c.urgencyBtn1}
              </Link>
              <Link 
                to="/our-story"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all text-center"
              >
                {c.urgencyBtn2}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
