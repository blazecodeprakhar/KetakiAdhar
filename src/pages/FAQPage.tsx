import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Send } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    question: ''
  });

  const faqs = [
    {
      question: "What is Ketaki Adhar and what does it do?",
      answer: "Ketaki Adhar is a non-profit organization that supports Indian farmers through seed distribution, soil testing, healthcare, weather updates, and organic farming education."
    },
    {
      question: "How does Ketaki Adhar help farmers?",
      answer: "We provide free seeds and fertilizers, conduct soil tests, share daily weather updates, organize medical camps, and train farmers in sustainable farming practices."
    },
    {
      question: "Which regions does Ketaki Adhar work in?",
      answer: "We currently support farmers in more than 10 states across India and continue to expand our reach every year."
    },
    {
      question: "How many farmers has Ketaki Adhar helped so far?",
      answer: "More than 21,000 farmers have been supported through our programs and services."
    },
    {
      question: "Is Ketaki Adhar a government organization?",
      answer: "No, Ketaki Adhar is an independent non-profit organization. We collaborate with local communities, NGOs, and partners to create lasting impact."
    },
    {
      question: "How can I contribute to Ketaki Adhar's mission?",
      answer: "You can contribute by donating, volunteering, or partnering with us. Every form of support helps us reach more farmers."
    },
    {
      question: "How do farmers receive support from Ketaki Adhar?",
      answer: "Farmers are connected to us through field visits, local coordinators, and awareness drives. We provide support based on the specific needs of each region."
    },
    {
      question: "Are your services free for farmers?",
      answer: "Yes, all our services including seed distribution, medical camps, and soil testing are offered free of cost to farmers."
    },
    {
      question: "Does Ketaki Adhar promote organic farming?",
      answer: "Yes, we educate farmers on organic and sustainable farming methods to help reduce dependency on chemicals and improve long-term soil health."
    },
    {
      question: "Can individuals volunteer with Ketaki Adhar?",
      answer: "Yes, we welcome volunteers who are passionate about rural development and agriculture. You can fill out the contact form to express your interest."
    },
    {
      question: "Does Ketaki Adhar work with other NGOs or organizations?",
      answer: "Yes, we often collaborate with like-minded NGOs, government bodies, and rural cooperatives to increase our impact and reach more farmers."
    },
    {
      question: "How is the impact of your work measured?",
      answer: "We track the number of farmers supported, regions covered, soil tests conducted, medical camps held, and qualitative feedback from the communities we serve."
    },
    {
      question: "Are your services limited to small-scale farmers?",
      answer: "Our support is open to all farmers, but we primarily focus on small and marginal farmers who lack access to basic agricultural resources and support."
    },
    {
      question: "What kind of medical support do you offer?",
      answer: "We conduct periodic medical camps in rural areas to offer free checkups, consultations, and basic medicines to farmers and their families."
    },
    {
      question: "How can I get in touch with your team?",
      answer: "You can contact us through the form on our website or by email at contact@ketakiadhar.org. You can also call us at +91-XXXXXXXXXX."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ fullName: '', email: '', question: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Frequently Asked
              <span className="block text-accent-400">Questions</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Find answers to common questions about our mission, services, and how we support farmers across India.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-primary-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Still Have a Question?
              </h2>
              <p className="text-xl text-gray-600">
                We're here to help. Send us your question and someone from our team will get back to you soon.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="What would you like to know about our work with farmers?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Question</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-primary-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Need Immediate Assistance?</h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Email:</span>
                <a href="mailto:contact@ketakiadhar.org" className="text-accent-400 hover:text-accent-300 transition-colors">
                info@ketakiadhar.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Phone:</span>
                <a href="tel:+91XXXXXXXXXX" className="text-accent-400 hover:text-accent-300 transition-colors">
                  +91-XXXXXXXXXX
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;