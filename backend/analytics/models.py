import uuid

from django.db import models


class Visit(models.Model):
    DEVICE_CHOICES = [
        ("mobile", "Mobile"),
        ("desktop", "Desktop"),
        ("tablet", "Tablet"),
        ("other", "Other"),
    ]

    session_id = models.UUIDField(default=uuid.uuid4, unique=True, db_index=True)
    visitor_id = models.UUIDField(db_index=True)
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField(null=True, blank=True)
    referrer = models.TextField(blank=True, default="")
    landing_path = models.CharField(max_length=500, blank=True, default="")
    utm_source = models.CharField(max_length=200, blank=True, default="")
    utm_medium = models.CharField(max_length=200, blank=True, default="")
    utm_campaign = models.CharField(max_length=200, blank=True, default="")
    utm_term = models.CharField(max_length=200, blank=True, default="")
    utm_content = models.CharField(max_length=200, blank=True, default="")
    device_type = models.CharField(max_length=20, choices=DEVICE_CHOICES, blank=True, default="")
    browser = models.CharField(max_length=120, blank=True, default="")
    os = models.CharField(max_length=120, blank=True, default="")
    language = models.CharField(max_length=50, blank=True, default="")
    country = models.CharField(max_length=120, blank=True, default="")
    city = models.CharField(max_length=120, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["started_at"]),
            models.Index(fields=["visitor_id"]),
        ]

    def __str__(self) -> str:
        return f"Visit {self.session_id}"


class PageView(models.Model):
    visit = models.ForeignKey(Visit, related_name="pageviews", on_delete=models.CASCADE)
    path = models.CharField(max_length=500, db_index=True)
    title = models.CharField(max_length=300, blank=True, default="")
    duration_ms = models.PositiveIntegerField(null=True, blank=True)
    scroll_depth = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self) -> str:
        return f"{self.path} ({self.visit_id})"


class Event(models.Model):
    visit = models.ForeignKey(Visit, related_name="events", on_delete=models.CASCADE)
    category = models.CharField(max_length=120, db_index=True)
    action = models.CharField(max_length=120)
    label = models.CharField(max_length=200, blank=True, default="")
    value = models.FloatField(null=True, blank=True)
    path = models.CharField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self) -> str:
        return f"{self.category}:{self.action}"


class Performance(models.Model):
    visit = models.ForeignKey(Visit, related_name="performance", on_delete=models.CASCADE)
    path = models.CharField(max_length=500, db_index=True)
    ttfb_ms = models.FloatField(null=True, blank=True)
    fcp_ms = models.FloatField(null=True, blank=True)
    lcp_ms = models.FloatField(null=True, blank=True)
    cls = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self) -> str:
        return f"{self.path} perf"


class ErrorLog(models.Model):
    visit = models.ForeignKey(Visit, related_name="errors", on_delete=models.CASCADE)
    path = models.CharField(max_length=500, blank=True, default="")
    message = models.TextField()
    stack = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self) -> str:
        return f"Error {self.id}"


class DailyRollup(models.Model):
    date = models.DateField(db_index=True)
    path = models.CharField(max_length=500, db_index=True)
    sessions = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    pageviews = models.PositiveIntegerField(default=0)
    avg_duration_ms = models.FloatField(default=0)
    avg_scroll = models.FloatField(default=0)
    conversions = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("date", "path")

    def __str__(self) -> str:
        return f"{self.date} {self.path}"
