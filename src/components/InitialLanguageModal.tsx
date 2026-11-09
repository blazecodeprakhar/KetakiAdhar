import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
  subtext: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Default',
    subtext: 'Continue in English',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    region: 'महाराष्ट्र',
    subtext: 'मराठीत पुढे जा',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    region: 'ಕರ್ನಾಟಕ',
    subtext: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    region: 'संपूर्ण भारत',
    subtext: 'हिंदी में जारी रखें',
  },
];

const InitialLanguageModal: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Every single time whenever user opens the website, show the language pop-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while the modal is open
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

  // Immediately switch the entire website into the chosen language and close popup
  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 14 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-[440px] sm:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Emerald Gradient Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-600 via-primary-500 to-emerald-700" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close language selector"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-5">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2.5">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>

                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full mb-1.5">
                    Ketaki Adhar Foundation
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Choose Your Language / भाषा निवडा
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                  Click your language to continue • अपनी भाषा चुनें • ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ
                </p>
              </div>

              {/* 2x2 Direct-Click Language Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {languageOptions.map((opt) => {
                  const isCurrent = language === opt.code;
                  return (
                    <motion.button
                      key={opt.code}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectLanguage(opt.code)}
                      className={`relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/40 bg-white shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-2">
                        <div>
                          <div className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors">
                            {opt.nativeName}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {opt.name}
                          </div>
                        </div>

                        {/* Status Checkmark */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isCurrent
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-gray-300 group-hover:border-emerald-500 bg-white'
                          }`}
                        >
                          {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-[11px]">
                        <span className="text-gray-500 group-hover:text-emerald-700 font-medium">
                          {opt.subtext}
                        </span>
                        <span className="text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                          {opt.region}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Subtle Note */}
              <p className="text-center text-[11px] text-gray-400 mt-4">
                You can also change language anytime from the top navigation bar.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InitialLanguageModal;
