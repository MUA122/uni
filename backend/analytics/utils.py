from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
from typing import Iterable

from django.conf import settings
from django.utils import timezone


@dataclass(frozen=True)
class DateRange:
    start: timezone.datetime
    end: timezone.datetime
    key: str


def parse_range_param(range_key: str | None) -> DateRange:
    allowed = settings.ANALYTICS_ALLOWED_RANGES
    key = range_key or settings.ANALYTICS_DEFAULT_RANGE
    if key not in allowed:
        key = settings.ANALYTICS_DEFAULT_RANGE
    end = timezone.now()
    if key == "today":
        start = end.replace(hour=0, minute=0, second=0, microsecond=0)
    else:
        start = end - timedelta(days=allowed[key])
    return DateRange(start=start, end=end, key=key)


def previous_range(date_range: DateRange) -> DateRange:
    delta = date_range.end - date_range.start
    end = date_range.start
    start = end - delta
    return DateRange(start=start, end=end, key=f"prev_{date_range.key}")


def percentile(values: Iterable[float], p: float) -> float:
    sorted_values = sorted(values)
    if not sorted_values:
        return 0.0
    if p <= 0:
        return float(sorted_values[0])
    if p >= 1:
        return float(sorted_values[-1])
    k = (len(sorted_values) - 1) * p
    f = int(k)
    c = min(f + 1, len(sorted_values) - 1)
    if f == c:
        return float(sorted_values[int(k)])
    d0 = sorted_values[f] * (c - k)
    d1 = sorted_values[c] * (k - f)
    return float(d0 + d1)


def classify_referrer(referrer: str) -> str:
    referrer = (referrer or "").lower()
    if not referrer:
        return "direct"
    if any(engine in referrer for engine in ["google.", "bing.", "yahoo.", "duckduckgo."]):
        return "search"
    if any(social in referrer for social in ["facebook.", "instagram.", "twitter.", "linkedin.", "tiktok."]):
        return "social"
    return "referral"
