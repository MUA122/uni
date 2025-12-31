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

export default function FooterModern() {
  const { t } = useTranslation("footer");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

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
      {/* Background Layer */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1000px 540px at 18% 0%, rgba(44,197,185,0.22) 0%, transparent 60%)," +
            "radial-gradient(1000px 520px at 85% 25%, rgba(11,111,115,0.22) 0%, transparent 60%)," +
            "linear-gradient(180deg, rgba(7,19,22,0.98) 0%, rgba(7,19,22,0.92) 100%)",
        }}
      />

      <Container sx={{ position: "relative", py: { xs: 6, md: 8 } }}>
        {/* CTA Section */}
        <Box
          sx={{
            borderRadius: 2.5,
            p: { xs: 3, md: 5 },
            mb: 8,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1, p: 2.5, textAlign: isRTL ? "right" : "left" }}>
            <Typography
              sx={{
                color: "rgba(44,197,185,1)",
                fontWeight: 800,
                letterSpacing: "0.2em",
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
                letterSpacing: "-0.04em",
                fontSize: { xs: 28, md: 38 },
                lineHeight: 1.1,
              }}
            >
              {t("cta.title.line1")}
              <br />
              {t("cta.title.line2")}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                mt: 2,
                lineHeight: 1.8,
                maxWidth: 500,
              }}
            >
              {t("cta.subtitle")}
            </Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: "auto" },
              alignItems: { md: isRTL ? "flex-start" : "flex-end" },
            }}
          >
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardRoundedIcon
                  sx={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                />
              }
              sx={{
                px: 4,
                py: 1.8,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1rem",
                width: { xs: "100%", md: "fit-content" },
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
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      "&:hover": {
                        background: "rgba(44,197,185,0.2)",
                        borderColor: "rgba(44,197,185,0.5)",
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

        {/* Links Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            flexWrap: "wrap",
            gap: { xs: 6, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Brand Info */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 1 350px" },
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: 950,
                fontSize: 28,
                letterSpacing: "-0.04em",
                mb: 2,
              }}
            >
              {t("brand.name")}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
              }}
            >
              {t("brand.desc")}
            </Typography>
          </Box>

          {/* Dynamic Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              gap: { xs: 4, sm: 8, md: 2 },
              justifyContent: "space-between",
            }}
          >
            {cols.map((c) => (
              <Box
                key={c.titleKey}
                sx={{
                  minWidth: { xs: "140px", md: "160px" },
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2.5,
                    fontSize: "0.95rem",
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
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.9rem",
                        transition: "0.2s",
                        "&:hover": {
                          color: "rgba(44,197,185,1)",
                          pl: isRTL ? 0 : 0.5,
                          pr: isRTL ? 0.5 : 0,
                        },
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

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.06)" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            gap: 3,
          }}
        >
          <Typography
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}
          >
            {t("bottom.copyright", {
              year: new Date().getFullYear(),
            })}
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            sx={{
              flexWrap: "wrap",
              rowGap: 1,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            {[
              { key: "privacy", fallback: "Privacy" },
              { key: "cookies", fallback: "Cookies" },
              { key: "accessibility", fallback: "Accessibility" },
              { key: "disclaimer", fallback: "Disclaimer" },
            ].map((x) => (
              <Link
                key={x.key}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.85rem",
                  "&:hover": { color: "white" },
                }}
              >
                {t(`bottom.links.${x.key}`, { defaultValue: x.fallback })}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
