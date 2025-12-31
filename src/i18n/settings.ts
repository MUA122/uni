export const languages = ["en", "ar", "fr"] as const;
export type Language = (typeof languages)[number];

export const fallbackLng: Language = "en";
export const defaultNS = "common";
export const cookieName = "i18next";
