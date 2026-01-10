import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import heroImage from "/imgs/academy-hero.png";

export default function AcademyHeroImage() {
  const { t } = useTranslation("heroAcademy");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  return (
    <Box sx={{ position: "relative", overflow: "hidden", bgcolor: "#000" }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "80vh", md: 750 },
          minHeight: 500,
          overflow: "hidden",
        }}
      >
        {/* Image Background */}
        <Box
          component="img"
          src={heroImage}
          alt="Academy hero"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(3px) brightness(0.7)",
            transform: "scale(1.05)",
            display: "block",
          }}
        />

        {/* Blur overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            zIndex: 1,
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: isRTL
              ? "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)"
              : "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)",
          }}
        />

        <Container
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <Stack
            spacing={3}
            sx={{
              maxWidth: 850,
              textAlign: isRTL ? "right" : "left",
              ml: isRTL ? "auto" : 0,
              mr: isRTL ? 0 : "auto",
              m: 0.2,
            }}
          >
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.85rem",
              }}
            >
              {t("tagline")}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 900,
                fontSize: { xs: 48, md: 84 },
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              {t("title.before")}{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {t("title.brand")}
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: 16, md: 20 },
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              {t("desc")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                pt: 2,
                width: { xs: "100%", sm: "auto" },
                gap: isRTL ? 1 : 0,
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "25px",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(48,80,140,0.35)",
                  "&:hover": { backgroundColor: "#0B1E3A" },
                }}
              >
                {t("cta.primary")}
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "25px",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(2px)",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {t("cta.secondary")}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
