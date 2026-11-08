/**
 * Form Validation and Sanitization Utilities
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const sanitizeIndianPhone = (phone: string): string => {
  return phone.replace(/\D/g, '').slice(0, 10);
};

export const isValidIndianPhone = (phone: string): boolean => {
  const sanitized = sanitizeIndianPhone(phone);
  return sanitized.length === 10 && /^[6-9]/.test(sanitized);
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const formatCurrencyINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
