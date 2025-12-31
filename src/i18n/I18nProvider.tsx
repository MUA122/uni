"use client";

import { I18nextProvider } from "react-i18next";
import { initI18n } from "./client";
import type { ReactNode } from "react";
import AppProviders from "./AppProviders";

export default function I18nProvider({
  children,
  lng,
}: {
  children: ReactNode;
  lng: string;
}) {
  const i18n = initI18n(lng);
  return (
    <I18nextProvider i18n={i18n}>
      {" "}
      <AppProviders>{children}</AppProviders>
    </I18nextProvider>
  );
}
