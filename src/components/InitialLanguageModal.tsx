import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';

const STORAGE_KEY = 'ketaki_has_selected_language';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Default',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    region: 'महाराष्ट्र',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    region: 'ಕರ್ನಾಟಕ',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    region: 'भारत',
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
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 300);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with clean blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => handleConfirm()}
          />

          {/* Modal Container: Compact, beautifully scaled for phones & desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
            className="relative w-full max-w-[440px] sm:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Emerald Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-600 via-primary-500 to-emerald-700" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => handleConfirm()}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close language selector"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-4 sm:p-6">
              {/* Header: Clean, professional, NO AI sparkles */}
              <div className="text-center mb-4 sm:mb-5">
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2.5">
                  <Globe className="w-6 h-6" />
                </div>

                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full mb-1.5">
                    Ketaki Adhar Foundation
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Select Language / भाषा निवडा
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                  ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ • अपनी भाषा चुनें
                </p>
              </div>

              {/* 2x2 Language Grid on ALL devices for compact vertical footprint */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                {languageOptions.map((opt) => {
                  const isSelected = selectedLang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setSelectedLang(opt.code)}
                      onDoubleClick={() => handleConfirm(opt.code)}
                      className={`relative p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50/60 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-1.5">
                        <div>
                          <div className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                            {opt.nativeName}
                          </div>
                          <div className="text-[11px] sm:text-xs text-gray-500 font-medium">
                            {opt.name}
                          </div>
                        </div>

                        {/* Checkmark indicator */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-gray-100/80 flex items-center justify-between text-[10px] sm:text-[11px]">
                        <span className="text-gray-400">Region</span>
                        <span className="text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded font-medium">
                          {opt.region}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleConfirm()}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-primary-600 hover:from-emerald-700 hover:to-primary-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Continue in {currentOption.nativeName} ({currentOption.name})</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => handleConfirm('en')}
                    className="text-[11px] sm:text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium cursor-pointer"
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
