import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      fr: {
        translation: {
          live: 'Live Data',
          history: 'History data',
          buttons: {
            connect: 'Connect',
            disconnect: 'Disconnect!',
            stop: 'Stop',
            restart: 'Restart',
            update: 'Factor update',
          },
          noData: {
            live: 'No live data!',
            history: 'No historical data, stay connected to collect!',
          },
        },
      },
      en: {
        translation: {
          live: 'Live Data',
          history: 'History data',
          buttons: {
            connect: 'Connect',
            disconnect: 'Disconnect!',
            stop: 'Stop',
            restart: 'Restart',
            update: 'Factor update',
          },
          noData: {
            live: 'No live data!',
            history: 'No historical data, stay connected to collect!',
          },
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
