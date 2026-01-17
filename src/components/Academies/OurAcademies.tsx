import { Box, Typography, Paper, useTheme, alpha } from "@mui/material";
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
  coverImage: string;
  faculties: Faculty[];
  colors: {
    main: string;
    secondary: string;
  };
};

type OurAcademiesProps = {
  academies?: Academy[];
};

export default function OurAcademies({ academies }: OurAcademiesProps) {
  const theme = useTheme();
  const { t } = useTranslation("academies");
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const data: Academy[] = academies ?? [
    {
      key: "iaau",
      code: "IAAU",
      titleKey: "ourAcademies.items.iaau.title",
      titleFallback: "Architecture And Urbanism",
      logoSrc: iaauLogo,
      coverImage:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
      colors: { main: "#30508C", secondary: "#B0FDEB" },
      faculties: [],
    },
    {
      key: "aest",
      code: "AEST",
      titleKey: "ourAcademies.items.aest.title",
      titleFallback: "Engineering, Sciences And Information Technology",
      logoSrc: aestLogo,
      coverImage:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
      colors: { main: "#00A2CE", secondary: "#DBF288" },
      faculties: [],
    },
    {
      key: "aem",
      code: "AEM",
      titleKey: "ourAcademies.items.aem.title",
      titleFallback: "Economic And Management",
      logoSrc: aemLogo,
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      colors: { main: "#7D62AA", secondary: "#DCEE32" },
      faculties: [],
    },
    {
      key: "ahss",
      code: "AHSS",
      titleKey: "ourAcademies.items.ahss.title",
      titleFallback: "Human And Social Sciences",
      logoSrc: ahssLogo,
      coverImage:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80",
      colors: { main: "#FFB516", secondary: "#3B2A70" },
      faculties: [],
    },
    {
      key: "med",
      code: "IMA",
      titleKey: "ourAcademies.items.med.title",
      titleFallback: "Medical Academy",
      logoSrc: imaLogo,
      coverImage:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      colors: { main: "#960012", secondary: "#EFEC97" },
      faculties: [],
    },
  ];

  const LIVE_ACADEMY_KEY = "iaau";

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
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "nowrap", md: "nowrap" },
            gap: { xs: 2, md: 1.6 },
            justifyContent: { xs: "flex-start", md: "space-between" },
            width: "100%",
          }}
        >
          {data.map((a) => {
            const isLive = a.key === LIVE_ACADEMY_KEY;

            return (
              <Paper
                key={a.key}
                onClick={() => {
                  if (!isLive) return;
                  navigate(`/${currentLang}/${a.key}`);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                sx={{
                  flex: { xs: "0 0 auto", md: "1 1 0" },
                  minWidth: 0,
                  width: { xs: "100%", md: "auto" },

                  height: { xs: 160, md: 290 },

                  cursor: isLive ? "pointer" : "default",
                  borderRadius: { xs: 2, md: 2 },
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: `0 18px 60px ${alpha(
                    theme.palette.common.black,
                    0.18
                  )}`,
                  transition: "transform 220ms ease",

                  "&:hover": isLive
                    ? {
                        transform: "translateY(-4px)",
                      }
                    : undefined,
                }}
              >
                {/* Background */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${a.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: !isLive ? "saturate(0.85)" : "none",
                  }}
                />

                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.86) 100%)",
                  }}
                />

                {/* Code pill */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    px: 2,
                    py: 0.55,
                    borderRadius: 999,
                    background: alpha(theme.palette.common.white, 0.92),
                    fontWeight: 950,
                    fontSize: { xs: 14, md: 16 },
                    color: a.colors.main,
                    letterSpacing: "0.03em",
                  }}
                >
                  {a.code}
                </Box>

                {/* Bottom text */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    bottom: 14,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: alpha(theme.palette.common.white, 0.7),
                      mb: 0.6,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t("ourAcademies.internationalAcademyOf")}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 14.5, md: 16 },
                      fontWeight: 950,
                      pb: 1.5,
                      lineHeight: 1.15,
                      color: theme.palette.common.white,
                      maxWidth: "92%",
                    }}
                  >
                    {t(a.titleKey, a.titleFallback)}
                  </Typography>
                </Box>

                {/* Locked overlay */}
                {!isLive && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(180deg, ${alpha(
                        theme.palette.common.black,
                        0.55
                      )}, ${alpha(theme.palette.common.black, 0.35)})`,
                      backdropFilter: "blur(1px) saturate(140%)",
                      WebkitBackdropFilter: "blur(1px) saturate(140%)",
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.7,
                      }}
                    >
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          background: alpha(theme.palette.common.white, 0.12),
                          border: `1px solid ${alpha(
                            theme.palette.common.white,
                            0.22
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
                          fontSize: 11,
                        }}
                      >
                        {t("ourAcademies.comingSoon", "Coming Soon")}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            );
          })}
        </Box>
      </Box>
    </SectionShell>
  );
}
