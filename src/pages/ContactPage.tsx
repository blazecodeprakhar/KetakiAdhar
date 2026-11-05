import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Heart } from 'lucide-react';

const ContactUs = () => {
  // This ID will be used for navigation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Mahatma Gandhi road, Mumbai,India"],
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@ketakiadhar.com", "We respond within 24 hours"],
      color: "from-accent-500 to-accent-600"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'donation', label: 'Donation & Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'farmer', label: 'Farmer Support Request' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  return (
    <div id="contact" className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get in Touch
              <span className="block text-accent-400">With Our Team</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Whether you want to support farmers, volunteer, or learn more about our mission, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <div className="rounded-3xl overflow-hidden shadow-lg h-[450px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15082.2937490453!2d72.8261551!3d18.9344071!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1ddab621f5f%3A0xda1a81e5567231cc!2sMahatma%20Gandhi%20Road%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1751478470999" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ketaki Adhar Location"
                ></iframe>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Join Our Community</h4>
                      <p className="text-gray-600 text-sm">Connect with like-minded individuals working for farmer welfare</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Make a Difference</h4>
                      <p className="text-gray-600 text-sm">Every conversation can lead to positive change for farmers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Get Expert Guidance</h4>
                      <p className="text-gray-600 text-sm">Our team is here to answer all your questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-primary-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Need Urgent Farmer Support?</h3>
            <p className="text-lg text-gray-300 mb-8">
              If you're a farmer in immediate need of assistance, please contact our emergency helpline
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <a 
                href="tel:+91XXXXXXXXXX" 
                className="bg-red-500 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Emergency Helpline: +91-XXXXXXXXXX</span>
              </a>
              <p className="text-gray-300">Available 24/7 for urgent farmer support</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ContactUs;