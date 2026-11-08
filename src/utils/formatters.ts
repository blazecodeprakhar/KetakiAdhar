import { Language } from '../translations/translations';

const localeMap: Record<Language, string> = {
  en: 'en-IN',
  mr: 'mr-IN',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

export const formatLocalizedDate = (date: Date | string, lang: Language = 'en'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(localeMap[lang] || 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
};

export const formatImpactNumber = (val: number, lang: Language = 'en'): string => {
  return new Intl.NumberFormat(localeMap[lang] || 'en-IN').format(val);
};
