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
                borderRadius: 2.5,
                p: { xs: 3, md: 4 },
                height: "100%",
                background: "rgba(255, 255, 255, 0.6)",
                border: "4px solid #0B6F73",
                color: "#1d1d1f",
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
            {points.map((p, index) => (
              <Card
                key={p.title}
                sx={{
                  borderRadius: 2,
                  p: 2,
                  background: "rgba(255, 255, 255, 0.72)",
                  border: "3px solid #0B6F73",
                  transition:
                    "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
                  "&:hover": {
                    borderColor: "rgba(11,111,115,0.18)",
                    background: "rgba(255,255,255,0.82)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
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
                  {/* Number Badge */}
                  <Box
                    sx={{
                      minWidth: 44,
                      height: 44,
                      borderRadius: "50%",
                      bgcolor: "#0B6F73",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 8px 18px rgba(11,111,115,0.25)",
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* Gradient Bar */}
                  <Box
                    sx={{
                      width: { xs: "40px", sm: "8px" },
                      height: { xs: "6px", sm: "50px" },
                      borderRadius: 4,
                      background:
                        "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                      flexShrink: 0,
                      alignSelf: { xs: "center", sm: "auto" },
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
