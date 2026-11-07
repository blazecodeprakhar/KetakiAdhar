import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle, 
  Award, 
  Sprout, 
  Droplets, 
  Users, 
  Building2, 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PledgeFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  city: string;
  supportPillar: string;
  supporterType: string;
  contributionModes: string[];
  message: string;
}

const initialFormData: PledgeFormData = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  city: '',
  supportPillar: 'water-soil',
  supporterType: 'individual',
  contributionModes: ['program-grant'],
  message: ''
};

const pillarIcons = [Droplets, Sprout, Heart, Users];

const DonationPage = () => {
  const { t } = useLanguage();
  const d = t.donationPage;
  const [formData, setFormData] = useState<PledgeFormData>(initialFormData);

  const supportPillars = (d.pillars || []).map((pillar, idx) => ({
    ...pillar,
    icon: pillarIcons[idx] || Droplets,
  }));

  const contributionOptions = d.contributionOptions || [];
  const supporterTypes = d.supporterTypes || [];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pledgeCode, setPledgeCode] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModeToggle = (modeId: string) => {
    setFormData(prev => ({
      ...prev,
      contributionModes: prev.contributionModes.includes(modeId)
        ? prev.contributionModes.filter(m => m !== modeId)
        : [...prev.contributionModes, modeId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = 'KA-PLEDGE-' + Math.floor(100000 + Math.random() * 900000);
      setPledgeCode(code);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#02241b] bg-gradient-to-br from-[#021f17] via-[#064e3b] to-[#043324] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-md backdrop-blur-md"
            >
              <Heart className="w-4 h-4 text-accent-400" />
              <span>{d.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md"
            >
              <span className="block text-white">{d.title1}</span>
              <span className="block bg-gradient-to-r from-accent-300 via-primary-300 to-emerald-200 bg-clip-text text-transparent">
                {d.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm"
            >
              {d.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Impact Pillars Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50/50 via-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
              {d.pillarsBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
              {d.pillarsTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {d.pillarsDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {supportPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-800">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-primary-600">
                    <span>{d.activeField}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support & Contribution Pledge Form */}
      <section className="py-20 bg-white" id="pledge-form">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl shadow-xl p-8 md:p-14 text-center border border-primary-100"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {d.successTitle}
                  </h3>

                  <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
                    {d.successDesc}
                  </p>

                  <div className="bg-primary-50/80 rounded-2xl p-6 max-w-md mx-auto mb-8 border border-primary-100 text-left">
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{d.ref}</span>
                      <span className="font-mono font-bold text-primary-800">{pledgeCode}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{d.patronName}</span>
                      <span className="font-semibold text-gray-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{d.email}</span>
                      <span className="font-semibold text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{d.status}</span>
                      <span className="font-bold text-green-700 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                        {d.statusVal}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData(initialFormData);
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    {d.submitAnother}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
                >
                  <div className="text-center mb-10">
                    <span className="text-xs uppercase font-bold tracking-widest text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                      {d.pledgeBadge}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
                      {d.pledgeTitle}
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                      {d.pledgeSubtitle}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Supporter Type Tabs */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                        {d.contributingAs}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {supporterTypes.map((type) => {
                          const isSelected = formData.supporterType === type.value;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, supporterType: type.value }))}
                              className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all border-2 text-center cursor-pointer ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-sm'
                                  : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-gray-50'
                              }`}
                            >
                              {type.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Donor Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.fullName} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder={d.fullNamePl}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.email} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder={d.emailPl}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.phone} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder={d.phonePl}
                          />
                        </div>
                      </div>

                      {/* Organization / Company */}
                      <div>
                        <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.org} <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder={d.orgPl}
                          />
                        </div>
                      </div>

                      {/* City / State */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.city} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder={d.cityPl}
                          />
                        </div>
                      </div>

                      {/* Pillar of Focus */}
                      <div className="md:col-span-2">
                        <label htmlFor="supportPillar" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.initiative} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="supportPillar"
                          name="supportPillar"
                          value={formData.supportPillar}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white text-gray-900"
                        >
                          {supportPillars.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))}
                          <option value="general-mission">General Mission Fund & Foundation Operations</option>
                        </select>
                      </div>

                      {/* Contribution Modes */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          {d.natureCont}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {contributionOptions.map((opt) => {
                            const isChecked = formData.contributionModes.includes(opt.id);
                            return (
                              <div
                                key={opt.id}
                                onClick={() => handleModeToggle(opt.id)}
                                className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                                  isChecked
                                    ? 'border-primary-500 bg-primary-50/70 text-primary-900'
                                    : 'border-gray-200 hover:border-primary-200 bg-gray-50/50 text-gray-700'
                                }`}
                              >
                                <span className="text-sm font-medium">{opt.label}</span>
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                  isChecked ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300'
                                }`}>
                                  {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message / Proposed Contribution */}
                      <div className="md:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          {d.remarks} <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y text-gray-900"
                            placeholder={d.remarksPl}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 px-8 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                      <span>{isSubmitting ? d.submittingBtn : d.submitBtn}</span>
                    </motion.button>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-100 text-xs text-gray-500">
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        <span>Registered Non-Profit Trust</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-primary-600" />
                        <span>12A & 80G Certified</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-primary-600" />
                        <span>Annual Transparent Impact Audits</span>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
