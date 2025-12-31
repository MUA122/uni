import React from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import i18n from "../i18n";

const supported = ["en", "ar", "fr"] as const;

export default function LangLayout() {
  const { lng } = useParams();

  if (!lng || !supported.includes(lng as (typeof supported)[number])) {
    return <Navigate to="/en" replace />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }, [lng]);

  return <Outlet />;
}
