import "antd/dist/reset.css";

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  Space,
  Statistic,
  Switch,
  Typography,
  theme as antdTheme,
} from "antd";
import {
  BarChartOutlined,
  DashboardOutlined,
  DownloadOutlined,
  SettingOutlined,
  CalendarOutlined,
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import TopPagesTable from "./TopPagesTable";
import TrafficChart from "./TrafficChart";
import PerformanceTable from "./PerformanceTable";

const ORANGE = "#F2994A";

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
  change_vs_prev: {
    sessions?: number;
    pageviews?: number;
    unique_visitors?: number;
    conversions?: number;
  };
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

type PerformanceItem = {
  path: string;
  lcp_p75_ms: number;
  fcp_p75_ms: number;
  cls_p75: number;
};

type TrafficItem = { name: string; value: number; color: string };

const numberFormatter = new Intl.NumberFormat("en-US");

const rangeOptions = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
] as const;

function formatDuration(seconds: number) {
  if (!seconds || seconds <= 0) return "0s";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  return minutes > 0 ? `${minutes}m ${remaining}s` : `${remaining}s`;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function toChartPoints(series: TimeseriesResponse | null) {
  if (!series) return [];
  return series.points.map((p) => ({ date: p.date, value: p.value }));
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = antdTheme.useToken();

  // Admin theme tokens (match your teal system)
  const adminTheme = useMemo(
    () => ({
      token: {
        colorPrimary: "#006E71",
        colorInfo: "#00A2CE",
        colorSuccess: "#26B99B",
        borderRadius: 14,
      },
    }),
    []
  );

  const analyticsBase = (import.meta.env.VITE_ANALYTICS_API_BASE || "http://127.0.0.1:8000").replace(
    /\/$/,
    ""
  );
  const getAccessToken = () =>
    localStorage.getItem("analyticsAdminToken") || import.meta.env.VITE_ANALYTICS_JWT || "";
  const getRefreshToken = () => localStorage.getItem("analyticsAdminRefreshToken") || "";

  const [rangeKey, setRangeKey] = useState<(typeof rangeOptions)[number]["key"]>("7d");
  const [comparePrev, setComparePrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [sessionsSeries, setSessionsSeries] = useState<TimeseriesResponse | null>(null);
  const [pageviewsSeries, setPageviewsSeries] = useState<TimeseriesResponse | null>(null);
  const [topPages, setTopPages] = useState<TopPageRow[]>([]);
  const [referrers, setReferrers] = useState<ReferrerItem[]>([]);
  const [geoItems, setGeoItems] = useState<GeoItem[]>([]);
  const [devices, setDevices] = useState<DevicesResponse | null>(null);
  const [performance, setPerformance] = useState<PerformanceItem[]>([]);

  const selectedRangeLabel =
    rangeOptions.find((o) => o.key === rangeKey)?.label || "Last 7 days";

  const handleLogout = () => {
    localStorage.removeItem("analyticsAdminToken");
    localStorage.removeItem("analyticsAdminRefreshToken");
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    navigate(`/admin/login?next=${next}`);
  };

  async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("Session expired.");
    }
    const res = await fetch(`${analyticsBase}/api/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) {
      throw new Error("Session expired.");
    }
    const data = (await res.json()) as { access: string };
    localStorage.setItem("analyticsAdminToken", data.access);
    return data.access;
  }

  async function fetchJson<T>(path: string): Promise<T> {
    const tokenAccess = getAccessToken();
    const res = await fetch(`${analyticsBase}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(tokenAccess ? { Authorization: `Bearer ${tokenAccess}` } : {}),
      },
    });
    if (res.status === 401) {
      const newAccess = await refreshAccessToken();
      const retry = await fetch(`${analyticsBase}${path}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccess}`,
        },
      });
      if (!retry.ok) {
        const msg = await retry.text();
        throw new Error(msg || `Request failed: ${retry.status}`);
      }
      return (await retry.json()) as T;
    }
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Request failed: ${res.status}`);
    }
    return (await res.json()) as T;
  }

  useEffect(() => {
    if (!getAccessToken()) {
      const next = encodeURIComponent(`${location.pathname}${location.search}`);
      navigate(`/admin/login?next=${next}`);
      return;
    }

    const run = async () => {
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
          perfRes,
        ] = await Promise.all([
          fetchJson<OverviewResponse>(
            `/api/analytics/admin/overview?range=${rangeKey}${
              comparePrev ? "&compare=prev" : ""
            }`
          ),
          fetchJson<TimeseriesResponse>(
            `/api/analytics/admin/timeseries?metric=sessions&range=${rangeKey}`
          ),
          fetchJson<TimeseriesResponse>(
            `/api/analytics/admin/timeseries?metric=pageviews&range=${rangeKey}`
          ),
          fetchJson<{ items: TopPageRow[] }>(
            `/api/analytics/admin/top-pages?range=${rangeKey}`
          ),
          fetchJson<{ items: ReferrerItem[] }>(
            `/api/analytics/admin/referrers?range=${rangeKey}`
          ),
          fetchJson<{ items: GeoItem[] }>(`/api/analytics/admin/geo?range=${rangeKey}`),
          fetchJson<DevicesResponse>(`/api/analytics/admin/devices?range=${rangeKey}`),
          fetchJson<{ items: PerformanceItem[] }>(
            `/api/analytics/admin/performance?range=${rangeKey}`
          ),
        ]);

        setOverview(overviewRes);
        setSessionsSeries(sessionsRes);
        setPageviewsSeries(pageviewsRes);
        setTopPages(topPagesRes.items || []);
        setReferrers(referrersRes.items || []);
        setGeoItems(geoRes.items || []);
        setDevices(devicesRes);
        setPerformance(perfRes.items || []);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load analytics";
        setError(message);
        if (message.toLowerCase().includes("expired")) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [rangeKey, comparePrev, navigate, analyticsBase, location.pathname, location.search]);

  const trafficItems: TrafficItem[] = useMemo(() => {
    const palette = ["#006E71", "#00A2CE", ORANGE, "#7C3AED", "#94A3B8"];
    return referrers.map((r, idx) => ({
      name: r.source,
      value: r.count,
      color: palette[idx % palette.length],
    }));
  }, [referrers]);

  const topCountries = useMemo(() => {
    const counts = new Map<string, number>();
    geoItems.forEach((item) => {
      const key = item.country || "Unknown";
      counts.set(key, (counts.get(key) || 0) + item.count);
    });
    return Array.from(counts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [geoItems]);

  const kpi = overview?.totals;
  const chartSessions = toChartPoints(sessionsSeries);
  const chartPageviews = toChartPoints(pageviewsSeries);

  // ✅ AntD v5 Dropdown menu (NO overlay)
  const rangeItems: MenuProps["items"] = rangeOptions.map((opt) => ({
    key: opt.key,
    label: opt.label,
  }));

  const onRangeClick: MenuProps["onClick"] = ({ key }) => {
    setRangeKey(key as (typeof rangeOptions)[number]["key"]);
  };

  const handleExportCsv = async () => {
    try {
      const tokenAccess = getAccessToken();
      if (!tokenAccess) {
        const next = encodeURIComponent(`${location.pathname}${location.search}`);
        navigate(`/admin/login?next=${next}`);
        return;
      }
      const res = await fetch(
        `${analyticsBase}/api/analytics/admin/export.csv?range=${rangeKey}`,
        {
          headers: { Authorization: `Bearer ${tokenAccess}` },
        }
      );
      if (res.status === 401) {
        const newAccess = await refreshAccessToken();
        const retry = await fetch(
          `${analyticsBase}/api/analytics/admin/export.csv?range=${rangeKey}`,
          {
            headers: { Authorization: `Bearer ${newAccess}` },
          }
        );
        if (!retry.ok) {
          throw new Error("Export failed.");
        }
        const blob = await retry.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `analytics-${rangeKey}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        return;
      }
      if (!res.ok) {
        throw new Error("Export failed.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `analytics-${rangeKey}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    }
  };

  return (
    <ConfigProvider theme={adminTheme}>
      <Layout style={{ minHeight: "100vh", background: token.colorFillQuaternary }}>
        <Layout.Sider
          width={240}
          theme="light"
          style={{
            borderRight: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgContainer,
          }}
        >
          <div style={{ padding: 20, display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "linear-gradient(135deg, #006E71 0%, #00A2CE 100%)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
              }}
            >
              AA
            </div>
            <div>
              <Typography.Text strong>Admin Analytics</Typography.Text>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Dashboard
              </Typography.Text>
            </div>
          </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={[
              { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
              { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
            ]}
          />

          <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Button icon={<SettingOutlined />} block>
                Settings
              </Button>
              <Button danger icon={<LogoutOutlined />} block onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </div>
        </Layout.Sider>

        <Layout style={{ background: "transparent" }}>
          <Layout.Content style={{ padding: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              <Typography.Title level={3} style={{ margin: 0 }}>
                Admin Analytics Dashboard
              </Typography.Title>

              <Space size={10} wrap>
                <Dropdown
                  menu={{ items: rangeItems, onClick: onRangeClick, selectedKeys: [rangeKey] }}
                  trigger={["click"]}
                >
                  <Button icon={<CalendarOutlined />}>
                    {selectedRangeLabel} <DownOutlined />
                  </Button>
                </Dropdown>

                <Space size={6} style={{ padding: "0 8px" }}>
                  <Typography.Text type="secondary">Compare</Typography.Text>
                  <Switch checked={comparePrev} onChange={setComparePrev} />
                </Space>

                <Button icon={<SettingOutlined />} />
                <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportCsv}>
                  Export CSV
                </Button>
              </Space>
            </div>

            {error && <div style={{ marginBottom: 12, color: token.colorError }}>{error}</div>}

            {/* KPI cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(160px, 1fr))",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <Card style={{ borderRadius: 18 }}>
                <Statistic title="Sessions" value={kpi?.sessions ?? 0} valueStyle={{ fontWeight: 800 }} />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>

              <Card style={{ borderRadius: 18 }}>
                <Statistic title="Unique Visitors" value={kpi?.unique_visitors ?? 0} valueStyle={{ fontWeight: 800 }} />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>

              <Card style={{ borderRadius: 18 }}>
                <Statistic title="Pageviews" value={kpi?.pageviews ?? 0} valueStyle={{ fontWeight: 800 }} />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>

              <Card style={{ borderRadius: 18 }}>
                <Statistic
                  title="Avg Time on Page"
                  value={formatDuration(kpi?.avg_time_sec ?? 0)}
                  valueStyle={{ fontWeight: 800 }}
                />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>

              <Card style={{ borderRadius: 18 }}>
                <Statistic
                  title="Bounce Rate"
                  value={formatPercent(kpi?.bounce_rate ?? 0)}
                  valueStyle={{ fontWeight: 800 }}
                />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>

              <Card style={{ borderRadius: 18 }}>
                <Statistic title="Conversions" value={kpi?.conversions ?? 0} valueStyle={{ fontWeight: 800 }} />
                <Button type="primary" size="small" style={{ marginTop: 12 }}>
                  View Report
                </Button>
              </Card>
            </div>

            {/* Main row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card
                title={<span style={{ fontWeight: 700 }}>Sessions & Pageviews</span>}
                extra={<Typography.Text type="secondary">{selectedRangeLabel}</Typography.Text>}
                style={{ borderRadius: 18 }}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartSessions.map((p, i) => ({
                        date: p.date,
                        sessions: p.value,
                        pageviews: chartPageviews[i]?.value ?? 0,
                      }))}
                      margin={{ top: 10, right: 12, left: 4, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.35} />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="sessions" stroke="#00A2CE" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="pageviews" stroke={ORANGE} strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Card style={{ borderRadius: 18 }}>
                  <Space size={12}>
                    <Avatar size={42} src="https://i.pravatar.cc/120?img=12" />
                    <div>
                      <Typography.Text strong>Jimmy Sullivan</Typography.Text>
                      <br />
                      <Typography.Text type="secondary">@jsullivans</Typography.Text>
                    </div>
                  </Space>
                </Card>

                <Card title={<span style={{ fontWeight: 700 }}>Top Pages</span>} style={{ borderRadius: 18 }}>
                  {(topPages || []).slice(0, 4).map((p) => (
                    <div key={p.path} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                      <Typography.Text>{p.path}</Typography.Text>
                      <Typography.Text strong>{numberFormatter.format(p.pageviews)}</Typography.Text>
                    </div>
                  ))}
                  {topPages.length === 0 && <Typography.Text type="secondary">No data yet</Typography.Text>}
                </Card>

                <Card title={<span style={{ fontWeight: 700 }}>Device & Browser</span>} style={{ borderRadius: 18 }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography.Text strong>{devices?.devices?.[0]?.type ?? "desktop"}</Typography.Text>
                      <Typography.Text type="secondary">
                        {numberFormatter.format(devices?.devices?.[0]?.count ?? 0)}
                      </Typography.Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography.Text strong>{devices?.browsers?.[0]?.name ?? "Chrome"}</Typography.Text>
                      <Typography.Text type="secondary">
                        {numberFormatter.format(devices?.browsers?.[0]?.count ?? 0)}
                      </Typography.Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography.Text strong>{devices?.os?.[0]?.name ?? "Windows"}</Typography.Text>
                      <Typography.Text type="secondary">
                        {numberFormatter.format(devices?.os?.[0]?.count ?? 0)}
                      </Typography.Text>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
              <TopPagesTable
                rows={topPages.map((p) => ({
                  path: p.path,
                  pageviews: p.pageviews,
                  unique_visitors: p.unique_visitors,
                  avg_time_sec: p.avg_time_sec,
                }))}
              />
              <TrafficChart items={trafficItems} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
              <PerformanceTable items={performance} />
              <Card
                title={<span style={{ fontWeight: 700 }}>Top Countries</span>}
                extra={<Typography.Text type="secondary">{selectedRangeLabel}</Typography.Text>}
                style={{ borderRadius: 18 }}
              >
                {topCountries.length === 0 ? (
                  <Typography.Text type="secondary">No geo data yet</Typography.Text>
                ) : (
                  <div style={{ display: "grid", gap: 10 }}>
                    {topCountries.map((item) => (
                      <div
                        key={item.country}
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography.Text>{item.country}</Typography.Text>
                        <Typography.Text strong>
                          {numberFormatter.format(item.count)}
                        </Typography.Text>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {loading && <div style={{ marginTop: 12, opacity: 0.7 }}>Loading analytics...</div>}
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
