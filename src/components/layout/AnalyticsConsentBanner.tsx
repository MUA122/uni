import { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { getGeoConsent, setGeoConsent, updateVisitGeoWithConsent } from "../../analytics/analyticsClient";

const palette = {
  textMain: "#17212C",
  textMuted: "#5C6B7A",
  teal: "#0F7D84",
  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",
};

export default function AnalyticsConsentBanner() {
  const [consent, setConsent] = useState(getGeoConsent());

  useEffect(() => {
    setConsent(getGeoConsent());
  }, []);

  if (consent !== "unset") {
    return null;
  }

  const handleAccept = async () => {
    setGeoConsent("granted");
    setConsent("granted");
    await updateVisitGeoWithConsent();
  };

  const handleDecline = () => {
    setGeoConsent("denied");
    setConsent("denied");
  };

  return (
    <Box sx={{ position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 1400 }}>
      <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>
        <Stack spacing={1.5} direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>
              Help improve this site
            </Typography>
            <Typography variant="body2" sx={{ color: palette.textMuted }}>
              Allow anonymous location lookup for insights? We store only country and city.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Button onClick={handleDecline} variant="outlined" sx={{ textTransform: "none" }}>
              No thanks
            </Button>
            <Button
              onClick={handleAccept}
              variant="contained"
              sx={{
                backgroundColor: palette.teal,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#0C6C72" },
              }}
            >
              Allow
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
