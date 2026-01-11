from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import ipaddress
from datetime import timedelta
from typing import Iterable, Tuple

from django.conf import settings
from django.utils import timezone


@dataclass(frozen=True)
class DateRange:
    start: timezone.datetime
    end: timezone.datetime
    key: str


RANGE_PRESETS = {
    "today": timedelta(days=1),
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
    "90d": timedelta(days=90),
    "1y": timedelta(days=365),
}


def parse_range_param(range_param: str | None) -> DateRange:
    now = timezone.now()
    key = (range_param or "30d").strip().lower()
    delta = RANGE_PRESETS.get(key, RANGE_PRESETS["30d"])
    start = now - delta
    end = now
    return DateRange(start=start, end=end, key=key)


def previous_range(current: DateRange) -> DateRange:
    delta = current.end - current.start
    end = current.start
    start = end - delta
    return DateRange(start=start, end=end, key=f"prev_{current.key}")


def classify_referrer(referrer: str) -> str:
    if not referrer:
        return "direct"
    r = referrer.lower()
    if "google." in r:
        return "google"
    if "facebook." in r or "fb." in r:
        return "facebook"
    if "instagram." in r:
        return "instagram"
    if "linkedin." in r:
        return "linkedin"
    if "twitter." in r or "x.com" in r:
        return "twitter"
    return "other"


def percentile(values: Iterable[float], p: float) -> float:
    v = sorted(values)
    if not v:
        return 0.0
    if p <= 0:
        return float(v[0])
    if p >= 1:
        return float(v[-1])
    k = (len(v) - 1) * p
    f = int(k)
    c = min(f + 1, len(v) - 1)
    if f == c:
        return float(v[f])
    d0 = v[f] * (c - k)
    d1 = v[c] * (k - f)
    return float(d0 + d1)


def validate_ingest_key(request) -> bool:
    """Validate X-Analytics-Key header (best-effort shared secret).

    If ANALYTICS_INGEST_KEY is not set, ingestion is allowed (dev-friendly).
    """
    expected = getattr(settings, "ANALYTICS_INGEST_KEY", "")
    if not expected:
        return True
    provided = request.META.get("HTTP_X_ANALYTICS_KEY", "")
    # Constant-time compare (defense-in-depth).
    try:
        from hmac import compare_digest

        return compare_digest(provided, expected)
    except Exception:
        return provided == expected


def get_client_ip(request) -> str:
    """Return the best-effort public client IP behind proxies."""
    # Cloudflare
    cf_ip = request.META.get("HTTP_CF_CONNECTING_IP")
    if cf_ip:
        return cf_ip.strip()

    # Standard proxy header (first IP is the original client)
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        first = xff.split(",")[0].strip()
        if first:
            return first

    # Fallback
    return (request.META.get("REMOTE_ADDR") or "").strip()


@lru_cache(maxsize=512)
def is_public_ip(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return not (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
        )
    except Exception:
        return False


def best_effort_public_ip(request) -> str:
    ip = get_client_ip(request)
    if ip and is_public_ip(ip):
        return ip
    return ""


@lru_cache(maxsize=50_000)
def geo_lookup_ip(ip: str) -> Tuple[str, str]:
    """Resolve IP to (country, city) using GeoLite2 if configured."""
    if not ip or not is_public_ip(ip):
        return ("", "")

    mmdb_path = getattr(settings, "ANALYTICS_GEOIP_CITY_MMDB", "")
    if not mmdb_path:
        return ("", "")

    try:
        import geoip2.database  # type: ignore

        with geoip2.database.Reader(mmdb_path) as reader:
            resp = reader.city(ip)
            country = ""
            city = ""
            if getattr(resp, "country", None):
                country = resp.country.name or resp.country.iso_code or ""
            if getattr(resp, "city", None):
                city = resp.city.name or ""
            return (country or "", city or "")
    except Exception:
        return ("", "")
