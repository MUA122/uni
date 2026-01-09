import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

/* helpers */
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgba(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export default function AcademyFooter() {
  const { t } = useTranslation("footer");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const primary = "#0B1E3A";
  const accent = "#08162B";

  const darkBlue = "#0B1E3A";
  const darkBlueDeep = "#08162B";

  const cols = [
    {
      titleKey: "visit",
      links: [
        { key: "iusat_map", label: "IUSAT Map" },
        { key: "iusat_shop", label: "IUSAT shop" },
        { key: "contact_iusat", label: "Contact IUSAT" },
      ],
    },
    {
      titleKey: "students",
      links: [
        { key: "accommodation", label: "Accommodation" },
        { key: "current_students", label: "Current Students" },
        { key: "moodle", label: "Moodle" },
        { key: "students_union", label: "Students Union" },
      ],
    },
    {
      titleKey: "staff",
      links: [
        { key: "inside_iusat", label: "Inside IUSAT" },
        { key: "staff_intranet", label: "Staff Intranet" },
        { key: "work_at_iusat", label: "Work at IUSAT" },
        { key: "human_resources", label: "Human Resources" },
      ],
    },
  ] as const;

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(1000px 540px at 18% 0%, ${rgba(
              accent,
              0.22
            )} 0%, transparent 60%),` +
            `radial-gradient(1000px 520px at 85% 25%, ${rgba(
              primary,
              0.28
            )} 0%, transparent 60%),` +
            `linear-gradient(180deg, ${darkBlue} 0%, ${darkBlueDeep} 100%)`,
        }}
      />

      <Container sx={{ position: "relative", py: { xs: 6, md: 8 } }}>
        {/* CTA */}
        <Box
          sx={{
            borderRadius: 2.5,
            p: { xs: 3, md: 5 },
            mb: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 520, textAlign: isRTL ? "right" : "left" }}>
            <Typography
              sx={{
                color: accent,
                fontWeight: 800,
                letterSpacing: "0.25em",
                fontSize: 12,
                mb: 1.5,
              }}
            >
              {t("cta.tag")}
            </Typography>

            <Typography
              sx={{
                color: "white",
                fontWeight: 900,
                fontSize: { xs: 26, md: 36 },
                lineHeight: 1.15,
              }}
            >
              {t("cta.title.line1")}
              <br />
              {t("cta.title.line2")}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.65)",
                mt: 2,
                lineHeight: 1.8,
              }}
            >
              {t("cta.subtitle")}
            </Typography>
          </Box>

          <Stack spacing={2} alignItems={isRTL ? "flex-start" : "flex-end"}>
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardRoundedIcon
                  sx={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                />
              }
              sx={{
                px: 4,
                py: 1.7,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { backgroundColor: accent },
              }}
            >
              {t("cta.button")}
            </Button>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              {[<FacebookRoundedIcon />, <LinkedInIcon />, <YouTubeIcon />].map(
                (ic, idx) => (
                  <IconButton
                    key={idx}
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.06)",
                      "&:hover": {
                        background: rgba(accent, 0.2),
                        borderColor: rgba(accent, 0.5),
                      },
                    }}
                  >
                    {ic}
                  </IconButton>
                )
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            gap: { xs: 6, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <Box sx={{ maxWidth: 360, textAlign: isRTL ? "right" : "left" }}>
            <Typography
              sx={{
                color: "white",
                fontWeight: 950,
                fontSize: 28,
                mb: 2,
              }}
            >
              {t("brand.name")}
            </Typography>

            <Typography
              sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}
            >
              {t("brand.desc")}
            </Typography>
          </Box>

          {/* Columns */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flex: 1,
              gap: { xs: 4, sm: 8 },
              justifyContent: "space-between",
            }}
          >
            {cols.map((c) => (
              <Box key={c.titleKey} sx={{ minWidth: 150 }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2.5,
                  }}
                >
                  {t(`cols.${c.titleKey}.title`)}
                </Typography>

                <Stack spacing={1.5}>
                  {c.links.map((l) => (
                    <Link
                      key={l.key}
                      href="#"
                      underline="none"
                      sx={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.9rem",
                        "&:hover": { color: accent },
                      }}
                    >
                      {t(`cols.${c.titleKey}.links.${l.key}`, {
                        defaultValue: l.label,
                      })}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}
          >
            {t("bottom.copyright", {
              year: new Date().getFullYear(),
            })}
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {["privacy", "cookies", "accessibility", "disclaimer"].map((k) => (
              <Link
                key={k}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.85rem",
                  "&:hover": { color: "white" },
                }}
              >
                {t(`bottom.links.${k}`)}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
