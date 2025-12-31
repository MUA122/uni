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
import InternationalCollaboration from "./components/sections/InternationalCollaboration";
import Footer from "./components/layout/Footer";
import AppliNow from "./components/apply/ApplyNow";
import StudyResearch from "./components/study/StudyResearch";
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
        <Route path="/" element={<Navigate to="/en" replace />} />

        <Route path="/:lng" element={<LangLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return <AppWithDirectionTheme />;
}
