import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SectionShell from "../layout/SectionShell";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type CardKey = "academics" | "micro" | "unesco" | "innovation";

type CardShellProps = {
  cardKey: CardKey;
  icon: React.ReactNode;
  title: string;
  desc: string;
  isRTL: boolean;
  onOpen: (key: CardKey) => void;
};

function CardShell({
  cardKey,
  icon,
  title,
  desc,
  isRTL,
  onOpen,
}: CardShellProps) {
  const theme = useTheme();

  return (
    <Paper
      role="button"
      tabIndex={0}
      onClick={() => onOpen(cardKey)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(cardKey);
      }}
      sx={{
        flex: "1 1 220px",
        minWidth: { xs: "100%", sm: 240, md: 0 },
        borderRadius: 2,
        px: { xs: 2, md: 2.25 },
        py: { xs: 1.75, md: 2 },

        border: "3px solid #0B6F73",
        background: alpha(theme.palette.background.paper, 0.92),
        boxShadow: `0 14px 36px ${alpha(theme.palette.common.black, 0.08)}`,
        cursor: "pointer",

        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease",

        "&:hover": {
          borderColor: "rgba(11,111,115,0.18)",
          background: "rgba(255,255,255,0.82)",
          transform: "translateY(-2px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
        },

        outline: "none",
        "&:focus-visible": {
          boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.18)}`,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1.4}
        alignItems="flex-start"
        sx={{ direction: isRTL ? "rtl" : "ltr" }}
        gap={isRTL ? 1.4 : 0}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
            color: theme.palette.primary.main,
            background: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
            mt: 0.15,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1.5}
          >
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.02em",
                fontSize: { xs: 14.5, md: 15.5 },
                color: theme.palette.text.primary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
                color: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.06),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
              }}
            >
              <KeyboardArrowDownRoundedIcon />
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: { xs: 12.75, md: 13.25 },
              lineHeight: 1.55,
              color: alpha(theme.palette.text.primary, 0.68),
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function StudyResearchPills() {
  const theme = useTheme();

  const { t } = useTranslation("study");
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogMsg, setDialogMsg] = React.useState("");

  const messages = React.useMemo(
    () => [
      t("studyResearch.popup1", "Thanks! More details will be available soon."),
      t("studyResearch.popup2", "This section is under active development."),
      t("studyResearch.popup3", "We’re preparing something great here."),
      t("studyResearch.popup4", "You’ll find updated content very soon."),
      t("studyResearch.popup5", "Explore this area again in the next update."),
    ],
    [t]
  );

  const handleOpen = React.useCallback(
    (key: CardKey) => {
      const titleMap: Record<CardKey, string> = {
        academics: t("studyResearch.cards.academics.title", "Academics"),
        micro: t("studyResearch.cards.micro.title", "Micro-credentials"),
        unesco: t("studyResearch.cards.unesco.title", "UNESCO Chairs"),
        innovation: t(
          "studyResearch.cards.innovation.title",
          "I-Hub Innovation"
        ),
      };

      const idx = Math.floor(Math.random() * messages.length);
      setDialogTitle(titleMap[key]);
      setDialogMsg(messages[idx] ?? messages[0] ?? "");
      setOpen(true);
    },
    [messages, t]
  );

  return (
    <SectionShell
      id="study-research"
      eyebrow={t("studyResearch.eyebrow", "Study")}
      title={t("studyResearch.title", "Study And Research At IUSAT")}
      subtitle={t(
        "studyResearch.subtitle",
        "Explore key areas of learning, research, and innovation."
      )}
      variant="light"
    >
      {/* Cards row: wraps on small screens */}
      <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.6, md: 2.2 },
            alignItems: "stretch",
          }}
        >
          {/* Card 1: Academics */}
          <CardShell
            cardKey="academics"
            icon={<SchoolRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.academics.title", "Academics")}
            desc={t(
              "studyResearch.cards.academics.desc",
              "Programs designed for excellence in education and academic research."
            )}
            isRTL={isRTL}
            onOpen={handleOpen}
          />

          {/* Card 2: Micro-credentials */}
          <CardShell
            cardKey="micro"
            icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.micro.title", "Micro-credentials")}
            desc={t(
              "studyResearch.cards.micro.desc",
              "Short, focused learning paths aligned with international standards."
            )}
            isRTL={isRTL}
            onOpen={handleOpen}
          />

          {/* Card 3: UNESCO Chairs */}
          <CardShell
            cardKey="unesco"
            icon={<AccountBalanceRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.unesco.title", "UNESCO Chairs")}
            desc={t(
              "studyResearch.cards.unesco.desc",
              "Global academic collaboration under UNESCO-supported initiatives."
            )}
            isRTL={isRTL}
            onOpen={handleOpen}
          />

          {/* Card 4: I-Hub Innovation */}
          <CardShell
            cardKey="innovation"
            icon={<LightbulbRoundedIcon sx={{ fontSize: 18 }} />}
            title={t(
              "studyResearch.cards.innovation.title",
              "I-Hub Innovation"
            )}
            desc={t(
              "studyResearch.cards.innovation.desc",
              "An innovation ecosystem supporting startups and applied research."
            )}
            isRTL={isRTL}
            onOpen={handleOpen}
          />
        </Box>
      </Box>

      {/* Popup dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
            boxShadow: `0 28px 80px ${alpha(theme.palette.common.black, 0.22)}`,
            background: alpha(theme.palette.background.paper, 0.96),
            backdropFilter: "blur(12px) saturate(180%)",
            minWidth: { xs: "92vw", sm: 420 },
          },
        }}
      >
        {/* Dialog header */}
        <DialogTitle
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {dialogTitle}
          <IconButton onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        {/* Dialog body */}
        <DialogContent sx={{ pt: 0.5 }}>
          <Typography
            sx={{
              color: alpha(theme.palette.text.primary, 0.72),
              lineHeight: 1.7,
            }}
          >
            {dialogMsg}
          </Typography>
        </DialogContent>

        {/* Dialog footer actions */}
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 800,
              px: 2.2,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            {t("studyResearch.close", "Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </SectionShell>
  );
}
