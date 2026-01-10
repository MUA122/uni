// App.tsx
import { useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

import { theme as baseTheme } from "./theme";
import LangLayout from "./routing/LangLayout";

/* ===============================
   University Components
================================ */
import Header from "./components/layout/Header";
import HeroVideo from "./components/hero/HeroVideo";
import InternationalCollaboration from "./components/collaboration/InternationalCollaboration";
import Footer from "./components/layout/Footer";
import AppliNow from "./components/apply/ApplyNow";
import StudyResearch from "./components/study/StudyResearch";
import OurAcademies from "./components/Academies/OurAcademies";

/* ===============================
   Academy Components (IAAU)
================================ */
import AcademyHeader from "./components/academy/layout/AcademyHeader";
import AcademyFooter from "./components/academy/layout/AcademyFooter";
import AcademyHeroImage from "./components/academy/hero/AcademyHeroImage";

/* ===============================
   Admin
================================ */
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import WhyChooseIAAU from "./components/academy/component/WhyChoose";

/* ===============================
   Pages
================================ */
function HomePage() {
  return (
    <>
      <Header />
      <HeroVideo />
      <StudyResearch />

      <Divider
        sx={{
          height: 3,
          border: "none",
          background:
            "linear-gradient(90deg, transparent, rgba(0,110,113,0.45), transparent)",
        }}
      />

      <InternationalCollaboration />

      <Divider
        sx={{
          height: 3,
          border: "none",
          background:
            "linear-gradient(90deg, transparent, rgba(0,110,113,0.45), transparent)",
        }}
      />

      <OurAcademies />

      <Divider
        sx={{
          height: 3,
          border: "none",
          background:
            "linear-gradient(90deg, transparent, rgba(0,110,113,0.45), transparent)",
        }}
      />

      <AppliNow />
      <Footer />
    </>
  );
}

function AcademyHomePage() {
  return (
    <>
      <AcademyHeader />
      <AcademyHeroImage />
      <WhyChooseIAAU />
      <AcademyFooter />
    </>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem("analyticsAdminToken") : null;

  if (!token) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/admin/login?next=${next}`} replace />;
  }

  return <>{children}</>;
}

/* ===============================
   App With Theme + Routing
================================ */
function AppWithDirectionTheme() {
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const dir: "ltr" | "rtl" = currentLang === "ar" ? "rtl" : "ltr";

  const isAcademy = location.pathname.includes("/iaau");

  /* ---------- Dynamic Title ---------- */
  useEffect(() => {
    if (isAcademy) {
      document.title =
        currentLang === "ar"
          ? "IAAU | الأكاديمية الدولية للعمارة والتخطيط العمراني"
          : currentLang === "fr"
          ? "IAAU | Académie Internationale d’Architecture et d’Urbanisme"
          : "IAAU | International Academy of Architecture & Urbanism";

      // eslint-disable-next-line react-hooks/immutability
      setFavicon("/imgs/iaau.png");
    } else {
      document.title =
        currentLang === "ar"
          ? "IUSAT | الجامعة الدولية"
          : "IUSAT | International University";

      setFavicon("/imgs/favicon.png");
    }
  }, [currentLang, isAcademy]);

  const setFavicon = (href: string) => {
    let favicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null;

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/png";
      document.head.appendChild(favicon);
    }

    favicon.href = href;
  };

  const muiTheme = useMemo(() => {
    if (isAcademy) {
      return createTheme(
        {
          ...baseTheme,
          palette: {
            ...baseTheme.palette,
            primary: {
              ...baseTheme.palette?.primary,
              main: "#30508C",
              light: "#B0FDEB",
            },
          },
        },
        { direction: dir }
      );
    }

    return createTheme(baseTheme, { direction: dir });
  }, [dir, isAcademy]);

  /* ---------- HTML dir/lang ---------- */
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = dir;
  }, [currentLang, dir]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Public + Academy (same LangLayout) */}
        <Route path="/:lng" element={<LangLayout />}>
          <Route index element={<HomePage />} />
          <Route path="iaau" element={<AcademyHomePage />} />
        </Route>

        {/* Admin (Standalone) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

/* ===============================
   Export
================================ */
export default function App() {
  return <AppWithDirectionTheme />;
}
