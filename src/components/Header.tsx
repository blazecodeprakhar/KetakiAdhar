import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Career', href: '/careers' },
    { label: 'Why Farmers Matter', href: '#why-farmers' },
    { label: 'Our Initiatives', href: '#initiatives' },
    { label: 'Be a Volunteer', href: '#volunteer' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
             
            </div> */}
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
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <button className="bg-primary-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors">
              Support Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-colors ${
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

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="px-4 py-4">
            <Link to="/donate" className="block w-full text-center bg-primary-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors">
              Support Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;