// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import zhTranslation from './locales/zh.json';
import heTranslation from './locales/he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
        dir: 'ltr',
      },
      es: {
        translation: esTranslation,
        dir: 'ltr',
      },
      zh: {
        translation: zhTranslation,
        dir: 'ltr',
      },
      he: {
        translation: heTranslation,
        dir: 'rtl',
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
