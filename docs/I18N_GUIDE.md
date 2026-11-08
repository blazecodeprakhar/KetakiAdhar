# Internationalization (i18n) Architecture Guide

Ketaki Adhar utilizes a custom, lightweight, type-safe React Context localization engine with zero external overhead.

## 📁 Architecture Overview

* **Context**: [`src/context/LanguageContext.tsx`](../src/context/LanguageContext.tsx)
  * Stores active language in React state (`Language`).
  * Persists language choice in `localStorage` (`ketaki_language`).
  * Exposes `t` (active dictionary), `language`, `setLanguage`, and `languages` metadata.
* **Component**: [`src/components/LanguageSelector.tsx`](../src/components/LanguageSelector.tsx)
  * Desktop dropdown: Accessible floating pill with native language names.
  * Mobile header: Compact pill in top-right navbar.
  * Mobile drawer: 2x2 grid for easy touch switching on mobile screens.
* **Dictionary**: [`src/translations/translations.ts`](../src/translations/translations.ts)
  * Fully synchronized TypeScript object across `en`, `mr`, `kn`, and `hi`.

## 🌐 Supported Languages

| Code | Name | Native Name | Script |
|------|------|-------------|--------|
| `en` | English | English | Latin |
| `mr` | Marathi | मराठी | Devanagari |
| `kn` | Kannada | ಕನ್ನಡ | Kannada |
| `hi` | Hindi | हिंदी | Devanagari |

