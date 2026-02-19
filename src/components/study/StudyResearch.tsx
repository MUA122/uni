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
  Dialog,
  IconButton,
  Button,
  Chip,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import SectionShell from "../layout/SectionShell";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type CardKey = "academics" | "micro" | "unesco";

type DropdownItem = {
  label: string;
  popupKey?: string;
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
  onItemClick: (cardKey: CardKey, popupKey?: string) => void;
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
  onItemClick,
}: CardShellProps) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        flex: "1 1 220px",
        minWidth: { xs: "100%", sm: 240, md: 0 },
        borderRadius: 1.5,
        border: `3px solid ${
          expanded
            ? theme.palette.primary.main
            : alpha(theme.palette.primary.main, 0.18)
        }`,
        background: alpha(theme.palette.background.paper, 0.92),
        boxShadow: expanded
          ? `0 18px 44px ${alpha(theme.palette.primary.main, 0.18)}`
          : `0 14px 36px ${alpha(theme.palette.common.black, 0.08)}`,
        overflow: "hidden",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          background: alpha(theme.palette.background.paper, 0.98),
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
                role="button"
                tabIndex={0}
                onClick={() => onItemClick(cardKey, item.popupKey)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onItemClick(cardKey, item.popupKey);
                }}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  borderRadius: 1,
                  px: 1.1,
                  py: 0.9,
                  transition: "all 160ms ease",
                  cursor: "pointer",
                  outline: "none",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.08),
                    transform: "translateY(-1px)",
                    borderRadius: 1.5,
                  },
                  "&:focus-visible": {
                    boxShadow: `0 0 0 4px ${alpha(
                      theme.palette.primary.main,
                      0.18,
                    )}`,
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
                      color: alpha(theme.palette.text.primary, 0.9),
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>

                {isRTL ? (
                  <ArrowBackIcon
                    sx={{
                      fontSize: 18,
                      mt: 0.35,
                      color: alpha(theme.palette.primary.main, 0.55),
                    }}
                  />
                ) : (
                  <ArrowForwardRoundedIcon
                    sx={{
                      fontSize: 18,
                      mt: 0.35,
                      color: alpha(theme.palette.primary.main, 0.55),
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

export default function StudyResearch() {
  const theme = useTheme();
  const { t } = useTranslation("study");
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const [expandedKey, setExpandedKey] = React.useState<CardKey | null>(null);

  const [popup, setPopup] = React.useState<{
    open: boolean;
    cardKey: CardKey | null;
    popupKey: string | null;
  }>({ open: false, cardKey: null, popupKey: null });

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
          popupKey: "bachelors",
        },
        {
          label: t(
            "studyResearch.dropdown.academics.masters",
            "Master's Degrees",
          ),
          popupKey: "masters",
        },
        {
          label: t("studyResearch.dropdown.academics.phd", "PhD Degrees"),
          popupKey: "phd",
        },
        {
          label: t("studyResearch.dropdown.academics.online", "Online Degrees"),
          popupKey: "online",
        },
      ],
      micro: [
        {
          label: t(
            "studyResearch.dropdown.micro.professional",
            "Professional Certificates",
          ),
          popupKey: "professional",
        },
        {
          label: t(
            "studyResearch.dropdown.micro.crossAcademy",
            "Cross-Academy Learning",
          ),
          popupKey: "crossAcademy",
        },
      ],
      unesco: [
        {
          label: t(
            "studyResearch.dropdown.unesco.chair1522",
            "Chair UNESCO ID: 1522EG2026\nSustainable Urban Regeneration: Bridging Heritage, Planning, and Digital Innovation",
          ),
          // UNESCO stays as-is (no popup)
        },
      ],
    };

    return data;
  }, [t]);

  const openPopup = React.useCallback((cardKey: CardKey, popupKey?: string) => {
    if (cardKey === "unesco" || !popupKey) return;
    setPopup({ open: true, cardKey, popupKey });
  }, []);

  const closePopup = React.useCallback(() => {
    setPopup({ open: false, cardKey: null, popupKey: null });
  }, []);

  const popupTitlePath =
    popup.cardKey && popup.popupKey
      ? `studyResearch.popups.${popup.cardKey}.${popup.popupKey}.title`
      : "";

  const popupTaglinePath =
    popup.cardKey && popup.popupKey
      ? `studyResearch.popups.${popup.cardKey}.${popup.popupKey}.tagline`
      : "";

  const popupBodyPath =
    popup.cardKey && popup.popupKey
      ? `studyResearch.popups.${popup.cardKey}.${popup.popupKey}.body`
      : "";

  const popupClosingPath =
    popup.cardKey && popup.popupKey
      ? `studyResearch.popups.${popup.cardKey}.${popup.popupKey}.closing`
      : "";

  const popupBulletsPath =
    popup.cardKey && popup.popupKey
      ? `studyResearch.popups.${popup.cardKey}.${popup.popupKey}.bullets`
      : "";

  const bullets = React.useMemo(() => {
    if (!popupBulletsPath) return [];
    const out = t(popupBulletsPath, { returnObjects: true }) as unknown;
    return Array.isArray(out) ? (out as string[]) : [];
  }, [popupBulletsPath, t]);

  // icon chosen by section
  const popupIcon =
    popup.cardKey === "academics" ? (
      <SchoolRoundedIcon sx={{ fontSize: 18 }} />
    ) : (
      <WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />
    );

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
            onItemClick={openPopup}
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
            onItemClick={openPopup}
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
            onItemClick={openPopup}
          />
        </Box>

        {/* Dialog centered */}
        <Dialog
          open={popup.open}
          onClose={closePopup}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              width: "min(520px, calc(100vw - 32px))",
              borderRadius: 1.5,
              overflow: "hidden",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
              boxShadow: `0 26px 70px ${alpha(theme.palette.common.black, 0.22)}`,
              background: `linear-gradient(180deg,
                ${alpha(theme.palette.background.paper, 0.98)} 0%,
                ${alpha(theme.palette.background.paper, 0.92)} 100%)`,
              display: "flex",
              flexDirection: "column",
              maxHeight: "min(86vh, 720px)",
            },
          }}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: alpha(theme.palette.common.black, 0.62),
                backdropFilter: "blur(12px)",
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              columnGap: 1.25,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                color: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
              }}
            >
              {popupIcon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 950,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: 14.75, md: 16 },
                  lineHeight: 1.2,
                  color: theme.palette.text.primary,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {popupTitlePath ? t(popupTitlePath) : ""}
              </Typography>

              <Chip
                size="small"
                label={popupTaglinePath ? t(popupTaglinePath) : ""}
                sx={{
                  mt: 0.55,
                  height: 22,
                  fontWeight: 850,
                  fontSize: 11,
                  borderRadius: 999,
                  color: alpha(theme.palette.primary.main, 0.9),
                  background: alpha(theme.palette.primary.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                  maxWidth: { xs: 260, sm: 360 },
                  "& .MuiChip-label": {
                    px: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </Box>

            <IconButton
              onClick={closePopup}
              sx={{
                width: 38,
                height: 38,
                borderRadius: 999,
                justifySelf: "end",
                color: alpha(theme.palette.text.primary, 0.72),
                background: alpha(theme.palette.common.black, 0.04),
                border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
                "&:hover": {
                  background: alpha(theme.palette.common.black, 0.07),
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              px: 2,
              py: 2,
              flex: 1,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 13.25, md: 13.75 },
                lineHeight: 1.8,
                color: alpha(theme.palette.text.primary, 0.82),
                whiteSpace: "pre-line",
              }}
            >
              {popupBodyPath ? t(popupBodyPath) : ""}
            </Typography>

            {bullets.length > 0 && (
              <Box
                sx={{
                  mt: 1.5,
                  p: { xs: 1.1, md: 1.35 },
                  borderRadius: 1.5,
                  background: alpha(theme.palette.primary.main, 0.06),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                }}
              >
                <List
                  disablePadding
                  sx={{
                    m: 0,
                    direction: isRTL ? "rtl" : "ltr",
                    "& .MuiListItem-root": {
                      py: 0.45,
                      px: 0,
                      alignItems: "flex-start",
                    },
                    "& .MuiListItemIcon-root": {
                      minWidth: 18,
                      mt: "6px",
                      ...(isRTL ? { mr: 0, ml: 1 } : { ml: 0, mr: 1 }),
                    },
                  }}
                >
                  {bullets.map((b, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: alpha(theme.palette.primary.main, 0.75),
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={b}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: { xs: 13.05, md: 13.4 },
                            lineHeight: 1.65,
                            color: alpha(theme.palette.text.primary, 0.88),
                            fontWeight: 750,
                            m: 0,
                          },
                        }}
                        sx={{ m: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            <Typography
              sx={{
                mt: 1.6,
                fontSize: { xs: 13.25, md: 13.75 },
                lineHeight: 1.75,
                color: alpha(theme.palette.text.primary, 0.82),
                whiteSpace: "pre-line",
                fontWeight: 750,
              }}
            >
              {popupClosingPath ? t(popupClosingPath) : ""}
            </Typography>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              px: 2,
              pt: 1.25,
              pb: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
            }}
          >
            <Stack spacing={1.1}>
              <Button
                fullWidth
                disabled
                variant="contained"
                sx={{
                  borderRadius: 2,
                  py: 1.15,
                  fontWeight: 900,
                  textTransform: "none",
                  letterSpacing: "-0.01em",
                  background: alpha(theme.palette.common.black, 0.12),
                  color: alpha(theme.palette.text.primary, 0.5),
                  boxShadow: "none",
                }}
              >
                {t(
                  "studyResearch.cta.applicationsOpeningSoon",
                  "Applications Opening Soon",
                )}
              </Button>

              <Button
                fullWidth
                onClick={closePopup}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  py: 1.15,
                  fontWeight: 900,
                  textTransform: "none",
                  borderColor: alpha(theme.palette.primary.main, 0.22),
                  color: alpha(theme.palette.text.primary, 0.86),
                  "&:hover": {
                    borderColor: alpha(theme.palette.primary.main, 0.35),
                    background: alpha(theme.palette.primary.main, 0.06),
                  },
                }}
              >
                {t("studyResearch.close", "Close")}
              </Button>
            </Stack>
          </Box>
        </Dialog>
      </Box>
    </SectionShell>
  );
}
