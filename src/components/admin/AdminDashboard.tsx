import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {

  Box,

  Button,

  Card,

  Chip,

  Grid,

  IconButton,

  Stack,

  Typography,

  Avatar,

  Paper,

  Menu,

  MenuItem,

} from "@mui/material";

import {

  ArrowDropDown,

  ArrowDropUp,

  AssessmentRounded,

  BarChartRounded,

  CalendarTodayRounded,

  DownloadRounded,

  SettingsRounded,

  ArrowForwardRounded,

} from "@mui/icons-material";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";



import TopPagesTable from "./TopPagesTable";

import TrafficChart from "./TrafficChart";

import PerformanceTable from "./PerformanceTable";



const palette = {

  bg: "#F2F4F7",

  card: "#FFFFFF",

  teal: "#0F7D84",

  tealSoft: "#E3F2F2",

  blue: "#2F6FED",

  orange: "#F2994A",

  green: "#16A34A",

  red: "#E76F51",

  textMain: "#17212C",

  textMuted: "#5C6B7A",

  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",

};



type OverviewTotals = {
  sessions: number;
  unique_visitors: number;
  pageviews: number;
  avg_time_sec: number;
  bounce_rate: number;
  conversions: number;
};

type OverviewResponse = {
  totals: OverviewTotals;
  change_vs_prev: { sessions: number; pageviews: number };
  range: string;
};

type TimeseriesResponse = {
  metric: "sessions" | "pageviews";
  points: { date: string; value: number }[];
};

type TopPageRow = {
  path: string;
  pageviews: number;
  unique_visitors: number;
  avg_time_sec: number;
  exit_rate: number;
};

type ReferrerItem = { source: string; count: number };

type DevicesResponse = {
  devices: { type: string; count: number }[];
  browsers: { name: string; count: number }[];
  os: { name: string; count: number }[];
};

type GeoItem = { country: string; city: string; count: number };

type ConversionItem = { name: string; count: number; rate: number };

type PerformanceItem = {
  path: string;
  ttfb_p75_ms: number;
  fcp_p75_ms: number;
  lcp_p75_ms: number;
  cls_p75: number;
};

type TrafficItem = { name: string; value: number; color: string };

const numberFormatter = new Intl.NumberFormat("en-US");

