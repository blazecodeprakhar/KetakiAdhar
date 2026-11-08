import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const pageTitles: Record<string, { en: string; mr: string; kn: string; hi: string }> = {
  '/': {
    en: "Ketaki Adhar - Empowering India's Farmers",
    mr: "केतकी आधार - भारतीय शेतकऱ्यांचे सबलीकरण",
    kn: "ಕೇತಕಿ ಆಧಾರ - ಭಾರತೀಯ ರೈತರ ಸಬಲೀಕರಣ",
    hi: "केतकी आधार - भारतीय किसानों का सशक्तिकरण"
  },
  '/our-story': {
    en: "Our Story - Ketaki Adhar",
    mr: "आमची कहाणी - केतकी आधार",
    kn: "ನಮ್ಮ ಕಥೆ - ಕೇತಕಿ ಆಧಾರ",
    hi: "हमारी कहानी - केतकी आधार"
  },
  '/donate': {
    en: "Patronage & Support - Ketaki Adhar",
    mr: "सहकार्य आणि पाठबळ - केतकी आधार",
    kn: "ಬೆಂಬಲ ಮತ್ತು ದೇಣಿಗೆ - ಕೇತಕಿ ಆಧಾರ",
    hi: "सहयोग और संबल - केतकी आधार"
  },
  '/volunteer': {
    en: "Be a Volunteer - Ketaki Adhar",
    mr: "स्वयंसेवक व्हा - केतकी आधार",
    kn: "ಸ್ವಯಂಸೇವಕರಾಗಿ - ಕೇತಕಿ ಆಧಾರ",
    hi: "स्वयंसेवक बनें - केतकी आधार"
  },
  '/careers': {
    en: "Careers - Ketaki Adhar",
    mr: "करिअर - केतकी आधार",
    kn: "ಉದ್ಯೋಗಾವಕಾಶಗಳು - ಕೇತಕಿ ಆಧಾರ",
    hi: "करियर - केतकी आधार"
  },
  '/faq': {
    en: "FAQ - Ketaki Adhar",
    mr: "नेहमी विचारले जाणारे प्रश्न - केतकी आधार",
    kn: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು - ಕೇತಕಿ ಆಧಾರ",
    hi: "अक्सर पूछे जाने वाले सवाल - केतकी आधार"
  },
  '/contact': {
    en: "Contact Us - Ketaki Adhar",
    mr: "संपर्क करा - केतकी आधार",
    kn: "ಸಂಪರ್ಕಿಸಿ - ಕೇತಕಿ ಆಧಾರ",
    hi: "संपर्क करें - केतकी आधार"
  }
};

export default function DocumentTitleUpdater() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const notFoundTitles = {
      en: "404 Page Not Found - Ketaki Adhar",
      mr: "४०४ पृष्ठ सापडले नाही - केतकी आधार",
      kn: "೪೦೪ ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ - ಕೇತಕಿ ಆಧಾರ",
      hi: "४०४ पृष्ठ नहीं मिला - केतकी आधार"
    };
    const titleObj = pageTitles[pathname] || notFoundTitles;
    document.title = titleObj[language] || titleObj['en'];
  }, [pathname, language]);

  return null;
}
