import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SectionShell from "../layout/SectionShell";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import iaauLogo from "/imgs/iaau.png";
import imaLogo from "/imgs/ima.png";
import ahssLogo from "/imgs/ahss.png";
import aestLogo from "/imgs/aest.png";
import aemLogo from "/imgs/aem.png";

type Faculty = {
  key: string;
  titleKey: string;
  titleFallback: string;
};

type Academy = {
  key: string;
  code: string;
  titleKey: string;
  titleFallback: string;
  logoSrc: string;
  faculties: Faculty[];
  colors: {
    main: string;
    secondary: string;
  };
};

type OurAcademiesProps = {
  academies?: Academy[];
};

function getReadableTextColor(bg: string) {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 155 ? "#071316" : "#FFFFFF";
}

export default function OurAcademies({ academies }: OurAcademiesProps) {
  const theme = useTheme();
  const { t } = useTranslation("academies");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";
  const navigate = useNavigate();

  const data: Academy[] = academies ?? [
    {
      key: "iaau",
      code: "IAAU",
      titleKey: "ourAcademies.items.iaau.title",
      titleFallback: "International Academy of Architecture and Urbanism",
      logoSrc: iaauLogo,
      colors: { main: "#30508C", secondary: "#B0FDEB" },
      faculties: [
        {
          key: "artsDesign",
          titleKey: "ourAcademies.items.iaau.faculties.artsDesign",
          titleFallback: "Faculty of Arts and Design",
        },
        {
          key: "architectureUrbanism",
          titleKey: "ourAcademies.items.iaau.faculties.architectureUrbanism",
          titleFallback: "Faculty of Architecture and Urbanism",
        },
      ],
    },
    {
      key: "aest",
      code: "AEST",
      titleKey: "ourAcademies.items.aest.title",
      titleFallback:
        "Academy of Engineering, Sciences & Information Technology",
      logoSrc: aestLogo,
      colors: { main: "#00A2CE", secondary: "#DBF288" },
      faculties: [
        {
          key: "computingAI",
          titleKey: "ourAcademies.items.aest.faculties.computingAI",
          titleFallback:
            "Faculty of Computing, Information, and Artificial Intelligence",
        },
        {
          key: "science",
          titleKey: "ourAcademies.items.aest.faculties.science",
          titleFallback: "Faculty of Science",
        },
        {
          key: "engineering",
          titleKey: "ourAcademies.items.aest.faculties.engineering",
          titleFallback: "Faculty of Engineering",
        },
      ],
    },
    {
      key: "aem",
      code: "AEM",
      titleKey: "ourAcademies.items.aem.title",
      titleFallback: "Academy of Economics and Management",
      logoSrc: aemLogo,
      colors: { main: "#7D62AA", secondary: "#DCEE32" },
      faculties: [
        {
          key: "tourismHospitality",
          titleKey: "ourAcademies.items.aem.faculties.tourismHospitality",
          titleFallback: "Faculty of Tourism and Hospitality",
        },
        {
          key: "businessAdministration",
          titleKey: "ourAcademies.items.aem.faculties.businessAdministration",
          titleFallback: "Faculty of Business Administration",
        },
      ],
    },
    {
      key: "ahss",
      code: "AHSS",
      titleKey: "ourAcademies.items.ahss.title",
      titleFallback: "Academy of Humanities and Social Sciences",
      logoSrc: ahssLogo,
      colors: { main: "#FFB516", secondary: "#3B2A70" },
      faculties: [
        {
          key: "media",
          titleKey: "ourAcademies.items.ahss.faculties.media",
          titleFallback: "Faculty of Media",
        },
        {
          key: "languagesTranslation",
          titleKey: "ourAcademies.items.ahss.faculties.languagesTranslation",
          titleFallback: "Faculty of Languages and Translation",
        },
        {
          key: "education",
          titleKey: "ourAcademies.items.ahss.faculties.education",
          titleFallback: "Faculty of Education",
        },
        {
          key: "law",
          titleKey: "ourAcademies.items.ahss.faculties.law",
          titleFallback: "Faculty of Law",
        },
      ],
    },
    {
      key: "med",
      code: "IMA",
      titleKey: "ourAcademies.items.med.title",
      titleFallback: "International Medical Academy",
      logoSrc: imaLogo,
      colors: { main: "#960012", secondary: "#EFEC97" },
      faculties: [
        {
          key: "nursing",
          titleKey: "ourAcademies.items.med.faculties.nursing",
          titleFallback: "Faculty of Nursing",
        },
        {
          key: "physicalTherapy",
          titleKey: "ourAcademies.items.med.faculties.physicalTherapy",
          titleFallback: "Faculty of Physical Therapy",
        },
        {
          key: "pharmacy",
          titleKey: "ourAcademies.items.med.faculties.pharmacy",
          titleFallback: "Faculty of Pharmacy",
        },
        {
          key: "dentistry",
          titleKey: "ourAcademies.items.med.faculties.dentistry",
          titleFallback: "Faculty of Dentistry",
        },
        {
          key: "medicine",
          titleKey: "ourAcademies.items.med.faculties.medicine",
          titleFallback: "Faculty of Medicine",
        },
      ],
    },
  ];

  const LIVE_ACADEMY_KEY = "iaau";

  const [open, setOpen] = React.useState(false);
  const [active] = React.useState<Academy | null>(null);

  const closeAcademy = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SectionShell
      id="our-academies"
      eyebrow={t("ourAcademies.eyebrow", "Academies")}
      title={t("ourAcademies.title", "Our Academies")}
      subtitle={t(
        "ourAcademies.subtitle",
        "Discover the academic structure and faculties across all academies."
      )}
      variant="light"
    >
      <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: { xs: 1.4, md: 2 },
            alignItems: "stretch",
            pb: 1,
            WebkitOverflowScrolling: "touch",
            scrollSnapType: { xs: "none", sm: "x mandatory" },
            "& > *": { scrollSnapAlign: { sm: "start" } },
            "&::-webkit-scrollbar": { height: { xs: 0, sm: 8 } },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(theme.palette.text.primary, 0.18),
              borderRadius: 99,
            },
          }}
        >
          {data.map((a) => {
            const isLive = a.key === LIVE_ACADEMY_KEY;
            const isFeatured = isLive;

            return (
              <Paper
                key={a.key}
                role={isLive ? "link" : undefined}
                tabIndex={isLive ? 0 : -1}
                aria-disabled={!isLive}
                onClick={() => {
                  if (!isLive) return;

                  navigate(`/${currentLang}/iaau`);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                onKeyDown={(e) => {
                  if (!isLive) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/${currentLang}/iaau`);
                    window.scrollTo({ top: 0, behavior: "auto" });
                  }
                }}
                sx={{
                  flex: "0 0 auto",
                  cursor: isLive ? "pointer" : "default",
                  pointerEvents: isLive ? "auto" : "none",
                  color: "inherit",

                  width: {
                    xs: "100%",
                    sm: isFeatured ? 305 : 245,
                    md: isFeatured ? 325 : 250,
                    lg: isFeatured ? 280 : 210,
                  },

                  borderRadius: 1.8,
                  position: "relative",
                  overflow: "hidden",
                  background: alpha(theme.palette.background.paper, 0.94),

                  border: `1px solid ${alpha(
                    theme.palette.text.primary,
                    isFeatured ? 0.12 : 0.08
                  )}`,

                  boxShadow: isFeatured
                    ? `0 26px 110px ${alpha(theme.palette.common.black, 0.18)}`
                    : `0 18px 70px ${alpha(theme.palette.common.black, 0.1)}`,

                  transform: isFeatured ? "translateY(-2px)" : "none",

                  transition:
                    "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",

                  "&:hover": isLive
                    ? {
                        transform: isFeatured
                          ? "translateY(-5px)"
                          : "translateY(-3px)",
                        boxShadow: `0 30px 100px ${alpha(
                          theme.palette.common.black,
                          0.18
                        )}`,
                        borderColor: alpha(a.colors.main, 0.45),
                      }
                    : undefined,
                }}
              >
                <Box
                  sx={{
                    p: { xs: 1.6, md: 1.9 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.15,
                    filter: !isLive ? "saturate(0.85)" : "none",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.55,
                        borderRadius: 999,
                        background: a.colors.main,
                        color: getReadableTextColor(a.colors.main),
                        fontWeight: 950,
                        letterSpacing: "0.08em",
                        fontSize: 11,
                        border: `1px solid ${alpha(
                          theme.palette.common.black,
                          0.1
                        )}`,
                      }}
                    >
                      {a.code}
                    </Box>

                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 999,
                        display: "grid",
                        placeItems: "center",
                        background: alpha(a.colors.main, 0.08),
                        border: `1px solid ${alpha(a.colors.main, 0.18)}`,
                        color: a.colors.main,
                        opacity: isLive ? 1 : 0.6,
                      }}
                    >
                      <KeyboardArrowDownRoundedIcon />
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      height: { xs: 140, md: isFeatured ? 185 : 170 },
                      borderRadius: 2.2,
                      background: "transparent",
                      border: "none",
                      display: "grid",
                      placeItems: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: a.colors.main,
                        opacity: 0.05,
                      }}
                    />
                    <Box
                      component="img"
                      src={a.logoSrc}
                      alt={a.code}
                      sx={{
                        height: { xs: 95, md: isFeatured ? 125 : 115 },
                        width: "auto",
                        maxWidth: "90%",
                        display: "block",
                        filter: `drop-shadow(0 18px 26px ${alpha(
                          theme.palette.common.black,
                          isFeatured ? 0.18 : 0.14
                        )})`,
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 950,
                      letterSpacing: "-0.03em",
                      fontSize: { xs: 15.5, md: isFeatured ? 17.25 : 16.5 },
                      lineHeight: 1.15,
                      color: theme.palette.text.primary,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t(a.titleKey, a.titleFallback)}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Typography
                      sx={{
                        color: alpha(theme.palette.text.primary, 0.64),
                        fontWeight: 750,
                        fontSize: 12.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t("ourAcademies.including", "Including")}{" "}
                      <Box
                        component="span"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 950,
                        }}
                      >
                        {a.faculties.length}
                      </Box>{" "}
                      {t("ourAcademies.faculties", "faculties")}
                    </Typography>

                    <Box
                      sx={{
                        height: 28,
                        px: 1,
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.8,
                        background: alpha(a.colors.main, 0.08),
                        border: `1px solid ${alpha(a.colors.main, 0.16)}`,
                        color: a.colors.main,
                        fontWeight: 950,
                        fontSize: 11.5,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        opacity: isLive ? 1 : 0.55,
                      }}
                    >
                      {t("ourAcademies.viewDetails", "View details")}
                    </Box>
                  </Stack>
                </Box>

                {/* Coming soon */}
                {!isLive && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      display: "grid",
                      placeItems: "center",
                      p: 2,
                      background: `linear-gradient(180deg, ${alpha(
                        theme.palette.common.black,
                        0.58
                      )}, ${alpha(theme.palette.common.black, 0.42)})`,
                      backdropFilter: "blur(1px) saturate(140%)",
                      WebkitBackdropFilter: "blur(1px) saturate(140%)",
                      borderRadius: "inherit",
                      pointerEvents: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          background: alpha(theme.palette.common.white, 0.12),
                          border: `1px solid ${alpha(
                            theme.palette.common.white,
                            0.22
                          )}`,
                          boxShadow: `0 18px 60px ${alpha(
                            theme.palette.common.black,
                            0.35
                          )}`,
                        }}
                      >
                        <LockRoundedIcon
                          sx={{
                            color: alpha(theme.palette.common.white, 0.92),
                            fontSize: 22,
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          color: alpha(theme.palette.common.white, 0.92),
                          fontWeight: 950,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontSize: 11.5,
                        }}
                      >
                        {t("ourAcademies.comingSoon", "Coming Soon")}
                      </Typography>

                      <Typography
                        sx={{
                          color: alpha(theme.palette.common.white, 0.78),
                          fontWeight: 700,
                          fontSize: 12.25,
                          maxWidth: 180,
                          lineHeight: 1.5,
                        }}
                      >
                        {t("ourAcademies.lockedHint", "Tab to show details")}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            );
          })}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={closeAcademy}
        PaperProps={{
          sx: {
            borderRadius: 1.7,
            background: alpha(theme.palette.background.paper, 0.96),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
            boxShadow: `0 28px 90px ${alpha(theme.palette.common.black, 0.22)}`,
            backdropFilter: "blur(10px) saturate(180%)",
            minWidth: { xs: "92vw", sm: 560 },
          },
        }}
      >
        {/* mu */}
        <DialogTitle
          sx={{
            fontWeight: 950,
            letterSpacing: "-0.03em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {active
            ? t(active.titleKey, active.titleFallback)
            : t("ourAcademies.details", "Details")}
          <IconButton onClick={closeAcademy}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0.5 }}>
          <Typography
            sx={{
              color: alpha(theme.palette.text.primary, 0.72),
              lineHeight: 1.7,
            }}
          >
            {t(
              "ourAcademies.popupText",
              "This academy includes multiple faculties. Full details will be displayed here."
            )}
          </Typography>

          <Divider
            sx={{
              my: 2.2,
              height: 3,
              border: "none",
              background: active
                ? `linear-gradient(
          90deg,
          transparent,
          ${alpha(active.colors.main, 0.45)},
          transparent
        )`
                : "rgba(7,19,22,0.12)",
            }}
          />

          <Typography
            sx={{ fontWeight: 950, mb: 1, color: theme.palette.text.primary }}
          >
            {t("ourAcademies.facultyList", "Faculties")}
          </Typography>

          <Box
            component="ol"
            sx={{
              m: 0,
              p: 0,
              listStylePosition: "inside",
              display: "grid",
              gap: 1,
            }}
          >
            {(active?.faculties ?? []).map((f, idx) => (
              <Box
                component="li"
                key={`${f.key}-${idx}`}
                sx={{ color: alpha(theme.palette.text.primary, 0.82) }}
              >
                <Typography
                  sx={{
                    display: "inline",
                    fontWeight: 800,
                    color: theme.palette.text.primary,
                  }}
                >
                  {t(f.titleKey, f.titleFallback)}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={closeAcademy}
            variant="contained"
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 900,
              px: 2.4,
              boxShadow: "none",
              backgroundColor: active?.colors.main,
              color: getReadableTextColor(active?.colors.main ?? "#006E71"),
              "&:hover": {
                backgroundColor: active?.colors.main,
                boxShadow: "none",
                filter: "brightness(0.92)",
              },
              "&:active": {
                filter: "brightness(0.88)",
              },
              "&.Mui-disabled": {
                backgroundColor: alpha(theme.palette.text.primary, 0.12),
                color: alpha(theme.palette.text.primary, 0.4),
              },
            }}
            disabled={!active}
          >
            {t("ourAcademies.close", "Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </SectionShell>
  );
}
