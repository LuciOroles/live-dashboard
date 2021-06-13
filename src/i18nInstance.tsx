import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          Welcome: 'Welcome to React and react-i18next',
        },
      },
      fr: {
        translation: {
          Welcome: 'Bienvenue à React et react-i18next',
        },
      },
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
