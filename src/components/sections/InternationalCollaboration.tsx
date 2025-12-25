import { Box, Typography, Stack, Chip, Card, CardContent } from "@mui/material";
import SectionShell from "../layout/SectionShell";

const points = [
  {
    title: "ENSAC",
    desc: "Designing engineers with a strong foundation in science and technology to meet the challenges of the modern world.",
  },
  {
    title: "SAPIENZA",
    desc: "Pioneering research and education in engineering, architecture, and urban planning to shape the future of sustainable development.",
  },
  {
    title: "IHS",
    desc: "Advancing knowledge in urban management and governance through cutting-edge research and innovative educational programs.",
  },
];

export default function InternationalCollaboration() {
  return (
    <SectionShell
      id="collab"
      eyebrow="Collaboration"
      title="International Collaboration"
      subtitle="Global partnerships that enhance research, education, and innovation."
      variant="light"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3.5,
          alignItems: "stretch",
        }}
      >
        {/* Left Side - Info Card */}
        <Box sx={{ flex: { xs: "1 1 auto", md: 5 } }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(44,197,185,0.12) 0%, rgba(11,111,115,0.06) 100%)",
                border: "1px solid rgba(11,111,115,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 24, md: 28 },
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                Built for global impact.
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                Integrating innovative education, applied scientific research,
                and community service to prepare graduates for the local and
                international labor markets.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}
              >
                <Chip
                  label="Exchange"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label="Joint Research"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label="Innovation"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
            </Card>
          </Stack>
        </Box>

        {/* Right Side  */}
        <Box sx={{ flex: { xs: 3, md: 7 } }}>
          <Stack spacing={2.5}>
            {points.map((p) => (
              <Card
                key={p.title}
                sx={{
                  borderRadius: 4,
                  p: 2,
                  background: "rgba(255,255,255,0.60)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: { md: "translateX(8px)", xs: "none" },
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    borderColor: "rgba(11,111,115,0.3)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    "&:last-child": { pb: { xs: 2.5, md: 3 } },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2.5,
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  {/* Gradient Bar */}
                  <Box
                    sx={{
                      width: { xs: "40px", sm: "8px" },
                      height: { xs: "6px", sm: "50px" },
                      borderRadius: 4,
                      background:
                        "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontWeight: 900, fontSize: 19, color: "#1a1a1a" }}
                    >
                      {p.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        mt: 0.5,
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
                      {p.desc}
                    </Typography>
                  </Box>

                  <Chip
                    label="Partner"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: "rgba(11,111,115,0.08)",
                      color: "#0b6f73",
                      border: "none",
                      alignSelf: { xs: "flex-end", sm: "center" },
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </SectionShell>
  );
}