const rangeOptions = [
  { key: "today", label: "Today" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
  { key: "1y", label: "Last 1 year" },
];

function formatDuration(seconds: number) {
  if (!seconds || seconds <= 0) {
    return "0s";
  }
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  if (minutes > 0) {
    return `${minutes}m ${remaining}s`;
  }
  return `${remaining}s`;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}



function Sparkline({ points, stroke }: { points: string; stroke: string }) {

  return (

    <svg width="92" height="20" viewBox="0 0 92 20">

      <polyline

        fill="none"

        stroke={stroke}

        strokeWidth="2"

        points={points}

        strokeLinecap="round"

        strokeLinejoin="round"

      />

    </svg>

  );

}



export default function AdminDashboard() {

  const analyticsBase = (import.meta.env.VITE_ANALYTICS_API_BASE || "http://127.0.0.1:8000").replace(/\/$/, "");
  const token = localStorage.getItem("analyticsAdminToken") || import.meta.env.VITE_ANALYTICS_JWT || "";
  const refreshToken = localStorage.getItem("analyticsAdminRefreshToken") || "";

  const [rangeKey, setRangeKey] = useState("30d");
  const [rangeAnchor, setRangeAnchor] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [sessionsSeries, setSessionsSeries] = useState<TimeseriesResponse | null>(null);
  const [pageviewsSeries, setPageviewsSeries] = useState<TimeseriesResponse | null>(null);
  const [topPages, setTopPages] = useState<TopPageRow[]>([]);
  const [referrers, setReferrers] = useState<ReferrerItem[]>([]);
  const [geoItems, setGeoItems] = useState<GeoItem[]>([]);
  const [devices, setDevices] = useState<DevicesResponse | null>(null);
  const [conversions, setConversions] = useState<ConversionItem[]>([]);
  const [performance, setPerformance] = useState<PerformanceItem[]>([]);

  const selectedRangeLabel =
    rangeOptions.find((option) => option.key === rangeKey)?.label || "Last 30 days";

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Missing admin token. Redirecting to login.");
      navigate("/admin/login");
      return;
    }

    const refreshAccessToken = async () => {
      if (!refreshToken) {
        throw new Error("Missing refresh token.");
      }
      const response = await fetch(`${analyticsBase}/api/auth/token/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Token refresh failed.");
      }
      const data = (await response.json()) as { access: string };
      localStorage.setItem("analyticsAdminToken", data.access);
      return data.access;
    };

    const fetchJson = async <T,>(path: string): Promise<T> => {
      const response = await fetch(`${analyticsBase}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        const newAccess = await refreshAccessToken();
        const retry = await fetch(`${analyticsBase}${path}`, {
          headers: { Authorization: `Bearer ${newAccess}` },
        });
        if (!retry.ok) {
          const message = await retry.text();
          throw new Error(message || `Request failed (${retry.status})`);
        }
        return retry.json() as Promise<T>;
      }
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed (${response.status})`);
      }
      return response.json() as Promise<T>;
    };

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          overviewRes,
          sessionsRes,
          pageviewsRes,
          topPagesRes,
          referrersRes,
          geoRes,
          devicesRes,
          conversionsRes,
          perfRes,
        ] = await Promise.all([
          fetchJson<OverviewResponse>(`/api/analytics/admin/overview?range=${rangeKey}`),
          fetchJson<TimeseriesResponse>(`/api/analytics/admin/timeseries?metric=sessions&range=${rangeKey}`),
          fetchJson<TimeseriesResponse>(`/api/analytics/admin/timeseries?metric=pageviews&range=${rangeKey}`),
          fetchJson<{ items: TopPageRow[] }>(`/api/analytics/admin/top-pages?range=${rangeKey}`),
          fetchJson<{ items: ReferrerItem[] }>(`/api/analytics/admin/referrers?range=${rangeKey}`),
          fetchJson<{ items: GeoItem[] }>(`/api/analytics/admin/geo?range=${rangeKey}`),
          fetchJson<DevicesResponse>(`/api/analytics/admin/devices?range=${rangeKey}`),
          fetchJson<{ items: ConversionItem[] }>(`/api/analytics/admin/conversions?range=${rangeKey}`),
          fetchJson<{ items: PerformanceItem[] }>(`/api/analytics/admin/performance?range=${rangeKey}`),
        ]);

        setOverview(overviewRes);
        setSessionsSeries(sessionsRes);
        setPageviewsSeries(pageviewsRes);
        setTopPages(topPagesRes.items || []);
        setReferrers(referrersRes.items || []);
        setGeoItems(geoRes.items || []);
        setDevices(devicesRes);
        setConversions(conversionsRes.items || []);
        setPerformance(perfRes.items || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load analytics.";
        setError(message);
        if (message.toLowerCase().includes("refresh")) {
          navigate("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [analyticsBase, rangeKey, token, refreshToken, navigate]);

  const kpis = useMemo(() => {
    const totals = overview?.totals;
    const change = overview?.change_vs_prev;
    return [
      {
        label: "Sessions",
        value: totals ? numberFormatter.format(totals.sessions) : "-",
        trend: change && change.sessions >= 0 ? "up" : "down",
      },
      {
        label: "Unique Visitors",
        value: totals ? numberFormatter.format(totals.unique_visitors) : "-",
        trend: "up",
      },
      {
        label: "Pageviews",
        value: totals ? numberFormatter.format(totals.pageviews) : "-",
        trend: change && change.pageviews >= 0 ? "up" : "down",
      },
      {
        label: "Avg Time on Page",
        value: totals ? formatDuration(totals.avg_time_sec) : "-",
        trend: "down",
      },
      {
        label: "Bounce Rate",
        value: totals ? formatPercent(totals.bounce_rate) : "-",
        trend: "down",
      },
      {
        label: "Conversions",
        value: totals ? numberFormatter.format(totals.conversions) : "-",
        trend: "up",
      },
    ];
  }, [overview]);

  const timeSeries = useMemo(() => {
    const points = new Map<string, { date: string; sessions: number; pageviews: number }>();

    sessionsSeries?.points.forEach((point) => {
      points.set(point.date, { date: point.date, sessions: point.value, pageviews: 0 });
    });
    pageviewsSeries?.points.forEach((point) => {
      const existing = points.get(point.date);
      if (existing) {
        existing.pageviews = point.value;
      } else {
        points.set(point.date, { date: point.date, sessions: 0, pageviews: point.value });
      }
    });

    return Array.from(points.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((point) => ({
        date: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sessions: point.sessions,
        pageviews: point.pageviews,
      }));
  }, [sessionsSeries, pageviewsSeries]);

  const topPagesSummary = useMemo(() => {
    const colors = [palette.blue, palette.teal, palette.orange, "#9AA5B1"];
    return topPages.slice(0, 4).map((page, index) => ({
      name: page.path,
      value: numberFormatter.format(page.pageviews),
      color: colors[index % colors.length],
    }));
  }, [topPages]);

  const trafficItems = useMemo<TrafficItem[]>(() => {
    const colorMap: Record<string, string> = {
      direct: palette.teal,
      search: palette.blue,
      referral: "#A0AEC0",
      social: "#94A3B8",
    };
    return referrers.map((item) => ({
      name: item.source.charAt(0).toUpperCase() + item.source.slice(1),
      value: item.count,
      color: colorMap[item.source] || "#CBD5E1",
    }));
  }, [referrers]);

  const deviceBrowser = useMemo(() => {
    const patterns = [
      "0,12 12,10 24,14 36,8 48,10 60,6 72,10 84,8",
      "0,10 12,14 24,12 36,8 48,10 60,12 72,6 84,10",
      "0,14 12,10 24,12 36,10 48,14 60,10 72,12 84,9",
      "0,12 12,12 24,8 36,10 48,12 60,9 72,12 84,10",
    ];
    const items: { label: string; value: string; stroke: string; points: string }[] = [];
    if (devices) {
      const topDevice = devices.devices[0];
      const topBrowser = devices.browsers[0];
      const topOs = devices.os[0];
      if (topDevice) {
        items.push({
          label: topDevice.type || "Unknown",
          value: numberFormatter.format(topDevice.count),
          stroke: palette.teal,
          points: patterns[0],
        });
      }
      if (topBrowser) {
        items.push({
          label: topBrowser.name || "Unknown",
          value: numberFormatter.format(topBrowser.count),
          stroke: palette.blue,
          points: patterns[1],
        });
      }
      if (topOs) {
        items.push({
          label: topOs.name || "Unknown",
          value: numberFormatter.format(topOs.count),
          stroke: palette.orange,
          points: patterns[2],
        });
      }
      const secondDevice = devices.devices[1];
      if (secondDevice) {
        items.push({
          label: secondDevice.type || "Other",
          value: numberFormatter.format(secondDevice.count),
          stroke: "#64748B",
          points: patterns[3],
        });
      }
    }
    return items;
  }, [devices]);

  const conversionRows = useMemo(() => {
    return conversions.map((item) => ({
      name: item.name,
      count: item.count,
      rate: formatPercent(item.rate),
    }));
  }, [conversions]);

  const topCountries = useMemo(() => {
    const counts = new Map<string, number>();
    geoItems.forEach((item) => {
      const key = item.country || "Unknown";
      counts.set(key, (counts.get(key) || 0) + item.count);
    });
    return Array.from(counts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [geoItems]);

  return (

    <Box sx={{ minHeight: "100vh", backgroundColor: palette.bg, display: "flex" }}>

      <Box

        sx={{

          width: 240,

          backgroundColor: "#ECEFF3",

          px: 2.5,

          py: 3,

          position: "fixed",

          top: 0,

          bottom: 0,

          left: 0,

          display: { xs: "none", md: "flex" },

          flexDirection: "column",

          gap: 3,

          borderRight: "1px solid #E1E6ED",

        }}

      >

        <Stack direction="row" spacing={1.5} alignItems="center">

          <Box

            sx={{

              width: 36,

              height: 36,

              borderRadius: "12px",

              background: "linear-gradient(135deg, #0F7D84 0%, #2F6FED 100%)",

              display: "grid",

              placeItems: "center",

              color: "#fff",

              fontWeight: 700,

            }}

          >

            AA

          </Box>

          <Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>

              Admin Analytics

            </Typography>

            <Typography variant="caption" sx={{ color: palette.textMuted }}>

              Dashboard

            </Typography>

          </Box>

        </Stack>

        {(loading || error) && (
          <Box sx={{ mt: 2 }}>
            {loading && (
              <Typography variant="body2" sx={{ color: palette.textMuted }}>
                Loading analytics...
              </Typography>
            )}
            {error && (
              <Typography variant="body2" sx={{ color: palette.red }}>
                {error}
              </Typography>
            )}
          </Box>
        )}



        <Stack spacing={1}>

          <Box

            sx={{

              backgroundColor: "#CFE7E8",

              color: palette.teal,

              borderRadius: 2,

              px: 1.5,

              py: 1.2,

              display: "flex",

              alignItems: "center",

              gap: 1,

              fontWeight: 600,

              position: "relative",

              pl: 2.2,

              "&::before": {

                content: '""',

                position: "absolute",

                left: 0,

                top: 8,

                bottom: 8,

                width: 4,

                borderRadius: 6,

                backgroundColor: palette.teal,

              },

            }}

          >

            <AssessmentRounded fontSize="small" />

            Dashboard

          </Box>

          <Box

            sx={{

              color: palette.textMuted,

              px: 1.5,

              py: 1.2,

              display: "flex",

              alignItems: "center",

              gap: 1,

              borderRadius: 2,

            }}

          >

            <BarChartRounded fontSize="small" />

            Reports

          </Box>

        </Stack>



        <Box sx={{ mt: "auto" }}>

          <Button

            startIcon={<SettingsRounded />}

            sx={{

              color: palette.textMuted,

              textTransform: "none",

              fontWeight: 600,

              justifyContent: "flex-start",

              px: 1,

            }}

          >

            Settings

          </Button>

        </Box>

      </Box>



      <Box

        sx={{

          flex: 1,

          ml: { xs: 0, md: "240px" },

          px: { xs: 2, md: 4 },

          py: 3,

        }}

      >

        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between" spacing={2}>

          <Typography variant="h5" sx={{ fontWeight: 700, color: palette.textMain }}>

            Admin Analytics Dashboard

          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">

            <Button

              variant="outlined"

              endIcon={<ArrowDropDown />}

              startIcon={<CalendarTodayRounded sx={{ fontSize: 18 }} />}

              onClick={(event) => setRangeAnchor(event.currentTarget)}

              sx={{

                borderColor: "#D6DEE7",

                color: palette.textMain,

                backgroundColor: "#fff",

                textTransform: "none",

                fontWeight: 600,

                px: 1.6,

              }}

            >

              {selectedRangeLabel}

            </Button>

            <Menu
              anchorEl={rangeAnchor}
              open={Boolean(rangeAnchor)}
              onClose={() => setRangeAnchor(null)}
            >
              {rangeOptions.map((option) => (
                <MenuItem
                  key={option.key}
                  selected={option.key === rangeKey}
                  onClick={() => {
                    setRangeKey(option.key);
                    setRangeAnchor(null);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            <IconButton sx={{ border: "1px solid #D6DEE7", backgroundColor: "#fff" }}>

              <SettingsRounded sx={{ fontSize: 20, color: palette.textMuted }} />

            </IconButton>

            <Button

              variant="contained"

              startIcon={<DownloadRounded />}

              sx={{

                backgroundColor: palette.teal,

                textTransform: "none",

                fontWeight: 600,

                px: 2.2,

                boxShadow: "none",

                "&:hover": { backgroundColor: "#0C6C72" },

              }}

            >

              Export CSV

            </Button>

          </Stack>

        </Stack>



        <Grid container spacing={2} sx={{ mt: 1 }}>

          {kpis.map((kpi) => {

            const isUp = kpi.trend === "up";

            return (

              <Grid size={{ xs: 12, sm: 6, lg: 2 }} key={kpi.label}>

                <Card

                  sx={{

                    p: 2,

                    borderRadius: 2,

                    boxShadow: palette.shadow,

                    backgroundColor: palette.card,

                    height: "100%",

                  }}

                >

                  <Stack spacing={1.5} height="100%">

                    <Stack direction="row" alignItems="center" justifyContent="space-between">

                      <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textMain }}>

                        {kpi.value}

                      </Typography>

                      {isUp ? (

                        <ArrowDropUp sx={{ color: palette.green }} />

                      ) : (

                        <ArrowDropDown sx={{ color: palette.red }} />

                      )}

                    </Stack>

                    <Typography variant="body2" sx={{ color: palette.textMuted }}>

                      {kpi.label}

                    </Typography>

                    <Box sx={{ mt: "auto" }}>

                      <Button

                        variant="contained"

                        size="small"

                        endIcon={<ArrowForwardRounded sx={{ fontSize: 16 }} />}

                        aria-label={`View ${kpi.label} report`}

                        sx={{

                          backgroundColor: palette.teal,

                          textTransform: "none",

                          fontWeight: 600,

                          boxShadow: "none",

                          "&:hover": { backgroundColor: "#0C6C72" },

                        }}

                      >

                        View Report

                      </Button>

                    </Box>

                  </Stack>

                </Card>

              </Grid>

            );

          })}

        </Grid>



        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, lg: 8 }}>

            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>

                <Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>

                    Sessions &amp; Pageviews

                  </Typography>

                  <Typography variant="caption" sx={{ color: palette.textMuted }}>

                    {selectedRangeLabel}

                  </Typography>

                </Box>

                <Stack direction="row" spacing={2} alignItems="center">

                  <Stack direction="row" spacing={0.8} alignItems="center">

                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.blue }} />

                    <Typography variant="caption" sx={{ color: palette.textMuted }}>

                      Sessions

                    </Typography>

                  </Stack>

                  <Stack direction="row" spacing={0.8} alignItems="center">

                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.orange }} />

                    <Typography variant="caption" sx={{ color: palette.textMuted }}>

                      Pageviews

                    </Typography>

                  </Stack>

                </Stack>

              </Stack>

              <Box sx={{ height: 260, mt: 2 }}>

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={timeSeries}>

                    <CartesianGrid strokeDasharray="4 4" stroke="#D5DDE6" strokeOpacity={0.8} />

                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: palette.textMuted, fontSize: 12 }} />

                    <YAxis tickLine={false} axisLine={false} tick={{ fill: palette.textMuted, fontSize: 12 }} />

                    <Tooltip

                      contentStyle={{

                        borderRadius: 12,

                        border: "1px solid #E2E8F0",

                        boxShadow: palette.shadow,

                        fontSize: 12,

                      }}

                    />

                    <Line

                      type="monotone"

                      dataKey="sessions"

                      stroke={palette.blue}

                      strokeWidth={2.5}

                      dot={{ r: 3 }}

                    />

                    <Line

                      type="monotone"

                      dataKey="pageviews"

                      stroke={palette.orange}

                      strokeWidth={2.5}

                      dot={{ r: 3 }}

                    />

                  </LineChart>

                </ResponsiveContainer>

              </Box>

            </Paper>

          </Grid>



          <Grid size={{ xs: 12, lg: 4 }}>

            <Stack spacing={2}>

              <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

                <Stack direction="row" spacing={2} alignItems="center">

                  <Avatar

                    src="https://i.pravatar.cc/100?img=12"

                    alt="Profile"

                    sx={{ width: 54, height: 54 }}

                  />

                  <Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>

                      Jimmy Sullivan

                    </Typography>

                    <Typography variant="body2" sx={{ color: palette.textMuted }}>

                      @jsullivans

                    </Typography>

                  </Box>

                </Stack>

              </Paper>



              <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.textMain, mb: 1.5 }}>

                  Top Pages

                </Typography>

                <Stack spacing={1.2}>

                  {topPagesSummary.length === 0 ? (
                    <Typography variant="body2" sx={{ color: palette.textMuted }}>
                      No data yet
                    </Typography>
                  ) : (
                    topPagesSummary.map((page) => (

                      <Stack key={page.name} direction="row" justifyContent="space-between" alignItems="center">

                        <Stack direction="row" spacing={1} alignItems="center">

                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: page.color }} />

                          <Typography variant="body2" sx={{ color: palette.textMain }}>

                            {page.name}

                          </Typography>

                        </Stack>

                        <Typography variant="body2" sx={{ fontWeight: 600, color: palette.textMain }}>

                          {page.value}

                        </Typography>

                      </Stack>

                    ))
                  )}

                </Stack>

              </Paper>



              <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.textMain, mb: 1.5 }}>

                  Device &amp; Browser

                </Typography>

                <Stack spacing={1.5}>

                  {deviceBrowser.length === 0 ? (
                    <Typography variant="body2" sx={{ color: palette.textMuted }}>
                      No data yet
                    </Typography>
                  ) : (
                    deviceBrowser.map((item) => (

                      <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">

                        <Stack spacing={0.3}>

                          <Typography variant="body2" sx={{ color: palette.textMain, fontWeight: 600 }}>

                            {item.label}

                          </Typography>

                          <Typography variant="caption" sx={{ color: palette.textMuted }}>

                            {item.value}

                          </Typography>

                        </Stack>

                        <Sparkline points={item.points} stroke={item.stroke} />

                      </Stack>

                    ))
                  )}

                </Stack>

              </Paper>

            </Stack>

          </Grid>

        </Grid>



        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, lg: 8 }}>

            <TopPagesTable rows={topPages} updatedLabel={loading ? "Loading..." : "Updated just now"} />

          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>

            <TrafficChart items={trafficItems} />

          </Grid>

        </Grid>



        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, lg: 4 }}>

            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

              <Stack direction="row" alignItems="center" justifyContent="space-between">

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.textMain }}>

                  Top Countries

                </Typography>

                <Chip label="Sessions" size="small" sx={{ backgroundColor: "#EEF2F6", fontWeight: 600 }} />

              </Stack>

              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {topCountries.length === 0 ? (
                  <Typography variant="body2" sx={{ color: palette.textMuted }}>
                    No geo data yet (consent required).
                  </Typography>
                ) : (
                  topCountries.map((country) => (
                    <Stack key={country.country} direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: palette.textMain }}>
                        {country.country}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.textMain }}>
                        {numberFormatter.format(country.count)}
                      </Typography>
                    </Stack>
                  ))
                )}
              </Stack>

            </Paper>

          </Grid>



          <Grid size={{ xs: 12, lg: 4 }}>

            <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>

              <Stack direction="row" alignItems="center" justifyContent="space-between">

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.textMain }}>

                  Conversions

                </Typography>

                <Chip label={selectedRangeLabel} size="small" sx={{ backgroundColor: "#EEF2F6", fontWeight: 600 }} />

              </Stack>

              <Stack spacing={1.5} sx={{ mt: 2 }}>

                {conversionRows.map((row) => (

                  <Stack key={row.name} direction="row" alignItems="center" justifyContent="space-between">

                    <Box>

                      <Typography variant="body2" sx={{ color: palette.textMain }}>

                        {row.name}

                      </Typography>

                      <Typography variant="caption" sx={{ color: palette.textMuted }}>

                        {numberFormatter.format(row.count)} conversions

                      </Typography>

                    </Box>

                    <Typography variant="body2" sx={{ color: palette.green, fontWeight: 700 }}>

                      {row.rate}

                    </Typography>

                  </Stack>

                ))}

              </Stack>

            </Paper>

          </Grid>



          <Grid size={{ xs: 12, lg: 4 }}>

            <PerformanceTable items={performance} />

          </Grid>

        </Grid>

      </Box>

    </Box>

  );

}
