import  { useState } from "react";
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
  
  // State for the "Selection" Dialog (Step 1)
  const [open, setOpen] = useState(false);
  
  // State for the "Program Finder" Quiz Modal (Step 2)
  const [finderOpen, setFinderOpen] = useState(false);

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  // Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Opens the Quiz Modal
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
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      variant="light"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          mt: 4,
          p: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Text Content */}
        <Box sx={{ maxWidth: { md: "60%" } }}>
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
            {t("ctaHeader")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("ctaBody")}
          </Typography>
        </Box>

        {/* Main "Start" Button */}
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
            endIcon={isRTL ? <ArrowBackIcon /> : <ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontFamily: isRTL ? "Cairo" : "inherit",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "50px",
              boxShadow: `0 8px 16px ${theme.palette.primary.light}`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 12px 20px ${theme.palette.primary.light}`,
              },
              transition: "all 0.3s ease",
            }}
          >
             {/* Span to perfect vertical alignment for Arabic */}
            <span style={{ position: "relative", top: isRTL ? "2px" : "0" }}>
              {t("applyBtn")}
            </span>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2 }}>
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
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                      {t("optionLearnTitle")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("optionLearnDesc")}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>

            {/* OPTION 2: Direct Apply (Navigates to Form) */}
            <Card variant="outlined" sx={{ borderColor: theme.palette.divider }}>
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