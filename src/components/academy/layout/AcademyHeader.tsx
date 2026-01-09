import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  InputBase,
  IconButton,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Stack,
  Divider,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// غيّر المسار ده لملف لوجو الأكاديمية عندك
import academyLogo from "/imgs/iaau.png";

type NavKey = "programs" | "admissions" | "research" | "about";

type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  items: Array<{ id: string; label: string; href: string }>;
};

const NAV: NavItem[] = [
  {
    key: "programs",
    label: "Programs",
    href: "",
    items: [
      { id: "undergrad", label: "Undergraduate", href: "#programs-undergrad" },
      { id: "postgrad", label: "Postgraduate", href: "#programs-postgrad" },
      { id: "short", label: "Short Courses", href: "#programs-short" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    href: "",
    items: [
      { id: "apply", label: "How to apply", href: "#admissions-apply" },
      { id: "fees", label: "Fees & funding", href: "#admissions-fees" },
      { id: "faq", label: "FAQ", href: "#admissions-faq" },
    ],
  },
  {
    key: "research",
    label: "Research",
    href: "",
    items: [
      { id: "labs", label: "Labs & studios", href: "#research-labs" },
      { id: "publications", label: "Publications", href: "#research-pubs" },
    ],
  },
  {
    key: "about",
    label: "About",
    href: "",
    items: [
      { id: "mission", label: "Mission & vision", href: "#about-mission" },
      { id: "team", label: "Leadership", href: "#about-team" },
      { id: "contact", label: "Contact", href: "#about-contact" },
    ],
  },
];

function LangLabel({ code }: { code: string }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Box component="span" sx={{ fontWeight: 800, letterSpacing: "0.02em" }}>
        {code}
      </Box>
    </Box>
  );
}

function DesktopNav({ isRTL }: { isRTL: boolean }) {
  const theme = useTheme();
  const { t } = useTranslation("navAcademy");

  const [openKey, setOpenKey] = React.useState<NavKey | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [arrowEl] = React.useState<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const open = Boolean(openKey && anchorEl);
  const current = React.useMemo(
    () => NAV.find((n) => n.key === openKey) ?? null,
    [openKey]
  );

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenKey(null);
      setAnchorEl(null);
    }, 175);
  };

  const openMenu = (key: NavKey, el: HTMLElement) => {
    clearCloseTimer();
    setOpenKey(key);
    setAnchorEl(el);
  };

  const hardClose = () => {
    clearCloseTimer();
    setOpenKey(null);
    setAnchorEl(null);
  };

  const navLabel = (key: NavKey, fallback: string) =>
    t(`top.${key}`, { defaultValue: fallback });

  const itemLabel = (id: string, fallback: string) =>
    t(`items.${id}`, { defaultValue: fallback });

  const navList = isRTL ? [...NAV].reverse() : NAV;

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 0.5,
        alignItems: "center",
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "center",
      }}
    >
      {navList.map((item) => (
        <Button
          key={item.key}
          href={item.href}
          onMouseEnter={(e) => openMenu(item.key, e.currentTarget)}
          onMouseLeave={scheduleClose}
          sx={{
            textTransform: "none",
            fontWeight: 650,
            fontSize: "0.92rem",
            color:
              openKey === item.key
                ? theme.palette.text.primary
                : "rgba(0,0,0,0.72)",
            px: 1.8,
            borderRadius: "14px",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.palette.primary.main,
            },
          }}
        >
          {navLabel(item.key, item.label)}
        </Button>
      ))}

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={isRTL ? "bottom-end" : "bottom-start"}
        transition
        modifiers={[
          { name: "offset", options: { offset: [0, 14] } },
          { name: "preventOverflow", options: { padding: 12 } },
          { name: "flip", options: { padding: 12 } },
          { name: "arrow", options: { element: arrowEl, padding: 14 } },
        ]}
        sx={{ zIndex: (t) => t.zIndex.appBar + 5 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={160}>
            <Box onMouseEnter={clearCloseTimer} onMouseLeave={scheduleClose}>
              <ClickAwayListener onClickAway={hardClose}>
                <Box sx={{ position: "relative", overflow: "visible" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      left: 22,
                      width: 16,
                      height: 16,
                      transform: "rotate(45deg)",
                      background: "rgba(255, 255, 255, 0.55)",
                      backdropFilter: "blur(16px) saturate(180%)",
                      borderLeft: "1px solid rgba(255, 255, 255, 0.42)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.42)",
                      boxShadow: "0 18px 44px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      minWidth: 320,
                      maxWidth: 380,
                      borderRadius: "18px",
                      background: "rgba(255, 255, 255, 0.40)",
                      backdropFilter: "blur(18px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.45)",
                      boxShadow: "0 22px 70px rgba(0,0,0,0.12)",
                      overflow: "hidden",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `radial-gradient(900px 220px at 30% -10%, ${theme.palette.primary.main}22, transparent 60%),
                                     radial-gradient(700px 220px at 90% 0%, ${theme.palette.primary.light}22, transparent 55%)`,
                      }}
                    />

                    <Box sx={{ position: "relative" }}>
                      <Divider sx={{ opacity: 0.45, mb: 1.2 }} />
                      <Stack spacing={0.25}>
                        {(current?.items ?? []).map((link) => (
                          <Box
                            key={link.id}
                            component="a"
                            href={link.href}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: isRTL ? "row-reverse" : "row",
                              gap: 1,
                              textDecoration: "none",
                              borderRadius: "14px",
                              px: 1.2,
                              py: 1.0,
                              transition: "transform 160ms ease",
                              "&:hover": { transform: "translateY(-1px)" },
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "999px",
                                bgcolor: theme.palette.primary.main,
                                flex: "0 0 auto",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.95rem",
                                fontWeight: 650,
                                color: theme.palette.text.primary,
                                transition: "color 140ms ease",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                                textAlign: isRTL ? "right" : "left",
                              }}
                            >
                              {itemLabel(link.id, link.label)}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Paper>
                </Box>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

function MobileNavDrawer({
  open,
  onClose,
  isRTL,
}: {
  open: boolean;
  onClose: () => void;
  isRTL: boolean;
}) {
  const theme = useTheme();
  const { t } = useTranslation("navAcademy");

  const navLabel = (key: NavKey, fallback: string) =>
    t(`top.${key}`, { defaultValue: fallback });
  const itemLabel = (id: string, fallback: string) =>
    t(`items.${id}`, { defaultValue: fallback });

  return (
    <Drawer
      anchor={isRTL ? "left" : "right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "86vw",
          maxWidth: 380,
          borderTopLeftRadius: isRTL ? 0 : 22,
          borderBottomLeftRadius: isRTL ? 0 : 22,
          borderTopRightRadius: isRTL ? 22 : 0,
          borderBottomRightRadius: isRTL ? 22 : 0,
          background: "rgba(255, 255, 255, 0.70)",
          backdropFilter: "blur(18px) saturate(180%)",
          borderLeft: isRTL ? "none" : "1px solid rgba(255,255,255,0.55)",
          borderRight: isRTL ? "1px solid rgba(255,255,255,0.55)" : "none",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <Typography sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
            {t("mobile.menu", { defaultValue: "Menu" })}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: theme.palette.text.primary }}
          >
            ✕
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isRTL ? "row-reverse" : "row",
            bgcolor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "50px",
            px: 2,
            py: 0.8,
            mb: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)" }} />
          <InputBase
            placeholder={t("search.placeholder", {
              defaultValue: "Explore...",
            })}
            sx={{
              fontSize: "0.95rem",
              ml: isRTL ? 0 : 1,
              mr: isRTL ? 1 : 0,
              width: "100%",
              textAlign: isRTL ? "right" : "left",
            }}
          />
        </Box>

        {NAV.map((section) => (
          <Accordion
            key={section.key}
            disableGutters
            elevation={0}
            sx={{
              background: "transparent",
              "&:before": { display: "none" },
              borderRadius: 1,
              overflow: "hidden",
              mb: 1,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 800 }}>
                {navLabel(section.key, section.label)}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ pt: 0 }}>
              <List disablePadding>
                {section.items.map((item, index) => (
                  <Box key={item.id}>
                    <ListItemButton
                      component="a"
                      href={item.href}
                      onClick={onClose}
                      sx={{
                        borderRadius: 14,
                        py: 1.1,
                        display: "flex",
                        flexDirection: isRTL ? "row-reverse" : "row",
                        "&:hover .mobileText": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: theme.palette.primary.main,
                          ml: isRTL ? 1.2 : 0,
                          mr: isRTL ? 0 : 1.2,
                          flexShrink: 0,
                        }}
                      />
                      <ListItemText
                        primary={
                          <Typography
                            className="mobileText"
                            sx={{
                              fontWeight: 650,
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            {itemLabel(item.id, item.label)}
                          </Typography>
                        }
                      />
                    </ListItemButton>

                    {index !== section.items.length - 1 && (
                      <Box
                        sx={{
                          height: "2px",
                          mx: 3.5,
                          background:
                            "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Box
            component="img"
            src={academyLogo}
            alt="Academy Logo"
            sx={{
              height: 180,
              width: "auto",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default function AcademyHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation("navAcademy");

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const changeLang = (lng: string) => {
    const segments = location.pathname.split("/");
    segments[1] = lng;
    const newPath = segments.join("/") || `/${lng}/iaau`;
    navigate(newPath);
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const LANGS = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ] as const;

  const current = LANGS.find((x) => x.code === currentLang) ?? LANGS[1];

  const selectMenuProps = {
    disableScrollLock: true,
    anchorOrigin: {
      vertical: "bottom" as const,
      horizontal: "center" as const,
    },
    transformOrigin: {
      vertical: "top" as const,
      horizontal: "center" as const,
    },
    PaperProps: {
      elevation: 0,
      sx: {
        mt: 1,
        width: "auto",
        minWidth: 90,
        maxWidth: 160,
        borderRadius: 1,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.55)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.14)",
        "& .MuiMenu-list": {
          p: 0.75,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        },
        "& .MuiMenuItem-root": {
          position: "relative",
          borderRadius: 999,
          px: 1.25,
          py: 1.0,
          fontWeight: 800,
          color: "rgba(0,0,0,0.78)",
          "&:not(:last-of-type)::after": {
            content: '""',
            position: "absolute",
            left: "5%",
            right: "5%",
            bottom: -4,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent)",
            opacity: 5,
          },
          "&.Mui-selected": {
            backgroundColor: "transparent",
            color: "#000",
            fontWeight: 900,
            position: "relative",
            paddingInlineStart: "26px",
            paddingInlineEnd: "18px",
            "&::before": {
              content: '""',
              position: "absolute",
              insetInlineStart: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: theme.palette.primary.main,
            },
          },
          "&.Mui-selected:hover": { backgroundColor: "transparent" },
        },
      },
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: { xs: 10, md: 20 },
          left: 0,
          right: 0,
          mx: "auto",
          width: { xs: "95%", md: "90%" },
          maxWidth: "1400px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          color: "#1d1d1f",
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{ px: { xs: 1.5, md: 2 } }}
        >
          <Toolbar
            disableGutters
            sx={{
              height: { xs: 60, md: 74 },
              px: { xs: 1, md: 2 },
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: { xs: "1fr auto 1fr", md: "1fr auto 1fr" },
              columnGap: 1,
            }}
          >
            {/* Left */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isRTL ? "flex-end" : "flex-start",
                flexDirection: isRTL ? "row-reverse" : "row",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Box
                  component={Link}
                  to={`/${currentLang}/iaau`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    textDecoration: "none",
                    color: "inherit",
                    flexDirection: isRTL ? "row-reverse" : "row",
                  }}
                >
                  <Box
                    component="img"
                    src={academyLogo}
                    alt="Academy Logo"
                    sx={{
                      height: { md: 58 },
                      width: "auto",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: "-0.05em",
                      color: "#000",
                      fontSize: { md: "1.6rem" },
                      lineHeight: 1,
                    }}
                  >
                    {t("brand.short", { defaultValue: "IAAU" })}
                  </Typography>
                </Box>
              </Box>

              {/* Mobile language select */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                }}
              >
                <Select
                  size="small"
                  value={currentLang}
                  onChange={(e) => changeLang(String(e.target.value))}
                  renderValue={() => <LangLabel code={current.label} />}
                  sx={{
                    height: 36,
                    borderRadius: "999px",
                    bgcolor: "rgba(0,0,0,0.05)",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                    },
                    minWidth: 110,
                    px: 0.5,
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  MenuProps={selectMenuProps as any}
                >
                  {LANGS.map((l) => (
                    <MenuItem key={l.code} value={l.code}>
                      <LangLabel code={l.label} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Center */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Mobile brand */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Box
                  component={Link}
                  to={`/${currentLang}/iaau`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    textDecoration: "none",
                    color: "inherit",
                    flexDirection: isRTL ? "row-reverse" : "row",
                  }}
                >
                  <Box
                    component="img"
                    src={academyLogo}
                    alt="Academy Logo"
                    sx={{
                      height: 46,
                      width: "auto",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: "-0.05em",
                      color: "#000",
                      fontSize: "1.25rem",
                      lineHeight: 1,
                    }}
                  >
                    {t("brand.short", { defaultValue: "IAAU" })}
                  </Typography>
                </Box>
              </Box>

              {/* Desktop nav */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <DesktopNav isRTL={isRTL} />
              </Box>
            </Box>

            {/* Right */}
            <Box
              sx={{
                display: "flex",
                justifyContent: isRTL ? "flex-start" : "flex-end",
                alignItems: "center",
                gap: 1,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <Select
                size="small"
                value={currentLang}
                onChange={(e) => changeLang(String(e.target.value))}
                renderValue={() => <LangLabel code={current.label} />}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  height: 36,
                  borderRadius: "999px",
                  bgcolor: "rgba(0,0,0,0.05)",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                  },
                  minWidth: 110,
                  px: 0.5,
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                MenuProps={selectMenuProps as any}
              >
                {LANGS.map((l) => (
                  <MenuItem key={l.code} value={l.code}>
                    <LangLabel code={l.label} />
                  </MenuItem>
                ))}
              </Select>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "50px",
                  px: 2,
                  py: 0.6,
                  width: { sm: 180, md: "auto" },
                }}
              >
                <SearchIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)" }} />
                <InputBase
                  placeholder={t("search.placeholder", {
                    defaultValue: "Explore...",
                  })}
                  sx={{
                    fontSize: "0.9rem",
                    ml: isRTL ? 0 : 1,
                    mr: isRTL ? 1 : 0,
                    width: "100%",
                    textAlign: isRTL ? "right" : "left",
                  }}
                />
              </Box>

              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: "flex", md: "none" }, color: "#000" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isRTL={isRTL}
      />
    </>
  );
}
