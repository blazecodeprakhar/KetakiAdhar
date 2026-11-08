import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { label: t.nav.story, href: '/our-story' },
    { label: t.nav.careers, href: '/careers' },
    { label: t.nav.whyFarmers, href: '/#why-farmers' },
    { label: t.nav.initiatives, href: '/#initiatives' },
    { label: t.nav.volunteer, href: '/volunteer#volunteer-form' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-100'
              }`}
            >
              Ketaki Adhar
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const itemBase = item.href.split('#')[0];
              const isActive = itemBase ? (itemBase === '/' ? pathname === '/' : pathname.startsWith(itemBase)) : false;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? isScrolled ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-0.5' : 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5'
                      : isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Desktop Language Selector */}
            <LanguageSelector isScrolled={isScrolled} variant="desktop" />

            {/* Donate CTA */}
            <Link 
              to="/donate#pledge-form"
              className="bg-primary-500 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors shadow-sm"
            >
              {t.nav.donateNow}
            </Link>
          </nav>

          {/* Mobile Right Controls: Language Selector + Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Quick mobile language pill */}
            <LanguageSelector isScrolled={isScrolled} variant="mobile-header" />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation-menu"
              className={`p-1.5 rounded-lg focus:outline-none transition-colors ${
                isScrolled || isMobileMenuOpen ? 'text-gray-700 hover:text-primary-500' : 'text-white hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          id="mobile-navigation-menu" className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
        >
          {/* Prominent Easy-to-switch Language Grid for Phone Users */}
          <LanguageSelector variant="mobile-menu" />

          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-4">
            <Link 
              to="/donate#pledge-form" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-primary-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-600 transition-colors"
            >
              {t.nav.donateNow}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
