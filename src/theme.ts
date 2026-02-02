import { createTheme, lighten, darken, alpha } from "@mui/material/styles";

export const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  ink: "#071316",
  off: "#F6FAFB",

  primary: {
    main: "#006E71",
    light: lighten("#006E71", 0.18),
    lighter: lighten("#006E71", 0.38),
    dark: darken("#006E71", 0.12),
    darker: darken("#006E71", 0.24),
    contrastText: "#FFFFFF",
  },

  secondary: {
    main: "#26B99B",
    light: lighten("#26B99B", 0.18),
    lighter: lighten("#26B99B", 0.38),
    dark: darken("#26B99B", 0.12),
    darker: darken("#26B99B", 0.24),
    contrastText: "#071316",
  },

  info: {
    main: "#00A2CE",
    light: lighten("#00A2CE", 0.2),
    lighter: lighten("#00A2CE", 0.4),
    dark: darken("#00A2CE", 0.15),
    darker: darken("#00A2CE", 0.3),
    contrastText: "#FFFFFF",
  },

  success: {
    main: "#B0FDEB",
    light: lighten("#B0FDEB", 0.15),
    lighter: lighten("#B0FDEB", 0.3),
    dark: darken("#B0FDEB", 0.2),
    darker: darken("#B0FDEB", 0.35),
    contrastText: "hsl(192, 52%, 6%)",
  },

  warning: {
    main: "#FFB516",
    light: lighten("#FFB516", 0.2),
    lighter: lighten("#FFB516", 0.4),
    dark: darken("#FFB516", 0.15),
    darker: darken("#FFB516", 0.3),
    contrastText: "#071316",
  },

  error: {
    main: "#960012",
    light: lighten("#960012", 0.2),
    lighter: lighten("#960012", 0.4),
    dark: darken("#960012", 0.15),
    darker: darken("#960012", 0.3),
    contrastText: "#FFFFFF",
  },

  accent: {
    blue: "#30508C",
    purple: "#7D62AA",
    deepPurple: "#3B2A70",
    lime: "#DCEE32",
    softYellow: "#EFEC97",
    mintSoft: "#DBF288",
  },
};

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: COLORS.primary,
    secondary: COLORS.secondary,
    info: COLORS.info,
    success: COLORS.success,
    warning: COLORS.warning,
    error: COLORS.error,

    background: {
      default: COLORS.off,
      paper: COLORS.white,
    },

    text: {
      primary: COLORS.ink,
      secondary: alpha(COLORS.ink, 0.72),
    },

    divider: alpha(COLORS.primary.main, 0.14),
  },

  shape: { borderRadius: 18 },
});
