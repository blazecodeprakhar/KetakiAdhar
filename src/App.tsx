import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatisticsSection from './components/StatisticsSection';
import MapSection from './components/MapSection';
import ChallengesSection from './components/ChallengesSection';
import RealHeroSection from './components/RealHeroSection';
import ClimateSection from './components/ClimateSection';
import SupportArea from './components/SupportArea';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import HomeContactForm from './components/HomeContactForm';
import Careers from './pages/Careers';
import VolunteerPage from './pages/VolunteerPage';
import DonationPage from './pages/DonationPage';
import { LanguageProvider } from './context/LanguageContext';

const Home = () => (
  <>
    <HeroSection />
    <StatisticsSection />
    <MapSection />
    <SupportArea />
    <ClimateSection />
    <ChallengesSection />
    <RealHeroSection />
    <CTASection />
    <div className="mt-16">
      <HomeContactForm />
    </div>
  </>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-story" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/donate" element={<DonationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;