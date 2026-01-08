type GeoData = {
  country?: string;
  city?: string;
};

const ANALYTICS_BASE = (import.meta.env.VITE_ANALYTICS_API_BASE || "http://127.0.0.1:8000").replace(/\/$/, "");
const VISITOR_KEY = "analyticsVisitorId";
const SESSION_KEY = "analyticsSessionId";
const STARTED_KEY = "analyticsVisitStarted";
const CONSENT_KEY = "analyticsGeoConsent";

export type GeoConsent = "unset" | "granted" | "denied";

function getOrCreateId(key: string, storage: Storage) {
  const existing = storage.getItem(key);
  if (existing) {
    return existing;
  }
  const id = crypto.randomUUID();
  storage.setItem(key, id);
  return id;
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) {
    return "mobile";
  }
  if (width <= 1024) {
    return "tablet";
  }
  return "desktop";
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
}

export function getGeoConsent(): GeoConsent {
  const value = localStorage.getItem(CONSENT_KEY) as GeoConsent | null;
  return value || "unset";
}

export function setGeoConsent(value: GeoConsent) {
  localStorage.setItem(CONSENT_KEY, value);
}

export async function startVisit(extra?: GeoData) {
  const visitorId = getOrCreateId(VISITOR_KEY, localStorage);
  const sessionId = getOrCreateId(SESSION_KEY, sessionStorage);
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
      headers: { "Content-Type": "application/json" },
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
  void startVisit();
}

export async function lookupGeo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { country_name?: string; city?: string };
    return { country: data.country_name || "", city: data.city || "" };
  } catch {
    return null;
  }
}

export async function updateVisitGeoWithConsent() {
  const geo = await lookupGeo();
  if (!geo) {
    return;
  }
  await startVisit(geo);
}
