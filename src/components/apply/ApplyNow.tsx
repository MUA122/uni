import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  Stack,
  IconButton,
  Card,
  CardActionArea,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BoltIcon from "@mui/icons-material/Bolt";
import SectionShell from "../layout/SectionShell";
import ProgramFinderModal from "./ProgramFinderModal";

export default function ApplyNow() {
  const { t } = useTranslation("apply");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLearnClick = () => {
    setOpen(false);
    setFinderOpen(true);
  };

  const handleDirectClick = () => {
    setOpen(false);
    navigate(`/${currentLang}/application-form`);
  };

  return (
    <SectionShell
      id="apply-now"
      title={t("title")}
      subtitle={t("subtitle")}
      variant="light"
    >
      {/* Banner Card  */}
      <Box
        sx={{
          mt: 4,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { xs: 280, md: 220 },
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: "background.paper",
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            flex: 1.1,
            bgcolor: "#0B6A6E",
            color: "white",
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.05,
            }}
          >
            {t("ctaHeader")}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              opacity: 0.9,
              maxWidth: 420,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            {t("ctaBody")}
          </Typography>
        </Box>

        {/* RIGHT SIDE (Image + Apply Button on Image) */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            minHeight: { xs: 220, md: "auto" },
          }}
        >
          <Box
            component="img"
            alt="Apply Now"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          <Button
            variant="contained"
            onClick={handleOpen}
            endIcon={isRTL ? <ArrowBackIcon /> : <ArrowForwardIcon />}
            sx={{
              position: "absolute",
              right: 20,
              bottom: 20,
              px: 3,
              py: 1.1,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#18B394",
              "&:hover": { bgcolor: "#149B81" },
              boxShadow: "0px 10px 18px rgba(0,0,0,0.15)",
            }}
          >
            {t("applyBtn")}
          </Button>
        </Box>
      </Box>

      {/* --- 1. SELECTION DIALOG (Pop-up) --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, p: 1 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t("dialogTitle")}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* OPTION 1: Learn & Apply (Opens Quiz Modal) */}
            <Card
              variant="outlined"
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                position: "relative",
                overflow: "visible",
              }}
            >
              <Chip
                label={t("recommendedBadge")}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: -12,
                  right: isRTL ? "auto" : 16,
                  left: isRTL ? 16 : "auto",
                  fontWeight: "bold",
                }}
              />
              <CardActionArea onClick={handleLearnClick} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    <AutoStoriesIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {t("optionLearnTitle")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("optionLearnDesc")}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
            <Card
              variant="outlined"
              sx={{ borderColor: theme.palette.divider }}
            >
              <CardActionArea onClick={handleDirectClick} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "50%",
                      bgcolor: "action.hover",
                      color: "text.primary",
                      display: "flex",
                    }}
                  >
                    <BoltIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t("optionDirectTitle")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("optionDirectDesc")}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* --- 2. PROGRAM FINDER MODAL (The Quiz) --- */}
      <ProgramFinderModal
        open={finderOpen}
        onClose={() => setFinderOpen(false)}
      />
    </SectionShell>
  );
}
