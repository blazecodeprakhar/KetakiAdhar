import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const ContactUs = () => {
  const { t } = useLanguage();
  const c = t.contactPage;
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText('info@ketakiadhar.in');
      setCopiedEmail(true);
      showToast('Email address info@ketakiadhar.in copied to clipboard!', 'info');
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText('8062177240');
      setCopiedPhone(true);
      showToast('Phone number 8062177240 copied to clipboard!', 'info');
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: c.officeTitle,
      details: [c.officeAddress],
      color: "from-primary-500 to-primary-600",
      isEmail: false,
      isPhone: false,
    },
    {
      icon: Phone,
      title: c.phoneTitle,
      details: [c.phoneNumber, c.phoneHours],
      color: "from-emerald-500 to-teal-600",
      isEmail: false,
      isPhone: true,
      phoneHref: "tel:8062177240",
    },
    {
      icon: Mail,
      title: c.emailTitle,
      details: ["info@ketakiadhar.in", c.emailResponse],
      color: "from-accent-500 to-accent-600",
      isEmail: true,
      isPhone: false,
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitized = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData(prev => ({
      ...prev,
      [name]: sanitized
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
      showToast('Message sent! Our support desk will reach out within 24 hours.', 'success');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div id="contact" className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#02241b] bg-gradient-to-br from-[#021f17] via-[#064e3b] to-[#043324] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-500/20">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
              {c.heroTitle}
              <span className="block bg-gradient-to-r from-accent-300 via-primary-300 to-emerald-200 bg-clip-text text-transparent">
                {c.heroHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              {c.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col justify-between">
                  <div>
                    <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 flex items-center flex-wrap">
                          {info.isPhone && idx === 0 ? (
                            <a 
                              href={info.phoneHref}
                              className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                            >
                              {detail}
                            </a>
                          ) : info.isEmail && idx === 0 ? (
                            <a 
                              href="mailto:info@ketakiadhar.in"
                              className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <span>{detail}</span>
                          )}

                          {info.isPhone && idx === 0 && (
                            <button
                              type="button"
                              onClick={handleCopyPhone}
                              className="ml-2 text-xs bg-primary-100 hover:bg-primary-200 text-primary-800 px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer"
                              title="Copy phone number"
                            >
                              {copiedPhone ? 'Copied!' : 'Copy'}
                            </button>
                          )}

                          {info.isEmail && idx === 0 && (
                            <button
                              type="button"
                              onClick={handleCopyEmail}
                              className="ml-2 text-xs bg-primary-100 hover:bg-primary-200 text-primary-800 px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer"
                              title="Copy email address"
                            >
                              {copiedEmail ? 'Copied!' : 'Copy'}
                            </button>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {c.formTitle}
              </h2>
              <p className="text-lg text-gray-600">
                {c.formSubtitle}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              {isSubmitted ? (
                <div className="p-6 bg-primary-50 rounded-2xl text-center text-primary-800 font-semibold">
                  Thank you! Your message has been received. Our team will get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.fullName} *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={c.fullNamePl}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={c.emailPl}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.phone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={c.phonePl}
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.inquiryType} *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                    >
                      {c.inquiryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.subject} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={c.subjectPl}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {c.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y"
                      placeholder={c.messagePl}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-xl font-semibold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>{c.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
