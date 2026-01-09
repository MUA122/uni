// App.tsx
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

import { theme } from "./theme";
import LangLayout from "./routing/LangLayout";

import Header from "./components/layout/Header";
import HeroVideo from "./components/hero/HeroVideo";
import InternationalCollaboration from "./components/collaboration/InternationalCollaboration";
import Footer from "./components/layout/Footer";
import AppliNow from "./components/apply/ApplyNow";
import StudyResearch from "./components/study/StudyResearch";
import OurAcademies from "./components/Academies/OurAcademies";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";

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

function AppWithDirectionTheme() {
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const dir: "ltr" | "rtl" = currentLang === "ar" ? "rtl" : "ltr";

  const muiTheme = React.useMemo(
    () => createTheme(theme, { direction: dir }),
    [dir]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        {/* Redirect root to English */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Public Website Routes (Wrapped in LangLayout) */}
        <Route path="/:lng" element={<LangLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* 2. Admin Dashboard Route (Standalone) */}
        {/* This is placed outside LangLayout so it has its own clean layout */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return <AppWithDirectionTheme />;
}
