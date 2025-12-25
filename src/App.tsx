import { ThemeProvider, CssBaseline } from "@mui/material";
import Divider from "@mui/material/Divider";

import { theme } from "./theme";
import Header from "./components/layout/Header";
import HeroVideo from "./components/hero/HeroVideo";
import InternationalCollaboration from "./components/sections/InternationalCollaboration";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HeroVideo />
      <Divider />
      <InternationalCollaboration />
      <Divider />
      <Footer />
    </ThemeProvider>
  );
}
