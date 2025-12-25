import { Box, Container, Typography, Button, Stack } from "@mui/material";
import heroVideoPath from "/vids/iusatvid.mp4";

export default function HeroVideo() {
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
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          src={heroVideoPath}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8)",
          }}
        />

        {/* Gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />

        <Container
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Stack spacing={3} sx={{ maxWidth: 850 }}>
            {/* Tagline */}
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.85rem",
              }}
            >
              Future Starts Here
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
              Welcome to{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                IUSAT
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: 16, md: 20 },
                lineHeight: 1.7,
                maxWidth: 600,
                fontWeight: 400,
              }}
            >
              A leading national institution in the New Administrative Capital,
              dedicated to innovative education, applied research, and global
              competitiveness.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "25",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(44,197,185,0.3)",
                }}
              >
                Explore Programs
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "25",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(4px)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Find Out More
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
