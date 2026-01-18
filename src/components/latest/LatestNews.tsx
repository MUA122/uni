import { Box, Typography, Paper, useTheme, alpha } from "@mui/material";
import SectionShell from "../layout/SectionShell";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type NewsItem = {
  key: string;
  titleKey: string;
  titleFallback: string;
  descKey: string;
  descFallback: string;
  image: string;
  href?: string;
};

type LatestNewsProps = {
  items?: NewsItem[];
};

const DARK_TEAL = "#006E71";
const LIGHT_TEAL = "#26B99B";

export default function LatestNews({ items }: LatestNewsProps) {
  const theme = useTheme();
  const { t } = useTranslation("latestNews");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const data: NewsItem[] = items ?? [
    {
      key: "opening",
      titleKey: "items.opening.title",
      titleFallback: "opening",
      descKey: "items.opening.desc",
      descFallback:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
      href: `/${currentLang}/news/opening`,
    },
    {
      key: "microCredentials",
      titleKey: "items.microCredentials.title",
      titleFallback: "Micro-Credentials",
      descKey: "items.microCredentials.desc",
      descFallback:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      href: `/${currentLang}/news/micro-credentials`,
    },
  ];

  return (
    <SectionShell
      id="latest-news"
      title={t("title", "Latest news")}
      subtitle={t("subtitle", "")}
      variant="light"
    >
      <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            maxWidth: 800,
            mx: "auto",
            width: "100%",
            gap: { xs: 2, md: 3 },
            alignItems: "stretch",
          }}
        >
          {data.map((n) => (
            <Paper
              key={n.key}
              sx={{
                borderRadius: 2.2,
                overflow: "hidden",
                background: "transparent",
                boxShadow: `0 18px 60px ${alpha(
                  theme.palette.common.black,
                  0.12,
                )}`,
                transition: "transform 220ms ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  position: "relative",

                  height: { xs: 170, md: 200 },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={n.image}
                  alt={t(n.titleKey, n.titleFallback)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* TEXT AREA */}
              <Box
                sx={{
                  backgroundColor: LIGHT_TEAL,

                  px: { xs: 2.4, md: 3 },
                  py: { xs: 2.4, md: 3 },

                  minHeight: { xs: 170, md: 190 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 34, md: 42 },
                    fontWeight: 950,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    mb: 1.5,
                  }}
                >
                  {t(n.titleKey, n.titleFallback)}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 13.5, md: 14.5 },
                    fontWeight: 650,
                    lineHeight: 1.7,
                    maxWidth: 480,
                    color: alpha(theme.palette.common.white, 0.92),
                  }}
                >
                  {t(n.descKey, n.descFallback)}
                </Typography>

                {/* Small line */}
                <Box
                  sx={{
                    mt: 2.3,
                    width: 70,
                    height: 3,
                    backgroundColor: alpha(DARK_TEAL, 0.85),
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
