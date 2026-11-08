# Architecture Overview: Ketaki Adhar

## Technology Stack
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS with custom thematic emerald & rural earth palettes
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6

## Key Directories
```
src/
├── components/          # Reusable UI widgets and section blocks
│   ├── Header.tsx       # Responsive top navigation with i18n pills
│   ├── Footer.tsx       # Localized footer with contact & quick links
│   ├── ToastContext.tsx # Centralized notification queue
│   ├── BackToTop.tsx    # Floating back-to-top button
│   ├── OfflineBanner.tsx# Live network connectivity alert
│   └── ...
├── context/             # React Context providers (LanguageContext, ToastContext)
├── pages/               # Top-level view routes (About, Donate, Volunteer, Careers, FAQ, Contact)
├── translations/        # Multi-language dictionary (en, mr, kn, hi)
├── utils/               # Sanitizers, form validators, formatters
└── test/                # Unit test suites
```

## Multi-Language Routing & Accessibility
- Localized across English, Marathi, Kannada, and Hindi.
- Dynamic `<html lang="...">` attribute synchronization.
- Keyboard navigation (Escape keys, skip-to-content links, focus visible rings).
