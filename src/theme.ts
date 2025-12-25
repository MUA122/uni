import { createTheme, alpha } from "@mui/material/styles";

const C = {
  teal: "#0B6F73",
  mint: "#2CC5B9",
  ink: "#071316",
  off: "#F6FAFB",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: C.teal },
    secondary: { main: C.mint },
    background: { default: C.off, paper: "#fff" },
    text: {
      primary: C.ink,
      secondary: alpha(C.ink, 0.72),
    },
    divider: alpha(C.teal, 0.14),
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 950, letterSpacing: "-0.05em", lineHeight: 1.02 },
    h2: { fontWeight: 950, letterSpacing: "-0.04em" },
    h3: { fontWeight: 900, letterSpacing: "-0.03em" },
    h4: { fontWeight: 900, letterSpacing: "-0.02em" },
    button: { textTransform: "none", fontWeight: 900 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            `radial-gradient(1200px 700px at 10% 0%, ${alpha(
              C.mint,
              0.15
            )} 0%, transparent 55%),` +
            `radial-gradient(1100px 650px at 90% 10%, ${alpha(
              C.teal,
              0.12
            )} 0%, transparent 52%),` +
            `linear-gradient(180deg, ${C.off} 0%, #ffffff 45%, ${C.off} 100%)`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: alpha("#fff", 0.72),
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${alpha(C.teal, 0.1)}`,
          color: C.ink,
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 18, paddingBlock: 10 },
        containedPrimary: {
          background: `linear-gradient(135deg, ${C.teal} 0%, ${C.mint} 120%)`,
          boxShadow: "0 14px 40px rgba(11,111,115,0.18)",
        },
        outlinedPrimary: {
          borderColor: alpha(C.teal, 0.25),
          background: alpha("#fff", 0.55),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(C.teal, 0.12)}`,
          background: alpha("#fff", 0.72),
          backdropFilter: "blur(14px)",
          borderRadius: 24,
        },
      },
    },
  },
});
