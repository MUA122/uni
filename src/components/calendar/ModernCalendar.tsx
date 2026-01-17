import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// Types
export type CalendarImageItem = {
  src: string;
  alt?: string;
};

export type CalendarDayData = {
  date: string;
  category?: "event" | "important";
  descriptionKey?: string;
  description?: string;
  images?: CalendarImageItem[];
};

type ModernCalendarProps = {
  data?: CalendarDayData[];
};

const PRIMARY = "#006E71";
const ACCENT = "#26B99B";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function getMonthName(date: Date, locale: string) {
  return date.toLocaleString(locale, { month: "long" }).toUpperCase();
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function startDayIndex(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1).getDay();
}

function getPrevMonthDays(year: number, monthIndex: number) {
  const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
  const prevYear = monthIndex === 0 ? year - 1 : year;
  return daysInMonth(prevYear, prevMonth);
}

export default function ModernCalendar({ data }: ModernCalendarProps) {
  const theme = useTheme();
  const { t } = useTranslation("calendar");

  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const today = React.useMemo(() => new Date(), []);
  const todayISO = React.useMemo(() => toISODate(today), [today]);

  const [year, setYear] = React.useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = React.useState(today.getMonth());

  const [category, setCategory] = React.useState<string>("all");
  const weekDaysShort = [
    t("weekDays.sun", "SUN"),
    t("weekDays.mon", "MON"),
    t("weekDays.tue", "TUE"),
    t("weekDays.wed", "WED"),
    t("weekDays.thu", "THU"),
    t("weekDays.fri", "FRI"),
    t("weekDays.sat", "SAT"),
  ];

  const yearOptions = React.useMemo(() => {
    const base = today.getFullYear();
    return Array.from({ length: 7 }, (_, i) => base - 3 + i);
  }, [today]);

  const monthOptions = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(2025, i, 1).toLocaleString(currentLang, { month: "long" })
      ),
    [currentLang]
  );

  const demoData: CalendarDayData[] = [
    {
      date: `${year}-${pad2(monthIndex + 1)}-20`,
      category: "event",
      description: "Open Day at IAAU academy - Join us for full details.",
      images: [{ src: "/imgs/iaau.png", alt: "IAAU" }],
    },
    {
      date: `${year}-${pad2(monthIndex + 1)}-30`,
      category: "event",
      description: "IUSAT special activity day.",
      images: [{ src: "/imgs/iaau.png", alt: "IUSAT" }],
    },
    {
      date: `${year}-${pad2(monthIndex + 1)}-12`,
      category: "important",
      description: "Admissions are now open, apply now!",
      images: [{ src: "/imgs/iaau.png", alt: "Admissions" }],
    },
  ];

  const allData = data ?? demoData;

  const filteredData = React.useMemo(() => {
    if (category === "all") return allData;
    return allData.filter((x) => x.category === category);
  }, [allData, category]);

  const dayMap = React.useMemo(() => {
    const map = new Map<string, CalendarDayData>();
    filteredData.forEach((d) => map.set(d.date, d));
    return map;
  }, [filteredData]);

  //  Grid (42 cells)
  const totalDays = daysInMonth(year, monthIndex);
  const startIndex = startDayIndex(year, monthIndex);
  const prevMonthTotal = getPrevMonthDays(year, monthIndex);

  const cells = React.useMemo(() => {
    const arr: {
      date: string;
      dayNumber: number;
      isCurrentMonth: boolean;
    }[] = [];

    for (let i = 0; i < 42; i++) {
      const dayOffset = i - startIndex + 1;

      if (dayOffset <= 0) {
        const dayNum = prevMonthTotal + dayOffset;
        const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
        const prevYear = monthIndex === 0 ? year - 1 : year;

        arr.push({
          date: `${prevYear}-${pad2(prevMonth + 1)}-${pad2(dayNum)}`,
          dayNumber: dayNum,
          isCurrentMonth: false,
        });
      } else if (dayOffset > totalDays) {
        const dayNum = dayOffset - totalDays;
        const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
        const nextYear = monthIndex === 11 ? year + 1 : year;

        arr.push({
          date: `${nextYear}-${pad2(nextMonth + 1)}-${pad2(dayNum)}`,
          dayNumber: dayNum,
          isCurrentMonth: false,
        });
      } else {
        arr.push({
          date: `${year}-${pad2(monthIndex + 1)}-${pad2(dayOffset)}`,
          dayNumber: dayOffset,
          isCurrentMonth: true,
        });
      }
    }

    return arr;
  }, [startIndex, prevMonthTotal, totalDays, year, monthIndex]);

  const [open, setOpen] = React.useState(false);
  const [activeDate, setActiveDate] = React.useState<string | null>(null);

  const activeData = activeDate ? dayMap.get(activeDate) : undefined;
  const activeImages = activeData?.images ?? [];

  const onPrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((p) => p - 1);
    } else {
      setMonthIndex((p) => p - 1);
    }
  };

  const onNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((p) => p + 1);
    } else {
      setMonthIndex((p) => p + 1);
    }
  };

  return (
    <Box sx={{ direction: isRTL ? "rtl" : "ltr" }}>
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 950,
          fontSize: { xs: 32, md: 44 },
          letterSpacing: "-0.03em",
          color: PRIMARY,
          m: 5,
          pl: 10,
        }}
      >
        {t("title", "Calendar")}
      </Typography>

      {/*  Filters */}
      <Paper
        sx={{
          borderRadius: { xs: 0, md: 3 },
          p: { xs: 1.5, md: 2 },
          mb: 2.2,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          background: {
            md: alpha(theme.palette.background.paper, 0.9),
          },
          boxShadow: `0 18px 70px ${alpha(theme.palette.common.black, 0.06)}`,
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center" gap={2}>
            <IconButton
              onClick={isRTL ? onNextMonth : onPrevMonth}
              sx={{
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
              }}
            >
              {isRTL ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
            </IconButton>

            <Box sx={{ minWidth: 220 }}>
              <Typography
                sx={{
                  fontWeight: 1000,
                  fontSize: { xs: 18, md: 20 },
                  color: PRIMARY,
                  letterSpacing: "-0.02em",
                }}
              >
                {getMonthName(new Date(year, monthIndex, 1), currentLang)}{" "}
                {year}{" "}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: alpha(theme.palette.text.primary, 0.6),
                }}
              >
                {t("subtitle", "Choose month / year & filter events")}
              </Typography>
            </Box>

            <IconButton
              onClick={isRTL ? onPrevMonth : onNextMonth}
              sx={{
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
              }}
            >
              {isRTL ? <ChevronLeftRoundedIcon /> : <ChevronRightRoundedIcon />}
            </IconButton>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <FormControl size="small">
              <Select
                value={monthIndex}
                onChange={(e) => setMonthIndex(Number(e.target.value))}
                sx={{ borderRadius: 2.2, minWidth: { xs: "100%", sm: 160 } }}
              >
                {monthOptions.map((m, idx) => (
                  <MenuItem key={m} value={idx}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                sx={{ borderRadius: 2.2, minWidth: { xs: "100%", sm: 120 } }}
              >
                {yearOptions.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select
                value={category}
                onChange={(e) => setCategory(String(e.target.value))}
                sx={{ borderRadius: 2.2, minWidth: { xs: "100%", sm: 160 } }}
              >
                <MenuItem value="all">{t("filters.all", "All")}</MenuItem>
                <MenuItem value="event">
                  {t("filters.events", "Events")}
                </MenuItem>
                <MenuItem value="important">
                  {t("filters.important", "Important")}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>

      {/* Calendar */}
      <Paper
        sx={{
          borderRadius: { xs: 0, md: 1.5 },
          overflow: "hidden",
          border: `2px solid ${alpha(theme.palette.text.primary, 0.18)}`,
          boxShadow: `0 30px 110px ${alpha(theme.palette.common.black, 0.08)}`,
          maxWidth: 900,
          overflowY: "auto",
          mx: "auto",
          mb: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowX: { xs: "auto", md: "hidden" },
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Box sx={{ minWidth: { xs: 720, md: "100%" } }}>
            {/* Month Header */}
            <Box
              sx={{
                background: alpha(theme.palette.text.primary, 0.03),
                p: { xs: 1.4, md: 3 },
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 1000,
                  fontSize: { xs: 28, md: 64 },
                  letterSpacing: "-0.03em",
                  color: PRIMARY,
                }}
              >
                {getMonthName(new Date(year, monthIndex, 1), currentLang)}{" "}
                {year}{" "}
              </Typography>
            </Box>

            {/* Week header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                borderTop: `1px solid ${alpha(
                  theme.palette.text.primary,
                  0.18
                )}`,
                borderBottom: `1px solid ${alpha(
                  theme.palette.text.primary,
                  0.18
                )}`,
                background: alpha(theme.palette.text.primary, 0.02),
              }}
            >
              {weekDaysShort.map((d) => (
                <Box
                  key={d}
                  sx={{
                    p: { xs: 0.9, md: 1.2 },
                    textAlign: "center",
                    fontWeight: 900,
                    fontSize: { xs: 11, md: 13 },
                    color: alpha(theme.palette.text.primary, 0.55),
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderRight: `1px solid ${alpha(
                      theme.palette.text.primary,
                      0.1
                    )}`,
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  {d}
                </Box>
              ))}
            </Box>

            {/* Days */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
            >
              {cells.map((cell, idx) => {
                const isToday = cell.date === todayISO;
                const dayData = dayMap.get(cell.date);

                const dayImages = dayData?.images ?? [];
                const firstImage = dayImages[0];

                return (
                  <Box
                    key={`${cell.date}-${idx}`}
                    onClick={() => {
                      setActiveDate(cell.date);
                      setOpen(true);
                    }}
                    sx={{
                      height: { xs: 78, md: 120 },
                      borderRight: `1px solid ${alpha(
                        theme.palette.text.primary,
                        0.14
                      )}`,
                      borderBottom: `1px solid ${alpha(
                        theme.palette.text.primary,
                        0.14
                      )}`,
                      p: { xs: 0.8, md: 1.2 },
                      cursor: "pointer",
                      position: "relative",
                      background: cell.isCurrentMonth
                        ? "#fff"
                        : alpha(theme.palette.text.primary, 0.03),
                      transition: "all 160ms ease",
                      "&:hover": { background: alpha(ACCENT, 0.08) },
                      ...(dayData ? { background: alpha(ACCENT, 0.06) } : {}),
                    }}
                  >
                    {/* Day number + Today */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: { xs: 0.4, md: 0.8 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 950,
                          color: cell.isCurrentMonth
                            ? theme.palette.text.primary
                            : alpha(theme.palette.text.primary, 0.35),
                          fontSize: { xs: 12.5, md: 14 },
                        }}
                      >
                        {cell.dayNumber}
                      </Typography>

                      {isToday && (
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.35,
                            px: { xs: 0.5, md: 0.8 },
                            py: { xs: 0.1, md: 0.3 },
                            borderRadius: 999,
                            background: alpha(ACCENT, 0.18),
                            border: `1px solid ${alpha(ACCENT, 0.35)}`,
                          }}
                        >
                          <StarRoundedIcon
                            sx={{
                              fontSize: { xs: 14, md: 16 },
                              color: PRIMARY,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: { xs: 10, md: 11.5 },
                              fontWeight: 900,
                              color: PRIMARY,
                            }}
                          >
                            {t("today", "Today")}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* IMAGE */}
                    {firstImage && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <Box
                          component="img"
                          src={firstImage.src}
                          alt={firstImage.alt ?? "event"}
                          sx={{
                            width: { xs: "70%", md: "78%" },
                            height: { xs: "70%", md: "78%" },
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    )}

                    {/*  Dot if more than 1 image */}
                    {dayImages.length > 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 12,
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: ACCENT,
                          boxShadow: `0 0 0 4px ${alpha(ACCENT, 0.15)}`,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 1,
            minWidth: { xs: "92vw", sm: 560 },
            background: alpha(theme.palette.background.paper, 0.98),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 950,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {activeDate ?? t("dayDetails", "Day Details")}
          <IconButton onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <Divider sx={{ my: 1.5 }} />

          {/*  No events */}
          {!activeData || activeImages.length === 0 ? (
            <Typography
              sx={{
                fontWeight: 850,
                color: alpha(theme.palette.text.primary, 0.65),
              }}
            >
              {t("noEvents", "No events in this day !")}
            </Typography>
          ) : (
            <Box>
              {/*  Description only in dialog */}
              {!!activeData.descriptionKey && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: alpha(theme.palette.text.primary, 0.75),
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  {t(activeData.descriptionKey)}
                </Typography>
              )}

              {/*  Images list */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                {activeImages.map((img, i) => (
                  <Box
                    key={`img-${i}`}
                    sx={{
                      width: 74,
                      height: 74,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      border: `1px solid ${alpha(
                        theme.palette.text.primary,
                        0.14
                      )}`,
                      background: alpha(theme.palette.text.primary, 0.03),
                    }}
                  >
                    <Box
                      component="img"
                      src={img.src}
                      alt={img.alt ?? "event"}
                      sx={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
