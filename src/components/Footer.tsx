import React from 'react';
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const f = t.footer;

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: t.nav.story, href: '/our-story' },
    { label: t.nav.careers, href: '/careers' },
    { label: t.nav.whyFarmers, href: '/#why-farmers' },
    { label: t.nav.initiatives, href: '/#initiatives' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const supportLinks = [
    { label: t.nav.farmerRegistration, href: '/farmer-registration#farmer-registration-form' },
    { label: f.donate, href: '/donate#pledge-form' },
    { label: f.volunteer, href: '/volunteer#volunteer-form' },
    { label: f.partner, href: '/contact' },
    { label: f.csr, href: '/contact' },
    { label: f.mediaKit, href: '/contact' },
    { label: f.annualReports, href: '/our-story' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold hover:text-primary-400 transition-colors">
                Ketaki Adhar
              </Link>
            </div>

            <p className="text-gray-400 leading-relaxed">
              {f.about}
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{f.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{f.getInvolved}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{f.contactUs}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    {f.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:info@ketakiadhar.in" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  info@ketakiadhar.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              {f.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                {f.privacyPolicy}
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                {f.termsOfService}
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                {f.cookiePolicy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
