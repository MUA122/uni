type GeoData = {
  country?: string;
  city?: string;
};

type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const ANALYTICS_BASE =
  import.meta.env.VITE_ANALYTICS_BASE_URL || "http://localhost:8000";

const ANALYTICS_INGEST_KEY = import.meta.env.VITE_ANALYTICS_INGEST_KEY || "";

const VISITOR_ID_KEY = "analyticsVisitorId";
const SESSION_ID_KEY = "analyticsSessionId";
const STARTED_KEY = "analyticsVisitStarted";
const CONSENT_KEY = "analyticsGeoConsent";

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id =
      (crypto as any).randomUUID?.() ||
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id =
      (crypto as any).randomUUID?.() ||
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mobile")) return "mobile";
  if (ua.includes("tablet")) return "tablet";
  return "desktop";
}

function getUtmParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ] as const;
  for (const k of keys) {
    const v = params.get(k);
    if (v) utm[k] = v;
  }
  return utm;
}

export function setGeoConsent(value: boolean) {
  localStorage.setItem(CONSENT_KEY, value ? "true" : "false");
}

export function getGeoConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === "true";
}

async function lookupGeo(): Promise<GeoData | null> {
  // You can replace this with your own endpoint/provider.
  // Must return { country, city } or null.
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    return {
      country: data?.country_name || data?.country || "",
      city: data?.city || "",
    };
  } catch {
    return null;
  }
}

export async function startVisit(extra?: GeoData) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload = {
    session_id: sessionId,
    visitor_id: visitorId,
    started_at: new Date().toISOString(),
    referrer: document.referrer || "",
    landing_path: window.location.pathname,
    device_type: getDeviceType(),
    language: navigator.language || "",
    ...getUtmParams(),
    ...extra,
  };

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/visit/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
    sessionStorage.setItem(STARTED_KEY, "true");
  } catch {
    // Best effort; do not block the UI.
  }
}

export function startVisitIfNeeded() {
  if (sessionStorage.getItem(STARTED_KEY) === "true") {
    return;
  }

  // Start once with geo (if available) to avoid calling /visit/start twice and
  // accidentally overwriting started_at on the server.
  void (async () => {
    const geo = await lookupGeo();
    await startVisit(geo || undefined);
  })();
}

export async function trackPageView(path: string, durationMs?: number) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload: any = {
    session_id: sessionId,
    visitor_id: visitorId,
    path,
    title: document.title || "",
    created_at: new Date().toISOString(),
  };

  if (typeof durationMs === "number") {
    payload.duration_ms = durationMs;
  }

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/pageview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best effort
  }
}

export async function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
  path?: string
) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload: any = {
    session_id: sessionId,
    visitor_id: visitorId,
    category,
    action,
    label: label || "",
    path: path || window.location.pathname,
    created_at: new Date().toISOString(),
  };

  if (typeof value === "number") {
    payload.value = value;
  }

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best effort
  }
}

export async function trackPerformance(metrics: {
  path: string;
  ttfb_ms?: number;
  fcp_ms?: number;
  lcp_ms?: number;
  cls?: number;
}) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload: any = {
    session_id: sessionId,
    visitor_id: visitorId,
    path: metrics.path,
    created_at: new Date().toISOString(),
    ...metrics,
  };

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/perf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best effort
  }
}

export async function trackError(
  message: string,
  stack?: string,
  path?: string
) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload: any = {
    session_id: sessionId,
    visitor_id: visitorId,
    message,
    stack: stack || "",
    path: path || window.location.pathname,
    created_at: new Date().toISOString(),
  };

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/error`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best effort
  }
}

export async function endVisit() {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload = {
    session_id: sessionId,
    visitor_id: visitorId,
    ended_at: new Date().toISOString(),
  };

  try {
    await fetch(`${ANALYTICS_BASE}/api/analytics/visit/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANALYTICS_INGEST_KEY
          ? { "X-Analytics-Key": ANALYTICS_INGEST_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best effort
  }
}

export async function updateVisitGeoWithConsent() {
  // Backward-compatible no-op: startVisitIfNeeded now includes geo on the first call.
  // Kept so existing callers don't break.
  return;
}
