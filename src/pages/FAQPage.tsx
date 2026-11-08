import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQ = () => {
  const { t } = useLanguage();
  const f = t.faqPage;
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    question: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FAQ Question submitted:', formData);
    setIsSubmitted(true);
    setFormData({ fullName: '', email: '', question: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#02241b] bg-gradient-to-br from-[#021f17] via-[#064e3b] to-[#043324] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-500/20">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
              {f.heroTitle}
              <span className="block bg-gradient-to-r from-accent-300 via-primary-300 to-emerald-200 bg-clip-text text-transparent">
                {f.heroHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              {f.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {f.faqs.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary-600">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ask a Question Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {f.askTitle}
              </h2>
              <p className="text-gray-600">
                {f.askSubtitle}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              {isSubmitted ? (
                <div className="p-6 bg-primary-50 rounded-2xl text-center text-primary-800 font-semibold">
                  {f.successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      {f.formName} *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={f.formName}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {f.formEmail} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
                      {f.formQuestion} *
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      rows={4}
                      value={formData.question}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y"
                      placeholder={f.formQuestion}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-xl font-semibold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>{f.formBtn}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct contact hint */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                {f.emailDirectly}{' '}
                <a href="mailto:info@ketakiadhar.in" className="text-primary-600 font-semibold hover:underline">
                  info@ketakiadhar.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
