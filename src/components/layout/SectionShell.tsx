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
  children,
}: Props) {
  return (
    <Box
      id={id}
      sx={{
        position: "relative",
        py: { xs: 7, md: 11 },
        overflow: "hidden",
        background: "white",
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
          background: "white",
        }}
      />
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "white",
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
    </Box>
  );
}
