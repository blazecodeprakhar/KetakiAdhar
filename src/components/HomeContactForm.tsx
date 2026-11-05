import React, { useState } from 'react';
import { Send, CheckCircle, Heart, Users, Handshake, BookOpen } from 'lucide-react';

const HomeContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    contributions: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contributionOptions = [
    { value: 'volunteer', label: 'Volunteer', icon: Users },
    { value: 'support', label: 'Support A Farmer', icon: Heart },
    { value: 'partner', label: 'Partner with Us', icon: Handshake },
    { value: 'learn', label: 'Learn More', icon: BookOpen }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContributionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contributions: prev.contributions.includes(value)
        ? prev.contributions.filter(item => item !== value)
        : [...prev.contributions, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        contributions: []
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Thank you for reaching out!
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We've received your message and will get in touch with you shortly. 
                Together, let's build a stronger future for our farmers.
              </p>
              
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">24hrs</div>
                  <div className="text-gray-600 text-sm">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-600">100%</div>
                  <div className="text-gray-600 text-sm">Commitment</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-600">∞</div>
                  <div className="text-gray-600 text-sm">Impact Together</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want to Support Farmers
              <span className="block text-primary-600">with Us?</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our mission or get in touch. We'd love to hear from you.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
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

              {/* Email */}
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
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-gray-500">(optional)</span>
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

              {/* Contribution Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  How Would You Like to Contribute? *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {contributionOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.contributions.includes(option.value);
                    
                    return (
                      <div
                        key={option.value}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'bg-primary-50 border-2 border-primary-500 shadow-md' 
                            : 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                        } rounded-xl p-4`}
                        onClick={() => handleContributionChange(option.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-primary-500' : 'bg-gray-300'
                          } transition-colors`}>
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <div className="flex-1">
                            <span className={`font-medium ${
                              isSelected ? 'text-primary-700' : 'text-gray-700'
                            }`}>
                              {option.label}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'bg-primary-500 border-primary-500' 
                              : 'border-gray-300'
                          } transition-colors`}>
                            {isSelected && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {formData.contributions.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">Please select at least one option</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formData.contributions.length === 0}
                className={`w-full py-4 px-8 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                  formData.contributions.length > 0
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Join Our Mission</span>
              </button>
            </form>
          </div>

          {/* Bottom encouragement */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Every contribution, big or small, makes a difference in a farmer's life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;