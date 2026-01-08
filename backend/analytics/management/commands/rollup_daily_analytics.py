from __future__ import annotations

from datetime import date, datetime, timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.models import Avg, Count
from django.utils import timezone

from analytics.models import DailyRollup, Event, PageView, Visit


class Command(BaseCommand):
    help = "Create or update daily rollups for analytics."

    def add_arguments(self, parser):
        parser.add_argument("--date", dest="date", help="YYYY-MM-DD for the rollup date (UTC).")

    def handle(self, *args, **options):
        if not settings.ANALYTICS_ROLLUP_ENABLED:
            self.stdout.write("Daily rollups are disabled.")
            return

        target_date = options.get("date")
        if target_date:
            day = datetime.strptime(target_date, "%Y-%m-%d").date()
        else:
            day = (timezone.now() - timedelta(days=1)).date()

        start = timezone.make_aware(datetime.combine(day, datetime.min.time()))
        end = timezone.make_aware(datetime.combine(day, datetime.max.time()))

        pageviews = (
            PageView.objects.filter(created_at__gte=start, created_at__lte=end)
            .values("path")
            .annotate(
                pageviews=Count("id"),
                unique_visitors=Count("visit__visitor_id", distinct=True),
                avg_duration_ms=Avg("duration_ms"),
                avg_scroll=Avg("scroll_depth"),
            )
        )

        visit_sessions = (
            Visit.objects.filter(started_at__gte=start, started_at__lte=end)
            .values("landing_path")
            .annotate(sessions=Count("id"))
        )
        sessions_by_path = {row["landing_path"] or "/": row["sessions"] for row in visit_sessions}

        conversions = (
            Event.objects.filter(created_at__gte=start, created_at__lte=end, category="conversion")
            .values("path")
            .annotate(count=Count("id"))
        )
        conversions_by_path = {row["path"] or "/": row["count"] for row in conversions}

        updated = 0
        for row in pageviews:
            path = row["path"]
            DailyRollup.objects.update_or_create(
                date=day,
                path=path,
                defaults={
                    "sessions": sessions_by_path.get(path, 0),
                    "unique_visitors": row["unique_visitors"],
                    "pageviews": row["pageviews"],
                    "avg_duration_ms": row["avg_duration_ms"] or 0,
                    "avg_scroll": row["avg_scroll"] or 0,
                    "conversions": conversions_by_path.get(path, 0),
                },
            )
            updated += 1

        self.stdout.write(f"Rolled up {updated} paths for {day.isoformat()}.")
