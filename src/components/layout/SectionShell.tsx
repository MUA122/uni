import { Box, Container, Typography } from "@mui/material";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: "light" | "tint" | "dark";
  children: React.ReactNode;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "light",
  children,
}: Props) {
  const bg =
    variant === "dark"
      ? "linear-gradient(180deg, rgba(7,19,22,0.98) 0%, rgba(11,111,115,0.18) 100%)"
      : variant === "tint"
      ? "linear-gradient(180deg, rgba(44,197,185,0.12) 0%, rgba(11,111,115,0.06) 45%, rgba(255,255,255,0) 100%)"
      : "transparent";

  const divider =
    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(11,111,115,0.22) 25%, rgba(44,197,185,0.30) 50%, rgba(11,111,115,0.22) 75%, rgba(0,0,0,0) 100%)";

  return (
    <Box
      id={id}
      sx={{
        position: "relative",
        py: { xs: 7, md: 11 },
        overflow: "hidden",
        background: bg,
      }}
    >
      {/* Top divider */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: "min(1120px, 92vw)",
          height: 1,
          background: divider,
        }}
      />
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(820px 420px at 18% 0%, rgba(44,197,185,0.18) 0%, rgba(44,197,185,0) 60%)," +
            "radial-gradient(900px 520px at 88% 20%, rgba(11,111,115,0.16) 0%, rgba(11,111,115,0) 62%)",
        }}
      />
      <Container sx={{ position: "relative" }}>
        <Box sx={{ mb: 4 }}>
          {eyebrow && (
            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: "0.22em",
                fontSize: 12,
                color: "text.secondary",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 46 } }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                mt: 1.2,
                color: "text.secondary",
                maxWidth: 780,
                lineHeight: 1.85,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Container>
      {/* Bottom divider */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: "min(1120px, 92vw)",
          height: 1,
          background: divider,
        }}
      />
    </Box>
  );
}
