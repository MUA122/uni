from __future__ import annotations

from datetime import datetime, timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from analytics.models import DailyRollup


class Command(BaseCommand):
    help = "Generate daily rollups for analytics (DailyRollup)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--days",
            type=int,
            default=30,
            help="How many past days to roll up (default: 30).",
        )
        parser.add_argument(
            "--date",
            type=str,
            default="",
            help="Roll up a single date (YYYY-MM-DD, UTC). If provided, overrides --days.",
        )

    def handle(self, *args, **options):
        # Support both settings names safely
        enabled = getattr(settings, "ANALYTICS_ROLLUP_ENABLED", None)
        if enabled is None:
            enabled = getattr(settings, "ANALYTICS_USE_ROLLUPS", False)

        if not enabled:
            self.stdout.write(self.style.WARNING("Rollups disabled. Set ANALYTICS_USE_ROLLUPS=true (or ANALYTICS_ROLLUP_ENABLED=true)."))
            return

        # Import here to avoid early import problems if urls/views fail
        from django.db.models import Avg, Count
        from django.db.models.functions import TruncDate
        from analytics.models import Event, PageView, Visit

        date_str = (options.get("date") or "").strip()
        days = int(options.get("days") or 30)

        if date_str:
            day = datetime.strptime(date_str, "%Y-%m-%d").date()
            start_date = day
            end_date = day
        else:
            today = timezone.now().date()
            start_date = today - timedelta(days=days)
            end_date = today

        start_dt = timezone.make_aware(datetime.combine(start_date, datetime.min.time()))
        end_dt = timezone.make_aware(datetime.combine(end_date, datetime.max.time()))

        pv = (
            PageView.objects.filter(created_at__gte=start_dt, created_at__lte=end_dt)
            .annotate(day=TruncDate("created_at"))
            .values("day", "path")
            .annotate(
                pageviews=Count("id"),
                unique_visitors=Count("visit__visitor_id", distinct=True),
                avg_duration_ms=Avg("duration_ms"),
                avg_scroll=Avg("scroll_depth"),
            )
        )

        sessions = (
            Visit.objects.filter(started_at__gte=start_dt, started_at__lte=end_dt)
            .annotate(day=TruncDate("started_at"))
            .values("day", "landing_path")
            .annotate(sessions=Count("id"))
        )
        sessions_map = {(r["day"], (r["landing_path"] or "/")): r["sessions"] for r in sessions}

        conv = (
            Event.objects.filter(created_at__gte=start_dt, created_at__lte=end_dt, category="conversion")
            .annotate(day=TruncDate("created_at"))
            .values("day", "path")
            .annotate(conversions=Count("id"))
        )
        conv_map = {(r["day"], (r["path"] or "/")): r["conversions"] for r in conv}

        updated = 0
        for row in pv:
            day = row["day"]
            path = row["path"] or "/"

            DailyRollup.objects.update_or_create(
                date=day,
                path=path,
                defaults={
                    "sessions": sessions_map.get((day, path), 0),
                    "unique_visitors": row["unique_visitors"] or 0,
                    "pageviews": row["pageviews"] or 0,
                    "avg_duration_ms": int(row["avg_duration_ms"] or 0),
                    "avg_scroll": float(row["avg_scroll"] or 0.0),
                    "conversions": conv_map.get((day, path), 0),
                },
            )
            updated += 1

        self.stdout.write(self.style.SUCCESS(f"Rollup complete. Upserted {updated} DailyRollup rows for {start_date} → {end_date}."))
