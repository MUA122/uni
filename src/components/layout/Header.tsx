import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import iusatLogo from "/imgs/iusat.png";

const navItems = [
  { label: "Study", href: "#study" },
  { label: "Research", href: "#research" },
  { label: "Engage", href: "#engage" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: { xs: 10, md: 20 },
        left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "95%", md: "90%" },
        maxWidth: "1400px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
        color: "#1d1d1f",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            height: { xs: 60, md: 74 },
            px: 2,
            justifyContent: "space-between",
          }}
        >
          {/* Logo & Brand Section */}
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={iusatLogo}
              alt="IUSAT Logo"
              sx={{
                height: { xs: 50, md: 80 },
                width: "auto",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "#000",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              IUSAT
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "rgba(0,0,0,0.7)",
                  px: 2,
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Side Tools */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "50px",
                px: { xs: 1, md: 2 },
                py: 0.6,
                width: { xs: 40, sm: 180, md: 220 },
                transition: "width 0.3s ease",
                "&:focus-within": { width: { xs: 120, sm: 240 } },
              }}
            >
              <SearchIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.4)" }} />
              <InputBase
                placeholder="Explore..."
                sx={{
                  fontSize: "0.85rem",
                  ml: 1,
                  width: "100%",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
