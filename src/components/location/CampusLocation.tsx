import { Box, Container, Typography, Button, Stack, useTheme, alpha } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import DirectionsRoundedIcon from "@mui/icons-material/DirectionsRounded";



// Location coordinates for accurate navigation
const CAMPUS_LATITUDE = 30.043272;
const CAMPUS_LONGITUDE = 31.700177;
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=30.043272,31.700177"


// Mapbox configuration
// TODO: Replace with your own Mapbox token in production
const MAPBOX_TOKEN = "pk.eyJ1IjoibGlvb21yIiwiYSI6ImNta3Q2ZDhjMTFnbzkzaXNhc3hvbW9jOXQifQ.wFFL85aJCBGHhynpMql8ng";

export default function CampusLocation() {
    const theme = useTheme();
    const { t } = useTranslation("location");
    const location = useLocation();

    const currentLang = location.pathname.split("/")[1] || "en";
    const isRTL = currentLang === "ar";

    // Handle navigation with device-specific logic
    const handleGetDirections = () => {
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isIOS) {
            // iOS: Use Apple Maps with coordinates for exact location
            window.open(`http://maps.apple.com/?daddr=${CAMPUS_LATITUDE},${CAMPUS_LONGITUDE}`, "_blank");
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
                        sx={{
                            color: "secondary.main",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontSize: 12,
                            mb: 1,
                        }}
                    >
                        {t("eyebrow", "Find Us")}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: 30, md: 46 },
                            fontWeight: 800,
                            color: "text.primary",
                        }}
                    >
                        {t("title", "Campus Location")}
                    </Typography>
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
                                backgroundImage:
                                    `url("https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${CAMPUS_LONGITUDE},${CAMPUS_LATITUDE},14,0/800x600@2x?access_token=${MAPBOX_TOKEN}")`,
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
                                            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
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
                                            "1200 Innovation Parkway,\nEducational District, 75000\nLuxembourg City, Luxembourg"
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
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <PhoneRoundedIcon sx={{ color: "primary.main", fontSize: 24 }} />
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: { xs: 14, md: 15 },
                                        }}
                                    >
                                        {t("phone", "+352 123 456 789")}
                                    </Typography>
                                </Stack>
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
                                        aspectRatio: "1/1",
                                        borderRadius: 1.5,
                                        overflow: "hidden",
                                        border: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
                                        cursor: "pointer",
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuABYRNhT3PWBYscoyYyxpp7z-M6sdKAjlofZcQrQ9PaEKivZgl8B71rIQLHlLzQGyOqyqa6BNZ9eKPFUGualnKyHBn8NxzJ1oQu8m_DbSjZxYO3IHZIDZ2_MO8Z4HGcM7ZM7D9eNIVfBGZkjR4mw_Gh20kWXtODMeI1i6j9KLMQD9TMsZPT4P_TuGLaZaF7pAMj8YgGTAQ-zot3H9vhwUKFabx0ogSLDPjzj9T5kchHjc0HCRJnDqCaj1mvdDaUYpfJd-XJHaHu0TBV"
                                        alt={t("galleryAlt1", "Campus Building")}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease",
                                            "&:hover": {
                                                transform: "scale(1.1)",
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Image 2 with Overlay */}
                                <Box
                                    sx={{
                                        aspectRatio: "1/1",
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
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqu2fecYgjIxrsWz275T8nwFYKiIsAkCTTEk5FxiVQQ1p39IHssaHHMR9MuFKY3r7kDLgTgnMseAxc41JOV-JTY9jlq0HK2856Wk6Owm1AqQXyH-B1KlMOp3eb0BfANZdS1ikQbF2UDqip14p9-ys49ymATHniWZ0iJV5soB0garsVfL7DPLbJiaLac_gQDvY7k09yR99g2AhT3u0iNKHl-mdJcicGyqN9mWGAJjo7hKJlhru_Tymtm5U_NLWlEJHO05_sNUa3xc5E"
                                        alt={t("galleryAlt2", "Campus Facilities")}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease",
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
                                    startIcon={<DirectionsRoundedIcon />}
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
