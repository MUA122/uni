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

const cols = [
  { title: "Visit", links: ["IUSAT Map", "IUSAT shop", "Contact IUSAT"] },
  {
    title: "Students",
    links: ["Accommodation", "Current Students", "Moodle", "Students Union"],
  },
  {
    title: "Staff",
    links: [
      "Inside IUSAT",
      "Staff Intranet",
      "Work at IUSAT",
      "Human Resources",
    ],
  },
];

export default function FooterModern() {
  return (
    <Box sx={{ position: "relative", mt: 10, overflow: "hidden" }}>
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
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 8,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1, p: 2.5 }}>
            <Typography
              sx={{
                color: "rgba(44,197,185,1)",
                fontWeight: 800,
                letterSpacing: "0.2em",
                fontSize: 12,
                mb: 1.5,
              }}
            >
              IUSAT COMMUNITY
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
              Be part of a modern <br /> academic community.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                mt: 2,
                lineHeight: 1.8,
                maxWidth: 500,
              }}
            >
              Programs, events, collaborations—everything in one place with a
              premium experience.
            </Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: "auto" },
              alignItems: { md: "flex-end" },
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                px: 4,
                py: 1.8,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1rem",
                width: { xs: "100%", md: "fit-content" },
              }}
            >
              Explore Programs
            </Button>

            <Stack direction="row" spacing={1.5}>
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
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            gap: { xs: 6, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Brand Info */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "0 1 350px" } }}>
            <Typography
              sx={{
                color: "white",
                fontWeight: 950,
                fontSize: 28,
                letterSpacing: "-0.04em",
                mb: 2,
              }}
            >
              IUSAT
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
              }}
            >
              The International University of Sciences, Arts & Technology is
              dedicated to fostering innovation and global leadership.
            </Typography>
          </Box>

          {/* Dynamic Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" },
              flexWrap: "wrap",
              flex: 1,
              gap: { xs: 4, sm: 8, md: 2 },
              justifyContent: "space-between",
            }}
          >
            {cols.map((c) => (
              <Box
                key={c.title}
                sx={{ minWidth: { xs: "140px", md: "160px" } }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2.5,
                    fontSize: "0.95rem",
                  }}
                >
                  {c.title}
                </Typography>
                <Stack spacing={1.5}>
                  {c.links.map((l) => (
                    <Link
                      key={l}
                      href="#"
                      underline="none"
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.9rem",
                        transition: "0.2s",
                        "&:hover": { color: "rgba(44,197,185,1)", pl: 0.5 },
                      }}
                    >
                      {l}
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
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            gap: 3,
          }}
        >
          <Typography
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}
          >
            © {new Date().getFullYear()} IUSAT. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            sx={{ flexWrap: "wrap", rowGap: 1 }}
          >
            {["Privacy", "Cookies", "Accessibility", "Disclaimer"].map((x) => (
              <Link
                key={x}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.85rem",
                  "&:hover": { color: "white" },
                }}
              >
                {x}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
