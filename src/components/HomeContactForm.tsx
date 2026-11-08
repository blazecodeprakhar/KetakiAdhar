import React, { useState, useRef } from 'react';
import { Send, CheckCircle, User, Phone, MapPin, Upload, X, FileText, Image as ImageIcon, Sprout } from 'lucide-react';
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

const HomeContactForm = () => {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const f = t.farmerForm;
  const [formData, setFormData] = useState<FarmerFormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      console.log('Farmer Information submitted:', {
        ...formData,
        photoName: formData.photo ? formData.photo.name : null
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Farmer assistance request submitted successfully!', 'success');

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(initialFormData);
        if (photoPreview) {
          URL.revokeObjectURL(photoPreview);
          setPhotoPreview(null);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 4000);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-primary-100">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary-600" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {f.successTitle}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {f.successDesc}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="p-3 bg-primary-50 rounded-2xl">
                  <div className="text-xl font-bold text-primary-700">{f.reviewTime}</div>
                  <div className="text-xs text-gray-600 mt-1">{f.reviewTimeDesc}</div>
                </div>
                <div className="p-3 bg-secondary-50 rounded-2xl">
                  <div className="text-xl font-bold text-secondary-700">{f.fieldAssistance}</div>
                  <div className="text-xs text-gray-600 mt-1">{f.fieldAssistanceDesc}</div>
                </div>
                <div className="p-3 bg-accent-50 rounded-2xl">
                  <div className="text-xl font-bold text-accent-700">{f.dedicatedSupport}</div>
                  <div className="text-xs text-gray-600 mt-1">{f.dedicatedSupportDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 scroll-mt-20" id="farmer-form">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sprout className="w-4 h-4 text-primary-600" />
              <span>{f.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {f.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              {f.subtitle}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    {f.fullName} <span className="text-red-500">*</span>
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.fullNamePlaceholder}
                    />
                  </div>
                </div>

                {/* Number */}
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.phonePlaceholder}
                    />
                  </div>
                </div>

                {/* How many Acres */}
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.acresPlaceholder}
                    />
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.districtPlaceholder}
                    />
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.talukaPlaceholder}
                    />
                  </div>
                </div>

                {/* Village */}
                <div className="md:col-span-2">
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder={f.villagePlaceholder}
                    />
                  </div>
                </div>

                {/* Photo (Optional) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {f.photo} <span className="text-gray-500 font-normal">{f.optional}</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />

                  {!photoPreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-2xl p-6 text-center transition-colors bg-gray-50/50 hover:bg-primary-50/30 flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-100 group-hover:bg-primary-200 text-primary-700 flex items-center justify-center mb-2 transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {f.uploadPrompt}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {f.uploadLimit}
                      </span>
                    </button>
                  ) : (
                    <div className="relative rounded-2xl border border-gray-200 p-3 bg-gray-50 flex items-center space-x-4">
                      <img
                        src={photoPreview}
                        alt="Farm preview"
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {formData.photo?.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formData.photo ? `${(formData.photo.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Remark Problem */}
                <div className="md:col-span-2">
                  <label htmlFor="remarkProblem" className="block text-sm font-semibold text-gray-700 mb-2">
                    {f.remarkProblem} <span className="text-red-500">*</span>
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
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-y"
                      placeholder={f.remarkPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl font-semibold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? f.submittingBtn : f.submitBtn}</span>
              </button>
            </form>
          </div>

          {/* Bottom note */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {f.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;
