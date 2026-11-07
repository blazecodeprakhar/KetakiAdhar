import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';

interface LanguageSelectorProps {
  isScrolled?: boolean;
  variant?: 'desktop' | 'mobile-header' | 'mobile-menu';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isScrolled = false,
  variant = 'desktop'
}) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Mobile menu grid version (rendered inside the mobile slide-down menu)
  if (variant === 'mobile-menu') {
    return (
      <div className="pt-2 pb-3 px-3">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          <Globe className="w-4 h-4 text-primary-600" />
          <span>Select Language / भाषा निवडा</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`py-2.5 px-3 rounded-xl text-left flex items-center justify-between text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>
                  <div className="font-semibold">{lang.nativeName}</div>
                  <div className={`text-xs ${isSelected ? 'text-primary-100' : 'text-gray-500'}`}>
                    {lang.name}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact mobile header button (visible right next to menu toggle on phone)
  if (variant === 'mobile-header') {
    return (
      <div className="relative md:hidden" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change Language"
          className={`flex items-center space-x-1 py-1.5 px-2.5 rounded-full text-xs font-semibold border transition-all ${
            isScrolled || isOpen
              ? 'bg-gray-100 text-gray-800 border-gray-300'
              : 'bg-white/20 text-white border-white/30 backdrop-blur-sm'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{currentLang.nativeName}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in">
            <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Language / भाषा
            </div>
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors ${
                    isSelected ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{lang.nativeName} ({lang.name})</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop Dropdown
  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 py-2 px-3.5 rounded-full text-sm font-medium transition-all border ${
          isScrolled
            ? 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary-400 hover:bg-white'
            : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm'
        }`}
      >
        <Globe className="w-4 h-4 text-primary-500" />
        <span className="font-semibold">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in">
          <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Choose Language
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-sm transition-colors ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div>
                  <div className="font-semibold text-gray-900">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

