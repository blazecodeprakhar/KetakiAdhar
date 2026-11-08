import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Sprout, 
  CheckCircle, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Send, 
  ArrowDown, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Droplets, 
  Heart, 
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface FarmerFormData {
  fullName: string;
  phone: string;
  acres: string;
  district: string;
  taluka: string;
  village: string;
  photo: File | null;
  remarkProblem: string;
}

const initialFormData: FarmerFormData = {
  fullName: '',
  phone: '',
  acres: '',
  district: '',
  taluka: '',
  village: '',
  photo: null,
  remarkProblem: ''
};

const benefitIcons = [Droplets, Sprout, Heart, Users];

const FarmerRegistrationPage: React.FC = () => {
  const { t } = useLanguage();
  const f = t.farmerForm;
  const p = t.farmerRegistrationPage;
  const { showToast } = useToast();
  const location = useLocation();

  const [formData, setFormData] = useState<FarmerFormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Auto-scroll, pulse highlight, and focus on form arrival
  useEffect(() => {
    if (location.hash === '#farmer-registration-form') {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        fullNameRef.current?.focus();
      }, 150);
      const highlightTimer = setTimeout(() => {
        setIsHighlighted(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(highlightTimer);
      };
    }
  }, [location.hash]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = 'KA-FARMER-' + Math.floor(100000 + Math.random() * 900000);
      setEnrollmentCode(code);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Farmer registration submitted successfully! Our field team will connect with you.', 'success');
    }, 700);
  };

  // Completion calculation (6 key fields)
  const isNameFilled = formData.fullName.trim().length >= 2;
  const isPhoneFilled = formData.phone.trim().length === 10;
  const isAcresFilled = formData.acres.trim().length >= 1;
  const isDistrictFilled = formData.district.trim().length >= 2;
  const isTalukaFilled = formData.taluka.trim().length >= 2;
  const isVillageFilled = formData.village.trim().length >= 2;

  const completedCount = [
    isNameFilled,
    isPhoneFilled,
    isAcresFilled,
    isDistrictFilled,
    isTalukaFilled,
    isVillageFilled
  ].filter(Boolean).length;

  const completionPercent = Math.round((completedCount / 6) * 100);

  const benefits = (p.benefits || []).map((b, idx) => ({
    ...b,
    icon: benefitIcons[idx] || Sprout,
  }));

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
              <Sprout className="w-4 h-4 text-accent-400" />
              <span>{p.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md"
            >
              <span className="block text-white">{p.heroTitle1}</span>
              <span className="block bg-gradient-to-r from-accent-300 via-primary-300 to-emerald-200 bg-clip-text text-transparent">
                {p.heroTitle2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm"
            >
              {p.heroSubtitle}
            </motion.p>

            {/* Quick Hero Scroll Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <a
                href="#farmer-registration-form"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHighlighted(true);
                  formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  fullNameRef.current?.focus();
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-primary-600 hover:from-emerald-600 hover:to-primary-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>{p.ctaBtn}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welfare Interventions / Benefits Grid */}
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
              {p.benefitsBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
              {p.benefitsTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {p.benefitsSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => {
                    setIsHighlighted(true);
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-primary-600">
                    <span>Direct Rural Reach</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-white scroll-mt-20" id="farmer-registration-form">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="farmer-success"
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
                    {p.successTitle}
                  </h3>

                  <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
                    {p.successDesc}
                  </p>

                  <div className="bg-primary-50/80 rounded-2xl p-6 max-w-md mx-auto mb-8 border border-primary-100 text-left">
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{p.ref}</span>
                      <span className="font-mono font-bold text-primary-800">{enrollmentCode}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{p.farmerName}</span>
                      <span className="font-semibold text-gray-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{p.village}</span>
                      <span className="font-semibold text-gray-900">{formData.village}, {formData.district}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-primary-200/60">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{p.landSize}</span>
                      <span className="font-semibold text-gray-900">{formData.acres}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">{p.status}</span>
                      <span className="font-bold text-green-700 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                        {p.statusVal}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData(initialFormData);
                      handleRemovePhoto();
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    {p.registerAnother}
                  </motion.button>
                </motion.div>
              ) : (
                <div ref={formRef}>
                  {/* Animated Guide Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary-500/10 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3 shadow-sm backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-primary-600 text-white flex items-center justify-center shadow-md animate-bounce">
                        <Sprout className="w-5 h-5 fill-white" />
                      </span>
                      <div>
                        <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                          {p.formGuideBadge}
                        </span>
                        <p className="text-sm md:text-base font-semibold text-gray-900">
                          {p.formGuideTitle}
                        </p>
                      </div>
                    </div>

                    {/* Progress pill */}
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-white/90 px-3.5 py-2 rounded-full border border-emerald-200 shadow-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1" />
                      {completedCount === 6 ? p.readyBadge : `${completedCount}/6 ${p.detailsCompleted}`}
                    </div>
                  </motion.div>

                  {/* Form Container Card */}
                  <motion.div
                    key="farmer-form-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`bg-white rounded-3xl shadow-xl border p-8 md:p-12 transition-all duration-700 ${
                      isHighlighted
                        ? 'ring-4 ring-emerald-500/70 shadow-2xl border-emerald-400 scale-[1.01] bg-gradient-to-b from-emerald-50/20 via-white to-white'
                        : 'border-gray-100'
                    }`}
                  >
                    <div className="text-center mb-8">
                      <span className="text-xs uppercase font-bold tracking-widest text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                        {p.formBadge}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
                        {p.formTitle}
                      </h2>
                      <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                        {p.formSubtitle}
                      </p>

                      {/* Interactive Visual Completion Progress Bar */}
                      <div className="mt-6 max-w-md mx-auto">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1.5">
                          <span>{p.progressLabel}</span>
                          <span className="font-bold text-primary-700">{completionPercent}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionPercent}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary-500 to-teal-500 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.fullName} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <User className="w-5 h-5" />
                            </div>
                            <input
                              ref={fullNameRef}
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isNameFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.fullNamePlaceholder}
                            />
                            {isNameFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.phone} <span className="text-red-500">*</span>
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
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isPhoneFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.phonePlaceholder}
                            />
                            {isPhoneFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Acres */}
                        <div>
                          <label htmlFor="acres" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.acres} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Sprout className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              id="acres"
                              name="acres"
                              value={formData.acres}
                              onChange={handleInputChange}
                              required
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isAcresFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.acresPlaceholder}
                            />
                            {isAcresFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* District */}
                        <div>
                          <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.district} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              id="district"
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              required
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isDistrictFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.districtPlaceholder}
                            />
                            {isDistrictFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Taluka */}
                        <div>
                          <label htmlFor="taluka" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.taluka} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              id="taluka"
                              name="taluka"
                              value={formData.taluka}
                              onChange={handleInputChange}
                              required
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isTalukaFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.talukaPlaceholder}
                            />
                            {isTalukaFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Village */}
                        <div>
                          <label htmlFor="village" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.village} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              id="village"
                              name="village"
                              value={formData.village}
                              onChange={handleInputChange}
                              required
                              className={`w-full pl-11 pr-11 py-3 border rounded-xl transition-all duration-200 text-gray-900 ${
                                isVillageFilled
                                  ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/10'
                                  : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                              }`}
                              placeholder={f.villagePlaceholder}
                            />
                            {isVillageFilled && (
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                                <CheckCircle className="w-5 h-5 animate-in fade-in" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Photo Upload */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.photo} <span className="text-gray-400 font-normal">{f.optional}</span>
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-400 transition-colors">
                            {photoPreview ? (
                              <div className="relative">
                                <img
                                  src={photoPreview}
                                  alt="Preview"
                                  className="max-h-48 rounded-lg object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={handleRemovePhoto}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2 text-center">
                                <div className="flex justify-center text-gray-400">
                                  <ImageIcon className="w-10 h-10" />
                                </div>
                                <div className="flex text-sm text-gray-600 justify-center">
                                  <label
                                    htmlFor="farmer-photo"
                                    className="relative cursor-pointer bg-white rounded-md font-semibold text-primary-600 hover:text-primary-500 focus-within:outline-none"
                                  >
                                    <span>{f.uploadPrompt}</span>
                                    <input
                                      ref={fileInputRef}
                                      id="farmer-photo"
                                      name="farmer-photo"
                                      type="file"
                                      accept="image/*"
                                      className="sr-only"
                                      onChange={handlePhotoChange}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">{f.uploadLimit}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Remark Problem */}
                        <div className="md:col-span-2">
                          <label htmlFor="remarkProblem" className="block text-sm font-semibold text-gray-700 mb-2">
                            {f.remarkProblem} <span className="text-gray-400 font-normal">{f.optional}</span>
                          </label>
                          <div className="relative">
                            <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                              <FileText className="w-5 h-5" />
                            </div>
                            <textarea
                              id="remarkProblem"
                              name="remarkProblem"
                              rows={4}
                              value={formData.remarkProblem}
                              onChange={handleInputChange}
                              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y text-gray-900"
                              placeholder={f.remarkPlaceholder}
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
                        className="w-full py-4 px-8 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white disabled:opacity-70 cursor-pointer"
                      >
                        <Send className="w-5 h-5" />
                        <span>{isSubmitting ? f.submittingBtn : p.submitBtn}</span>
                      </motion.button>

                      {/* Trust Footnote */}
                      <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100 text-xs text-gray-500">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        <span>{p.confidential}</span>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerRegistrationPage;

