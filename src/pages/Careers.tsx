import React, { useState } from 'react';
import { Upload, Send, Users, Heart, Target, Award, FileText, CheckCircle } from 'lucide-react';

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const benefits = [
    {
      icon: Heart,
      title: "Meaningful Work",
      description: "Make a real difference in farmers' lives every day"
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Work with passionate individuals who share your values"
    },
    {
      icon: Target,
      title: "Clear Mission",
      description: "Be part of a focused effort to empower rural communities"
    },
    {
      icon: Award,
      title: "Growth Opportunities",
      description: "Develop your skills while contributing to social impact"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setFormData(prev => ({
          ...prev,
          resume: file
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resume: null,
        message: ''
      });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-xl p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Application Submitted Successfully!
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Thank you for your interest in joining Ketaki Adhar. We will review your application and get back to you if there's a suitable opportunity.
                </p>
                
                <div className="bg-primary-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-primary-700 mb-2">What happens next?</h4>
                  <ul className="text-sm text-primary-600 space-y-1">
                    <li>• Our team will review your application within 5-7 business days</li>
                    <li>• If your profile matches our requirements, we'll contact you for an interview</li>
                    <li>• We'll keep your application on file for future opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1459503/pexels-photo-1459503.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Careers at
              <span className="block text-accent-400">Ketaki Adhar</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-100 mb-6">
              Want to Make a Difference?
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed">
              If you're passionate about empowering farmers and creating real change in rural India, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Join Our Mission?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a team that's making a real difference in the lives of farmers across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                📄 Apply Now
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below to apply or express your interest in working with us.
              </p>
            </div>

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
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Resume *
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    
                    {formData.resume ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <p className="text-green-600 font-medium">{formData.resume.name}</p>
                        <p className="text-sm text-gray-500">Click to change file</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600 font-medium">
                          Drag and drop your resume here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports PDF, DOC, DOCX files
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to work with us? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your passion for rural development and how you'd like to contribute to our mission..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
              </form>
            </div>

            {/* Bottom Note */}
            <div className="text-center mt-8 bg-primary-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>We will review your application and get back to you if there's a suitable opportunity.</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Even if we don't have an immediate opening, we'll keep your application on file for future opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-primary-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to Make an Impact?</h3>
            <p className="text-lg text-gray-300 mb-8">
              Join us in building a stronger future for India's farmers
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Questions?</span>
                <a href="mailto:hr@ketakiadhar.com" className="text-accent-400 hover:text-accent-300 transition-colors">
                  hr@ketakiadhar.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;