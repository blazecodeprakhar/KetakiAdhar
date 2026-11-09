import { useState, useEffect } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: t.nav.story, href: '/our-story' },
    { label: t.nav.initiatives, href: '/#initiatives' },
    { label: t.nav.farmerRegistration, href: '/farmer-registration#farmer-registration-form' },
    { label: t.nav.volunteer, href: '/volunteer#volunteer-form' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const isLightHeader = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightHeader 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' 
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/" 
                className={`text-xl font-bold tracking-tight transition-colors ${
                  isLightHeader ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-primary-100'
                }`}
              >
                Ketaki Adhar
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

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

            {/* Mobile Right Controls: Language Selector + Animated Menu Toggle */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Quick mobile language pill */}
              <LanguageSelector isScrolled={isLightHeader} variant="mobile-header" />

              {/* Animated Hamburger / Close Button in Website Primary Theme */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                className={`w-11 h-11 flex flex-col items-center justify-center rounded-xl transition-all border shadow-sm ${
                  isLightHeader 
                    ? 'bg-primary-50 hover:bg-primary-100 border-primary-200 text-primary-800' 
                    : 'bg-gradient-to-br from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 border-primary-400/40 text-white shadow-emerald-950/30'
                }`}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-5 h-0.5 rounded-full block origin-center ${
                      isLightHeader ? 'bg-primary-800' : 'bg-white'
                    }`}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-5 h-0.5 rounded-full block origin-left ${
                      isLightHeader ? 'bg-primary-800' : 'bg-white'
                    }`}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-5 h-0.5 rounded-full block origin-center ${
                      isLightHeader ? 'bg-primary-800' : 'bg-white'
                    }`}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Animated Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              key="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-2xl max-h-[calc(100dvh-5rem)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-3 space-y-4">
                {/* Easy-to-switch Language Grid for Phone Users */}
                <div className="bg-primary-50/50 rounded-2xl p-2 border border-primary-100/60">
                  <LanguageSelector variant="mobile-menu" />
                </div>

                {/* Staggered Navigation Items */}
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.href.split('#')[0];
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + index * 0.03, duration: 0.22 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-medium transition-all ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 font-semibold'
                              : 'text-gray-800 hover:bg-primary-50/70 hover:text-primary-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`w-2 h-2 rounded-full transition-transform ${
                              isActive
                                ? 'bg-primary-600 scale-125'
                                : 'bg-gray-300 group-hover:bg-primary-500 group-hover:scale-125'
                            }`} />
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom CTA Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.25 }}
                  className="pt-2 pb-4"
                >
                  <Link 
                    to="/donate#pledge-form" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3.5 px-6 rounded-2xl font-bold shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98]"
                  >
                    <Heart className="w-5 h-5 fill-white/20" />
                    <span>{t.nav.donateNow}</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dimmed backdrop when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 top-20 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
