import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ArrowRight, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';

const STORAGE_KEY = 'ketaki_has_selected_language';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  tagline: string;
  region: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    tagline: 'Continue in English',
    region: 'Default',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    tagline: 'मराठीत पुढे जा',
    region: 'महाराष्ट्र',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    tagline: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ',
    region: 'ಕರ್ನಾಟಕ',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    tagline: 'हिंदी में जारी रखें',
    region: 'संपूर्ण भारत',
  },
];

const InitialLanguageModal: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(language || 'en');

  useEffect(() => {
    try {
      const hasChosen = localStorage.getItem(STORAGE_KEY);
      if (!hasChosen) {
        // Brief timeout for smooth entrance after page mount
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 350);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleConfirm = (langToSet?: Language) => {
    const finalLang = langToSet || selectedLang;
    setLanguage(finalLang);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const currentOption = languageOptions.find((l) => l.code === selectedLang) || languageOptions[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with rich blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => handleConfirm()}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Decorative Header Accent */}
            <div className="h-2.5 bg-gradient-to-r from-emerald-600 via-primary-500 to-accent-500" />

            {/* Close / Dismiss button (falls back to English & remembers) */}
            <button
              onClick={() => handleConfirm()}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close language selector"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header Icon & Brand */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mb-3 shadow-inner">
                  <Globe className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome to Ketaki Adhar</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Choose Your Language
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  आपली भाषा निवडा • ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ • अपनी भाषा चुनें
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  You can change this anytime from the top navigation bar.
                </p>
              </div>

              {/* 2x2 Language Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {languageOptions.map((opt) => {
                  const isSelected = selectedLang === opt.code;
                  return (
                    <div
                      key={opt.code}
                      onClick={() => {
                        setSelectedLang(opt.code);
                      }}
                      onDoubleClick={() => handleConfirm(opt.code)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50/70'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-lg font-bold text-gray-900 leading-snug">
                            {opt.nativeName}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {opt.name}
                          </div>
                        </div>

                        {/* Selection Radio / Checkmark */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                        <span className="text-gray-500 font-normal">{opt.tagline}</span>
                        <span className="text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full font-medium">
                          {opt.region}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleConfirm()}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-primary-600 hover:from-emerald-700 hover:to-primary-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Continue in {currentOption.nativeName} ({currentOption.name})</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleConfirm('en')}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium py-1"
                  >
                    Skip & continue in English
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InitialLanguageModal;
