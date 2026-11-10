import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt", 
    interpolation: {
      escapeValue: false
    },
    resources: {
      pt: { translation: pt },
      en: { translation: en }
    }
  });

export default i18n;
