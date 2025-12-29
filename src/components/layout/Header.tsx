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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iusatLogo from "/imgs/iusat.png";

type NavKey = "learn" | "research" | "innovate" | "consultancy" | "about";

type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  items: Array<{ label: string; href: string }>;
};

const NAV: NavItem[] = [
  {
    key: "learn",
    label: "Learn",
    href: "",
    items: [
      { label: "Micro-credentials", href: "#learn-micro" },
      { label: "Short courses", href: "#learn-short" },
      { label: "Professional certificates", href: "#learn-cert" },
      { label: "Cross-academy learning", href: "#learn-cross" },
      { label: "Lifelong learning", href: "#learn-life" },
    ],
  },
  {
    key: "research",
    label: "Research",
    href: "",
    items: [
      { label: "UNESCO Chair", href: "#research-unesco" },
      { label: "Research themes", href: "#research-themes" },
      { label: "Think tanks", href: "#research-thinktanks" },
      { label: "Publications", href: "#research-publications" },
    ],
  },
  {
    key: "innovate",
    label: "Innovate",
    href: "",
    items: [
      { label: "iHub Innovation", href: "#innovate-ihub" },
      { label: "Industry partnerships", href: "#innovate-partnerships" },
      { label: "Startups & incubation", href: "#innovate-startups" },
    ],
  },
  {
    key: "consultancy",
    label: "Consultancy",
    href: "",
    items: [],
  },
  {
    key: "about",
    label: "About",
    href: "",
    items: [
      { label: "Vision & mission", href: "#about-vision" },
      { label: "Founding story", href: "#about-story" },
      { label: "Leadership", href: "#about-leadership" },
      { label: "Campus", href: "#about-campus" },
      { label: "Student Life", href: "#about-studentlife" },
      { label: "Contact", href: "#about-contact" },
      { label: "News & announcements", href: "#about-news" },
    ],
  },
];

function DesktopNav() {
  const theme = useTheme();

  const [openKey, setOpenKey] = React.useState<NavKey | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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
    }, 175); // small delay to allow moving to dropdown
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

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 0.5,
        alignItems: "center",
      }}
    >
      {NAV.map((item) => (
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
          {item.label}
        </Button>
      ))}

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        modifiers={[
          { name: "offset", options: { offset: [0, 14] } },
          { name: "preventOverflow", options: { padding: 12 } },
        ]}
        sx={{ zIndex: (t) => t.zIndex.modal }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={160}>
            <Box onMouseEnter={clearCloseTimer} onMouseLeave={scheduleClose}>
              <ClickAwayListener onClickAway={hardClose}>
                <Box sx={{ position: "relative" }}>
                  {/* Connector  */}
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
                      background: "rgba(255, 255, 255, 0.4)",
                      backdropFilter: "blur(16px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.42)",
                      boxShadow: "0 22px 60px rgba(0,0,0,0.10)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background:
                          "radial-gradient(900px 220px at 30% -10%, rgba(0,110,113,0.14), transparent 60%), radial-gradient(700px 220px at 90% 0%, rgba(38,185,155,0.14), transparent 55%)",
                      }}
                    />

                    <Box sx={{ position: "relative" }}>
                      <Divider sx={{ opacity: 0.45, mb: 1.2 }} />

                      {/* column items */}
                      <Stack spacing={0.25}>
                        {(current?.items ?? []).map((link) => (
                          <Box
                            key={link.label}
                            component="a"
                            href={link.href}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              textDecoration: "none",
                              borderRadius: "14px",
                              px: 1.2,
                              py: 1.0,
                              transition: "transform 160ms ease",
                              "&:hover": { transform: "translateY(-1px)" },
                            }}
                          >
                            {/* DOT */}
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
                              }}
                            >
                              {link.label}
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
}: {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "86vw",
          maxWidth: 380,
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
          background: "rgba(255, 255, 255, 0.70)",
          backdropFilter: "blur(18px) saturate(180%)",
          borderLeft: "1px solid rgba(255,255,255,0.55)",
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
          }}
        >
          <Typography sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
            Menu
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
            bgcolor: "rgba(0, 0, 0, 0.05)",
            borderRadius: "50px",
            px: 2,
            py: 0.8,
            mb: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)" }} />
          <InputBase
            placeholder="Explore..."
            sx={{ fontSize: "0.95rem", ml: 1, width: "100%" }}
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
              <Typography sx={{ fontWeight: 800 }}>{section.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <List disablePadding>
                {section.items.map((item, index) => (
                  <Box key={item.label}>
                    <ListItemButton
                      component="a"
                      href={item.href}
                      onClick={onClose}
                      sx={{
                        borderRadius: 14,
                        py: 1.1,
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
                          mr: 1.2,
                          flexShrink: 0,
                        }}
                      />
                      <ListItemText
                        primary={
                          <Typography
                            className="mobileText"
                            sx={{ fontWeight: 650 }}
                          >
                            {item.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>

                    {/* Separator line between items */}
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
            src={iusatLogo}
            alt="IUSAT Logo"
            sx={{
              height: { xs: 180 },
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: { xs: 10, md: 20 },
          left: "50%",
          transform: "translateX(-50%)",
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
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: { xs: 60, md: 74 },
              px: 2,
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={iusatLogo}
                alt="IUSAT Logo"
                sx={{
                  height: { xs: 50, md: 80 },
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
                  fontSize: { xs: "1.1rem", md: "2rem" },
                }}
              >
                IUSAT
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Side Tools */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Search (desktop) */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "50px",
                  px: 2,
                  py: 0.6,
                  width: { sm: 180, md: 220 },
                }}
              >
                <SearchIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)" }} />
                <InputBase
                  placeholder="Explore..."
                  sx={{ fontSize: "0.9rem", ml: 1, width: "100%" }}
                />
              </Box>

              {/* Mobile Menu */}
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

      {/* Mobile Drawer */}
      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
