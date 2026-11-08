import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, MessageCircle, ArrowLeft, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  const n = t.notFound;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/60 via-white to-gray-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-gray-100"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>{n.badge}</span>
          </div>

          {/* Large 404 display */}
          <div className="text-7xl sm:text-9xl font-black bg-gradient-to-r from-emerald-600 via-primary-600 to-teal-500 bg-clip-text text-transparent mb-4 tracking-tight">
            404
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {n.title}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            {n.subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>{n.homeBtn}</span>
            </Link>

            <Link
              to="/our-story"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border-2 border-primary-600 text-primary-700 hover:bg-primary-50 font-bold px-7 py-3 rounded-full transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{n.storyBtn}</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-700 font-semibold px-4 py-3 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{n.contactBtn}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

