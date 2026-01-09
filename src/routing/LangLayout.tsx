import { useEffect, useRef } from "react";
import { Outlet, useParams, Navigate, useLocation } from "react-router-dom";
import i18n from "../i18n";
import AnalyticsTracker from "../components/layout/AnalyticsTracker";
import { trackPageView } from "../analytics/analyticsClient";

const supported = ["en", "ar", "fr"] as const;

export default function LangLayout() {
  const { lng } = useParams();
  const location = useLocation();
  const lastPathRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  if (!lng || !supported.includes(lng as (typeof supported)[number])) {
    return <Navigate to="/en" replace />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }, [lng]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    const now = Date.now();
    if (lastPathRef.current) {
      const duration = now - lastTimeRef.current;
      void trackPageView(lastPathRef.current, duration);
    }
    lastPathRef.current = path;
    lastTimeRef.current = now;
  }, [location.pathname, location.search]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleUnload = () => {
      if (!lastPathRef.current) {
        return;
      }
      const duration = Date.now() - lastTimeRef.current;
      void trackPageView(lastPathRef.current, duration);
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <>
      <AnalyticsTracker />
      <Outlet />
    </>
  );
}
