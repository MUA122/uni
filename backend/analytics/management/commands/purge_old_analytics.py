from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from analytics.models import ErrorLog, Event, PageView, Performance, Visit


class Command(BaseCommand):
    help = "Purge analytics data older than the retention window."

    def handle(self, *args, **options):
        retention_days = settings.ANALYTICS_RETENTION_DAYS
        cutoff = timezone.now() - timedelta(days=retention_days)

        deleted = {
            "pageviews": PageView.objects.filter(created_at__lt=cutoff).delete()[0],
            "events": Event.objects.filter(created_at__lt=cutoff).delete()[0],
            "performance": Performance.objects.filter(created_at__lt=cutoff).delete()[0],
            "errors": ErrorLog.objects.filter(created_at__lt=cutoff).delete()[0],
            "visits": Visit.objects.filter(started_at__lt=cutoff).delete()[0],
        }

        self.stdout.write(
            "Purged analytics data older than %s days: %s" % (retention_days, deleted)
        )
