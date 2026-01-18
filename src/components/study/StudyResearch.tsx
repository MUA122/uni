import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Collapse,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SectionShell from "../layout/SectionShell";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type CardKey = "academics" | "micro" | "unesco";

type DropdownItem = {
  label: string;
  icon?: React.ReactNode;
};

type CardShellProps = {
  cardKey: CardKey;
  icon: React.ReactNode;
  title: string;
  desc: string;
  isRTL: boolean;
  expanded: boolean;
  items: DropdownItem[];
  onToggle: (key: CardKey) => void;
};

function CardShell({
  cardKey,
  icon,
  title,
  desc,
  isRTL,
  expanded,
  items,
  onToggle,
}: CardShellProps) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        flex: "1 1 220px",
        minWidth: { xs: "100%", sm: 240, md: 0 },
        borderRadius: 2.2,
        border: `3px solid ${expanded ? theme.palette.primary.main : " rgba(11,111,115,0.18)"}`,
        background: alpha(theme.palette.background.paper, 0.92),
        boxShadow: expanded
          ? `0 18px 44px ${alpha(theme.palette.primary.main, 0.18)}`
          : `0 14px 36px ${alpha(theme.palette.common.black, 0.08)}`,
        overflow: "hidden",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease",
        "&:hover": {
          borderColor: "#0B6F73",
          background: "rgba(255,255,255,0.82)",
          transform: "translateY(-2px)",
          boxShadow: "0 18px 44px rgba(0,0,0,0.10)",
        },
      }}
    >
      {/* Header */}
      <Box
        role="button"
        tabIndex={0}
        onClick={() => onToggle(cardKey)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle(cardKey);
        }}
        sx={{
          px: { xs: 2, md: 2.25 },
          py: { xs: 1.75, md: 2 },
          cursor: "pointer",
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
                  transition: "transform 180ms ease",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <KeyboardArrowDownRoundedIcon />
              </Box>
            </Stack>

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
          </Box>
        </Stack>
      </Box>

      {/* Dropdown inside card */}
      <Collapse in={expanded} timeout={260} unmountOnExit>
        <Box
          sx={{
            px: { xs: 2, md: 2.25 },
            pb: 1.5,
            pt: 0.25,
          }}
        >
          <Divider sx={{ mb: 1.2 }} />

          <Stack spacing={0.7}>
            {items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  borderRadius: 2,
                  px: 1.1,
                  py: 0.9,
                  transition: "all 160ms ease",
                  cursor: "pointer",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.08),
                    transform: "translateY(-1px)",
                    borderRadius: 1.5,
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 850,
                      fontSize: 13.5,
                      whiteSpace: "pre-line",
                      pr: 2,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                {isRTL && (
                  <ArrowBackIcon
                    sx={{
                      fontSize: 18,
                      mt: 0.35,
                      color: alpha(theme.palette.text.primary, 0.45),
                    }}
                  />
                )}
                {!isRTL && (
                  <ArrowForwardRoundedIcon
                    sx={{
                      fontSize: 18,
                      mt: 0.35,
                      color: alpha(theme.palette.text.primary, 0.45),
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default function StudyResearchPills() {
  const { t } = useTranslation("study");
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const [expandedKey, setExpandedKey] = React.useState<CardKey | null>(null);

  const handleToggle = React.useCallback((key: CardKey) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  }, []);

  const dropdownData = React.useMemo(() => {
    const data: Record<CardKey, DropdownItem[]> = {
      academics: [
        {
          label: t(
            "studyResearch.dropdown.academics.bachelors",
            "Bachelor's Degrees",
          ),
        },
        {
          label: t(
            "studyResearch.dropdown.academics.masters",
            "Master's Degrees",
          ),
        },
        { label: t("studyResearch.dropdown.academics.phd", "PhD Degrees") },
        {
          label: t("studyResearch.dropdown.academics.online", "Online Degrees"),
        },
      ],
      micro: [
        {
          label: t(
            "studyResearch.dropdown.micro.professional",
            "Professional Certificates",
          ),
        },
        {
          label: t(
            "studyResearch.dropdown.micro.crossAcademy",
            "Cross-Academy Learning",
          ),
        },
      ],
      unesco: [
        {
          label: t(
            "studyResearch.dropdown.unesco.chair1522",
            "Chair UNESCO ID: 1522EG2026\nSustainable Urban Regeneration: Bridging Heritage, Planning, and Digital Innovation",
          ),
        },
      ],
    };

    return data;
  }, [t]);

  return (
    <SectionShell
      id="study-research"
      title={t("studyResearch.title", "Study And Research At IUSAT")}
      subtitle={t(
        "studyResearch.subtitle",
        "Explore key areas of learning, research, and innovation.",
      )}
      variant="light"
    >
      <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.6, md: 2.2 },
            alignItems: "flex-start",
          }}
        >
          <CardShell
            cardKey="academics"
            icon={<SchoolRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.academics.title", "Academics")}
            desc={t(
              "studyResearch.cards.academics.desc",
              "Programs designed for excellence in education and academic research.",
            )}
            isRTL={isRTL}
            expanded={expandedKey === "academics"}
            items={dropdownData.academics}
            onToggle={handleToggle}
          />

          <CardShell
            cardKey="micro"
            icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.micro.title", "Micro-credentials")}
            desc={t(
              "studyResearch.cards.micro.desc",
              "Short, focused learning paths aligned with international standards.",
            )}
            isRTL={isRTL}
            expanded={expandedKey === "micro"}
            items={dropdownData.micro}
            onToggle={handleToggle}
          />

          <CardShell
            cardKey="unesco"
            icon={<AccountBalanceRoundedIcon sx={{ fontSize: 18 }} />}
            title={t("studyResearch.cards.unesco.title", "UNESCO Chairs")}
            desc={t(
              "studyResearch.cards.unesco.desc",
              "Global academic collaboration under UNESCO-supported initiatives.",
            )}
            isRTL={isRTL}
            expanded={expandedKey === "unesco"}
            items={dropdownData.unesco}
            onToggle={handleToggle}
          />

          {/* <CardShell
            cardKey="innovation"
            icon={<LightbulbRoundedIcon sx={{ fontSize: 18 }} />}
            title={t(
              "studyResearch.cards.innovation.title",
              "I-Hub Innovation",
            )}
            desc={t(
              "studyResearch.cards.innovation.desc",
              "An innovation ecosystem supporting startups and applied research.",
            )}
            isRTL={isRTL}
            expanded={expandedKey === "innovation"}
            items={dropdownData.innovation}
            onToggle={handleToggle}
          /> */}
        </Box>
      </Box>
    </SectionShell>
  );
}
