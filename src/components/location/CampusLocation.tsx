import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import campusimg1 from "/imgs/campus1.png";
import campusimg2 from "/imgs/campus2.png";
import campusiusat from "/imgs/campusiusat.png";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DirectionsRoundedIcon from "@mui/icons-material/DirectionsRounded";

// Location coordinates for accurate navigation
const CAMPUS_LATITUDE = 30.043272;
const CAMPUS_LONGITUDE = 31.700177;
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=30.043272,31.700177";

// Mapbox configuration
// TODO: Replace with your own Mapbox token in production

export default function CampusLocation() {
  const theme = useTheme();
  const { t } = useTranslation("location");

  // Handle navigation with device-specific logic
  const handleGetDirections = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS) {
      // iOS: Use Apple Maps with coordinates for exact location
      window.open(
        `http://maps.apple.com/?daddr=${CAMPUS_LATITUDE},${CAMPUS_LONGITUDE}`,
        "_blank",
      );
    } else {
      // Android/Web: Use Google Maps short link
      window.open(GOOGLE_MAPS_LINK, "_blank");
    }
  };

  return (
    <Box
      id="campus-location"
      sx={{
        py: { xs: 7, md: 11 },
        bgcolor: "background.default",
      }}
    >
      <Container>
        {/* Section Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 30, md: 46 },
              fontWeight: 800,
              color: "primary.main",
            }}
          >
            {t("title", "Campus Location")}
          </Typography>
          {/* <Typography
            sx={{
              color: "rgba(65, 65, 65, 0.26)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: 12,
              mb: 1,
            }}
          >
            {t("eyebrow", "Find Us")}
          </Typography> */}
        </Box>

        {/* Map Container */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            height: { xs: 500, md: 600 },
            boxShadow: theme.shadows[20],
            border: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
          }}
        >
          {/* Map Background */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "#e5e7eb",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${campusiusat})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7,
              }}
            >
              {/* Pulsing Pin */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {/* Ping Animation */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette.primary.main, 0.4),
                      transform: "scale(1.5)",
                      animation:
                        "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                      "@keyframes ping": {
                        "75%, 100%": {
                          transform: "scale(2)",
                          opacity: 0,
                        },
                      },
                    }}
                  />
                  {/* Pin Icon */}
                  <Box
                    sx={{
                      position: "relative",
                      width: 48,
                      height: 48,
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      border: `4px solid ${theme.palette.common.white}`,
                      boxShadow: theme.shadows[10],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <SchoolRoundedIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Info Card with Glassmorphism */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 16, md: 32 },
              left: { xs: 16, md: 32 },
              right: { xs: 16, md: "auto" },
              width: { xs: "auto", md: 450 },
              maxWidth: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: "blur(12px)",
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                boxShadow: theme.shadows[20],
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: 20, md: 24 },
                }}
              >
                {t("cardTitle", "Main Global Campus")}
              </Typography>

              {/* Address & Phone */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                {/* Address */}
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <LocationOnRoundedIcon
                    sx={{ color: "primary.main", mt: 0.5, fontSize: 24 }}
                  />
                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      fontSize: { xs: 14, md: 15 },
                    }}
                  >
                    {t(
                      "address",
                      "1200 Innovation Parkway,\nEducational District, 75000\nLuxembourg City, Luxembourg",
                    )
                      .split("\n")
                      .map((line, i) => (
                        <Box component="span" key={i} sx={{ display: "block" }}>
                          {line}
                        </Box>
                      ))}
                  </Typography>
                </Stack>

                {/* Phone */}
              </Stack>

              {/* Gallery */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 4,
                }}
              >
                {/* Image 1 */}
                <Box
                  sx={{
                    borderRadius: 1.5,
                    overflow: "hidden",
                    border: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={campusimg1}
                    alt={t("galleryAlt1", "Campus Building")}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>

                {/* Image 2 with Overlay */}
                <Box
                  sx={{
                    borderRadius: 1.5,
                    overflow: "hidden",
                    border: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
                    cursor: "pointer",
                    position: "relative",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={campusimg2}
                    alt={t("galleryAlt2", "Campus Facilities")}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: alpha(theme.palette.common.black, 0.4),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 11,
                        textTransform: "uppercase",
                        textAlign: "center",
                        px: 2,
                      }}
                    >
                      {t("viewGallery", "View Gallery")}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Stack spacing={1.5}>
                {/* Get Directions Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleGetDirections}
                  startIcon={
                    <DirectionsRoundedIcon
                      sx={{ fontSize: { xs: 20, md: 22 }, ml: 0.5 }}
                    />
                  }
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: 14, md: 15 },
                    boxShadow: `0 10px 18px ${alpha(theme.palette.primary.main, 0.2)}`,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.9),
                    },
                  }}
                >
                  {t("getDirections", "Get Directions")}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
