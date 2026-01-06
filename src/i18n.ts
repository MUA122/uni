import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

const supportedLngs = ["en", "ar", "fr"] as const;

i18n
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      return import(`./locales/${lng}/${ns}.json`);
    })
  )
  .use(initReactI18next)
  .init({
    supportedLngs: [...supportedLngs],
    fallbackLng: "en",

    ns: [
      "nav",
      "hero",
      "collab",
      "footer",
      "apply",
      "finder",
      "study",
      "academies",
    ],
    defaultNS: "nav",

    returnNull: false,
    returnEmptyString: false,

    interpolation: { escapeValue: false },

    react: { useSuspense: false },
  });

export default i18n;
