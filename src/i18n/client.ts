"use client";

import i18n, { type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { fallbackLng, languages, defaultNS } from "./settings";

let initialized = false;

export function initI18n(lng: string): I18nInstance {
  if (!initialized) {
    i18n
      .use(initReactI18next)
      .use(
        resourcesToBackend((language: string, namespace: string) =>
          fetch(`/locales/${language}/${namespace}.json`).then((res) =>
            res.json()
          )
        )
      )
      .init({
        lng,
        fallbackLng,
        supportedLngs: [...languages],
        ns: ["common", "nav"],
        defaultNS,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    initialized = true;
  } else {
    if (i18n.language !== lng) i18n.changeLanguage(lng);
  }

  return i18n;
}
