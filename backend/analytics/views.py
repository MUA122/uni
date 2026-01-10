from __future__ import annotations

from collections import defaultdict

from django.conf import settings
from django.db.models import Avg, Count, F, FloatField, Q, Sum
from django.db.models.functions import TruncDate
from django.utils import timezone
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import DailyRollup, ErrorLog, Event, PageView, Performance, Visit
from .serializers import (
    ErrorLogSerializer,
    EventSerializer,
    PageViewSerializer,
    PerformanceSerializer,
    VisitEndSerializer,
    VisitStartSerializer,
)
from .throttles import IngestBurstThrottle, IngestThrottle
from .utils import (
    classify_referrer,
    parse_range_param,
    percentile,
    previous_range,
    validate_ingest_key,
)


class AuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


def get_or_create_visit(session_id, visitor_id, started_at=None):
    if started_at is None:
        started_at = timezone.now()
    visit, created = Visit.objects.get_or_create(
        session_id=session_id,
        defaults={"visitor_id": visitor_id, "started_at": started_at},
    )
    if not created and visit.visitor_id != visitor_id:
        visit.visitor_id = visitor_id
        visit.save(update_fields=["visitor_id", "updated_at"])
    return visit


def rollups_available(date_range) -> bool:
    enabled = getattr(settings, "ANALYTICS_ROLLUP_ENABLED", None)
    if enabled is None:
        enabled = getattr(settings, "ANALYTICS_USE_ROLLUPS", False)

    if not enabled:
        return False

    return DailyRollup.objects.filter(
        date__gte=date_range.start.date(),
        date__lte=date_range.end.date(),
    ).exists()


class VisitStartView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = VisitStartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        started_at = data.get("started_at") or timezone.now()

        visit, created = Visit.objects.get_or_create(
            session_id=data["session_id"],
            defaults={
                "visitor_id": data["visitor_id"],
                "started_at": started_at,
                "referrer": data.get("referrer", ""),
                "landing_path": data.get("landing_path", ""),
                "utm_source": data.get("utm_source", ""),
                "utm_medium": data.get("utm_medium", ""),
                "utm_campaign": data.get("utm_campaign", ""),
                "utm_term": data.get("utm_term", ""),
                "utm_content": data.get("utm_content", ""),
                "device_type": data.get("device_type", ""),
                "browser": data.get("browser", ""),
                "os": data.get("os", ""),
                "language": data.get("language", ""),
                "country": data.get("country", ""),
                "city": data.get("city", ""),
            },
        )

        if not created:
            # Do NOT overwrite started_at for an existing session; keep the first timestamp.
            update_fields = []
            for field, value in {
                "visitor_id": data["visitor_id"],
                "referrer": data.get("referrer", ""),
                "landing_path": data.get("landing_path", ""),
                "utm_source": data.get("utm_source", ""),
                "utm_medium": data.get("utm_medium", ""),
                "utm_campaign": data.get("utm_campaign", ""),
                "utm_term": data.get("utm_term", ""),
                "utm_content": data.get("utm_content", ""),
                "device_type": data.get("device_type", ""),
                "browser": data.get("browser", ""),
                "os": data.get("os", ""),
                "language": data.get("language", ""),
                # Geo can be added later; allow overwrite only if provided and non-empty.
                "country": data.get("country", "") or visit.country,
                "city": data.get("city", "") or visit.city,
            }.items():
                if getattr(visit, field) != value:
                    setattr(visit, field, value)
                    update_fields.append(field)

            if update_fields:
                visit.save(update_fields=update_fields + ["updated_at"])

        return Response({"status": "ok"})


class VisitEndView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = VisitEndSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        ended_at = data.get("ended_at") or timezone.now()
        Visit.objects.filter(session_id=data["session_id"]).update(ended_at=ended_at)
        return Response({"status": "ok"})


class PageViewCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = PageViewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        visit = get_or_create_visit(data["session_id"], data["visitor_id"])
        PageView.objects.create(
            visit=visit,
            path=data["path"],
            title=data.get("title", ""),
            duration_ms=data.get("duration_ms"),
            scroll_depth=data.get("scroll_depth"),
            created_at=data.get("created_at") or timezone.now(),
        )
        return Response({"status": "ok"})


class EventCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        visit = get_or_create_visit(data["session_id"], data["visitor_id"])
        Event.objects.create(
            visit=visit,
            category=data["category"],
            action=data["action"],
            label=data.get("label", ""),
            value=data.get("value"),
            path=data.get("path", ""),
            created_at=data.get("created_at") or timezone.now(),
        )
        return Response({"status": "ok"})


class PerformanceCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = PerformanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        visit = get_or_create_visit(data["session_id"], data["visitor_id"])
        Performance.objects.create(
            visit=visit,
            path=data["path"],
            ttfb_ms=data.get("ttfb_ms"),
            fcp_ms=data.get("fcp_ms"),
            lcp_ms=data.get("lcp_ms"),
            cls=data.get("cls"),
            created_at=data.get("created_at") or timezone.now(),
        )
        return Response({"status": "ok"})


class ErrorLogCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [IngestThrottle, IngestBurstThrottle]

    def post(self, request):
        if not validate_ingest_key(request):
            return Response({"detail": "Invalid ingestion key."}, status=403)

        serializer = ErrorLogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        visit = get_or_create_visit(data["session_id"], data["visitor_id"])
        ErrorLog.objects.create(
            visit=visit,
            path=data.get("path", ""),
            message=data["message"],
            stack=data.get("stack", ""),
            created_at=data.get("created_at") or timezone.now(),
        )
        return Response({"status": "ok"})


class OverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        prev_range = previous_range(date_range)

        visits_qs = Visit.objects.filter(started_at__gte=date_range.start, started_at__lte=date_range.end)
        pageviews_qs = PageView.objects.filter(created_at__gte=date_range.start, created_at__lte=date_range.end)

        sessions = visits_qs.count()
        unique_visitors = visits_qs.values("visitor_id").distinct().count()
        pageviews = pageviews_qs.count()
        avg_time_ms = pageviews_qs.aggregate(avg=Avg("duration_ms"))["avg"] or 0

        bounce_count = visits_qs.annotate(
            pv_count=Count(
                "pageviews",
                filter=Q(pageviews__created_at__gte=date_range.start, pageviews__created_at__lte=date_range.end),
            )
        ).filter(pv_count__lte=1).count()
        bounce_rate = bounce_count / sessions if sessions else 0

        conversions = Event.objects.filter(
            created_at__gte=date_range.start,
            created_at__lte=date_range.end,
            category="conversion",
        ).count()

        prev_sessions = Visit.objects.filter(
            started_at__gte=prev_range.start, started_at__lte=prev_range.end
        ).count()
        prev_pageviews = PageView.objects.filter(
            created_at__gte=prev_range.start, created_at__lte=prev_range.end
        ).count()

        def change(current, previous):
            if previous == 0:
                return 0
            return (current - previous) / previous

        return Response(
            {
                "range": date_range.key,
                "totals": {
                    "sessions": sessions,
                    "unique_visitors": unique_visitors,
                    "pageviews": pageviews,
                    "avg_time_sec": round(avg_time_ms / 1000, 2) if avg_time_ms else 0,
                    "bounce_rate": round(bounce_rate, 4),
                    "conversions": conversions,
                },
                "change_vs_prev": {
                    "sessions": round(change(sessions, prev_sessions), 4),
                    "pageviews": round(change(pageviews, prev_pageviews), 4),
                },
            }
        )


class TimeseriesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        metric = request.query_params.get("metric", "sessions")
        date_range = parse_range_param(request.query_params.get("range"))

        if metric == "pageviews":
            qs = (
                PageView.objects.filter(created_at__gte=date_range.start, created_at__lte=date_range.end)
                .annotate(day=TruncDate("created_at"))
                .values("day")
                .annotate(value=Count("id"))
                .order_by("day")
            )
        else:
            qs = (
                Visit.objects.filter(started_at__gte=date_range.start, started_at__lte=date_range.end)
                .annotate(day=TruncDate("started_at"))
                .values("day")
                .annotate(value=Count("id"))
                .order_by("day")
            )
            metric = "sessions"

        points = [{"date": item["day"].isoformat(), "value": item["value"]} for item in qs]
        return Response({"metric": metric, "points": points})


class TopPagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        if rollups_available(date_range):
            rollups = (
                DailyRollup.objects.filter(
                    date__gte=date_range.start.date(),
                    date__lte=date_range.end.date(),
                )
                .values("path")
                .annotate(
                    pageviews=Sum("pageviews"),
                    unique_visitors=Sum("unique_visitors"),
                    total_duration_ms=Sum(F("avg_duration_ms") * F("pageviews"), output_field=FloatField()),
                )
                .order_by("-pageviews")
            )
            items = []
            for row in rollups:
                total_pageviews = row["pageviews"] or 0
                avg_time_sec = 0
                if total_pageviews:
                    avg_time_sec = round((row["total_duration_ms"] or 0) / total_pageviews / 1000, 2)
                items.append(
                    {
                        "path": row["path"],
                        "pageviews": total_pageviews,
                        "unique_visitors": row["unique_visitors"] or 0,
                        "avg_time_sec": avg_time_sec,
                        "exit_rate": 0,
                    }
                )
            return Response({"items": items})

        qs = (
            PageView.objects.filter(created_at__gte=date_range.start, created_at__lte=date_range.end)
            .values("path")
            .annotate(
                pageviews=Count("id"),
                unique_visitors=Count("visit__visitor_id", distinct=True),
                avg_time_ms=Avg("duration_ms"),
            )
            .order_by("-pageviews")
        )
        items = []
        for row in qs:
            items.append(
                {
                    "path": row["path"],
                    "pageviews": row["pageviews"],
                    "unique_visitors": row["unique_visitors"],
                    "avg_time_sec": round((row["avg_time_ms"] or 0) / 1000, 2),
                    "exit_rate": 0,
                }
            )
        return Response({"items": items})


class ReferrersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        counts = defaultdict(int)
        for visit in Visit.objects.filter(
            started_at__gte=date_range.start, started_at__lte=date_range.end
        ).only("referrer"):
            counts[classify_referrer(visit.referrer)] += 1
        items = [{"source": key, "count": value} for key, value in counts.items()]
        items.sort(key=lambda item: item["count"], reverse=True)
        return Response({"items": items})


class GeoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        visits = (
            Visit.objects.filter(started_at__gte=date_range.start, started_at__lte=date_range.end)
            .exclude(country="")
            .values("country", "city")
            .annotate(count=Count("id"))
            .order_by("-count")
        )
        items = [{"country": row["country"], "city": row["city"] or "", "count": row["count"]} for row in visits]
        return Response({"items": items})


class DevicesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        visits_qs = Visit.objects.filter(started_at__gte=date_range.start, started_at__lte=date_range.end)

        devices = visits_qs.values("device_type").annotate(count=Count("id")).order_by("-count")
        browsers = visits_qs.values("browser").annotate(count=Count("id")).order_by("-count")
        os_items = visits_qs.values("os").annotate(count=Count("id")).order_by("-count")

        return Response(
            {
                "devices": [{"type": row["device_type"] or "unknown", "count": row["count"]} for row in devices],
                "browsers": [{"name": row["browser"] or "unknown", "count": row["count"]} for row in browsers],
                "os": [{"name": row["os"] or "unknown", "count": row["count"]} for row in os_items],
            }
        )


class ConversionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))
        sessions = Visit.objects.filter(started_at__gte=date_range.start, started_at__lte=date_range.end).count()
        events = (
            Event.objects.filter(
                created_at__gte=date_range.start,
                created_at__lte=date_range.end,
                category="conversion",
            )
            .values("label", "action")
            .annotate(count=Count("id"))
            .order_by("-count")
        )
        items = []
        for row in events:
            name = row["label"] or row["action"]
            rate = (row["count"] / sessions) if sessions else 0
            items.append({"name": name, "count": row["count"], "rate": round(rate, 4)})
        return Response({"items": items})


class PerformanceReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_range = parse_range_param(request.query_params.get("range"))

        rows = Performance.objects.filter(created_at__gte=date_range.start, created_at__lte=date_range.end).values(
            "path",
            "ttfb_ms",
            "fcp_ms",
            "lcp_ms",
            "cls",
        )
        buckets = defaultdict(lambda: {"ttfb_ms": [], "fcp_ms": [], "lcp_ms": [], "cls": []})
        for row in rows:
            bucket = buckets[row["path"]]
            for key in ["ttfb_ms", "fcp_ms", "lcp_ms", "cls"]:
                value = row[key]
                if value is not None:
                    bucket[key].append(float(value))

        items = []
        for path, values in buckets.items():
            items.append(
                {
                    "path": path,
                    "ttfb_p75_ms": round(percentile(values["ttfb_ms"], 0.75), 2),
                    "fcp_p75_ms": round(percentile(values["fcp_ms"], 0.75), 2),
                    "lcp_p75_ms": round(percentile(values["lcp_ms"], 0.75), 2),
                    "cls_p75": round(percentile(values["cls"], 0.75), 4),
                }
            )
        items.sort(key=lambda item: item["lcp_p75_ms"], reverse=True)
        return Response({"items": items})


class ExportCsvView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        import csv
        import io
        from django.http import HttpResponse

        date_range = parse_range_param(request.query_params.get("range"))
        qs = (
            PageView.objects.filter(created_at__gte=date_range.start, created_at__lte=date_range.end)
            .values("path")
            .annotate(
                pageviews=Count("id"),
                unique_visitors=Count("visit__visitor_id", distinct=True),
                avg_time_ms=Avg("duration_ms"),
            )
            .order_by("-pageviews")
        )

        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow(["path", "pageviews", "unique_visitors", "avg_time_sec"])

        for row in qs:
            writer.writerow(
                [
                    row["path"],
                    row["pageviews"],
                    row["unique_visitors"],
                    round((row["avg_time_ms"] or 0) / 1000, 2),
                ]
            )

        resp = HttpResponse(buf.getvalue(), content_type="text/csv")
        resp["Content-Disposition"] = 'attachment; filename="analytics_export.csv"'
        return resp
