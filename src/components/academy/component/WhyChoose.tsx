import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Imag1 from "/imgs/stu.jpg";
import Imag2 from "/imgs/stud.jpg";

const BRAND_BLUE = "#30508C";
const BRAND_MINT = "#B0FDEB";

export default function WhyChooseIAAU() {
  const { t } = useTranslation("whyChooseIAAU");
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const cards = [
    {
      badge: t("cards.0.badge"),
      title: t("cards.0.title"),
      desc: t("cards.0.desc"),
      image: Imag1,
    },
    {
      badge: t("cards.1.badge"),
      title: t("cards.1.title"),
      desc: t("cards.1.desc"),
      image: Imag2,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          "linear-gradient(180deg, rgba(176,253,235,0.25) 0%, rgba(48,80,140,0.06) 55%, transparent 100%)",
      }}
    >
      <Container>
        <Stack
          spacing={1.5}
          sx={{
            mb: { xs: 4, md: 6 },
            maxWidth: 900,
            textAlign: isRTL ? "right" : "left",
            ml: isRTL ? "auto" : 0,
            mr: isRTL ? 0 : "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: 28, sm: 34, md: 44 },
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: BRAND_BLUE,
            }}
          >
            {t("title.before")}{" "}
            <Box component="span" sx={{ color: BRAND_BLUE }}>
              {t("title.brand")}
            </Box>
            {t("title.after")}
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              color: "rgba(11,18,32,0.75)",
              fontSize: { xs: 14.5, md: 16.5 },
              lineHeight: 1.75,
            }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={3}
          alignItems="stretch"
          sx={{
            ...(isRTL
              ? { flexDirection: { xs: "column", md: "row-reverse" } }
              : {}),
          }}
        >
          {cards.map((item, idx) => (
            <Card
              key={idx}
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(48,80,140,0.12)",
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 20px 60px rgba(11,18,32,0.08)",
                transition: "all 250ms ease",
                "&:hover": {
                  transform: { md: "translateY(-6px)" },
                  boxShadow: "0 30px 80px rgba(11,18,32,0.12)",
                },
              }}
            >
              {/* Image */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    height: { xs: 200, md: 260 },
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                  }}
                />

                <Chip
                  label={item.badge}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: isRTL ? "auto" : 16,
                    right: isRTL ? 16 : "auto",
                    bgcolor: "rgba(176,253,235,0.95)",
                    color: BRAND_BLUE,
                    fontWeight: 800,
                    border: "1px solid rgba(48,80,140,0.18)",
                  }}
                />

                <Box
                  sx={{
                    height: 6,
                    background: isRTL
                      ? `linear-gradient(270deg, ${BRAND_BLUE}, ${BRAND_MINT})`
                      : `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_MINT})`,
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent
                sx={{
                  p: { xs: 2.25, md: 3 },
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 17, md: 22 },
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(11,18,32,0.72)",
                    lineHeight: 1.75,
                    mb: 2,
                  }}
                >
                  {item.desc}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent={isRTL ? "flex-end" : "flex-start"}
                >
                  <Button
                    variant="text"
                    endIcon={
                      isRTL ? (
                        <ArrowBackRoundedIcon />
                      ) : (
                        <ArrowForwardRoundedIcon />
                      )
                    }
                    sx={{
                      px: 0,
                      fontWeight: 800,
                      color: BRAND_BLUE,
                      textTransform: "none",
                    }}
                  >
                    {t("learnMore")}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
