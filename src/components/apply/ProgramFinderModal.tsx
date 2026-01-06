import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  LinearProgress,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface ProgramFinderModalProps {
  open: boolean;
  onClose: () => void;
}

type Question = {
  id: number;
  key: string;
  options: { key: string; value: string }[];
};

export default function ProgramFinderModal({
  open,
  onClose,
}: ProgramFinderModalProps) {
  const { t } = useTranslation("finder");
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      key: "q1",
      options: [
        { key: "q1_opt1", value: "engineering" },
        { key: "q1_opt2", value: "cs" },
        { key: "q1_opt3", value: "business" },
        { key: "q1_opt4", value: "art" },
      ],
    },
    {
      id: 2,
      key: "q2",
      options: [
        { key: "q2_opt1", value: "engineering" },
        { key: "q2_opt2", value: "cs" },
        { key: "q2_opt3", value: "business" },
        { key: "q2_opt4", value: "art" },
      ],
    },
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  };

  const getRecommendation = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
    return Object.keys(counts).reduce(
      (a, b) => (counts[a] > counts[b] ? a : b),
      Object.keys(counts)[0]
    );
  };

  const recommendedKey = finished ? getRecommendation() : "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          p: isMobile ? 0 : 1,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 2,
          pb: isMobile ? 1 : 0,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {t("modalTitle")}
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          minHeight: isMobile ? "auto" : 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: isMobile ? 2 : 3,
        }}
      >
        {/* Progress Bar */}
        {!finished && (
          <Box sx={{ mb: 4, width: "100%", mt: isMobile ? 2 : 0 }}>
            <LinearProgress
              variant="determinate"
              value={((step + 1) / questions.length) * 100}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              }}
            />
            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block", textAlign: "right" }}
            >
              {t("stepCount", { current: step + 1, total: questions.length })}
            </Typography>
          </Box>
        )}

        {/* --- QUIZ CONTENT --- */}
        {!finished ? (
          <Fade in={true} key={step}>
            <Box>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
              >
                {t(questions[step].key)}
              </Typography>

              <Stack spacing={2} sx={{ maxWidth: 600, mx: "auto" }}>
                {questions[step].options.map((opt) => (
                  <Card
                    key={opt.key}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: theme.palette.divider,
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleAnswer(opt.value)}
                      sx={{ p: 2.5 }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        align="center"
                      >
                        {t(opt.key)}
                      </Typography>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Fade>
        ) : (
          /* --- RESULT CONTENT --- */
          <Fade in={true}>
            <Box sx={{ textAlign: "center", py: isMobile ? 2 : 0 }}>
              <CheckCircleIcon
                sx={{ fontSize: isMobile ? 50 : 60, color: "green", mb: 2 }}
              />

              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                fontWeight="bold"
              >
                {t("resultTitle")}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {t("resultBody")}
              </Typography>

              <Card
                variant="outlined"
                sx={{
                  p: isMobile ? 3 : 4,
                  mb: 4,
                  mx: "auto",
                  maxWidth: 500,
                  bgcolor: "primary.light",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  {t("bestMatch")}
                </Typography>

                {/* Responsive Typography for the Major Name */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobile ? "1.75rem" : "3rem",
                    lineHeight: 1.2,
                  }}
                >
                  {t(`major_${recommendedKey}`)}
                </Typography>

                <Typography variant="body1">
                  {t(`desc_${recommendedKey}`)}
                </Typography>
              </Card>

              {/* Stack buttons vertically on mobile */}
              <Stack
                direction={isMobile ? "column-reverse" : "row"}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ gap: 1 }}
              >
                <Button
                  startIcon={<RestartAltIcon />}
                  onClick={handleRestart}
                  color="inherit"
                  sx={{
                    borderRadius: 5,
                    px: 4,
                    textTransform: "none",
                    width: isMobile ? "100%" : "auto",
                    py: isMobile ? 1.5 : 1,
                    fontWeight: "bold",
                    variant: "outlined",
                    border: `1px solid ${theme.palette.error.main}`,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                      color: "white",

                      variant: "contained",
                    },
                  }}
                >
                  {t("retakeBtn")}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    onClose();
                    navigate(`/${currentLang}/application-form`);
                  }}
                  sx={{
                    borderRadius: 5,
                    px: 4,
                    textTransform: "none",
                    width: isMobile ? "100%" : "auto",
                    py: isMobile ? 1.5 : 1,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      variant: "contained",
                    },
                  }}
                >
                  {t("applyToThisBtn")}
                </Button>
              </Stack>
            </Box>
          </Fade>
        )}
      </DialogContent>
    </Dialog>
  );
}
