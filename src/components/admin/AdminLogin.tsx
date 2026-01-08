import { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const palette = {
  bg: "#F2F4F7",
  card: "#FFFFFF",
  teal: "#0F7D84",
  textMain: "#17212C",
  textMuted: "#5C6B7A",
  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",
};

type TokenResponse = {
  access: string;
  refresh: string;
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const analyticsBase = (import.meta.env.VITE_ANALYTICS_API_BASE || "http://127.0.0.1:8000").replace(/\/$/, "");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${analyticsBase}/api/analytics/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed.");
      }
      const data = (await response.json()) as TokenResponse;
      localStorage.setItem("analyticsAdminToken", data.access);
      localStorage.setItem("analyticsAdminRefreshToken", data.refresh);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: palette.bg, display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 3, boxShadow: palette.shadow }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: palette.textMain }}>
              Admin Login
            </Typography>
            <Typography variant="body2" sx={{ color: palette.textMuted }}>
              Sign in to access analytics.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
              />
              {error && (
                <Typography variant="body2" sx={{ color: "#E76F51" }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: palette.teal,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#0C6C72" },
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
