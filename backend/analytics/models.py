from django.db import models


class Visit(models.Model):
    session_id = models.UUIDField(unique=True)
    visitor_id = models.UUIDField()

    started_at = models.DateTimeField()
    ended_at = models.DateTimeField(null=True, blank=True)

    referrer = models.TextField(blank=True, default="")
    landing_path = models.TextField(blank=True, default="")

    utm_source = models.TextField(blank=True, default="")
    utm_medium = models.TextField(blank=True, default="")
    utm_campaign = models.TextField(blank=True, default="")
    utm_term = models.TextField(blank=True, default="")
    utm_content = models.TextField(blank=True, default="")

    device_type = models.CharField(max_length=32, blank=True, default="")
    browser = models.CharField(max_length=64, blank=True, default="")
    os = models.CharField(max_length=64, blank=True, default="")
    language = models.CharField(max_length=16, blank=True, default="")

    country = models.CharField(max_length=64, blank=True, default="")
    city = models.CharField(max_length=128, blank=True, default="")
    client_country = models.CharField(max_length=64, blank=True, default="")
    client_city = models.CharField(max_length=128, blank=True, default="")
    geoip_country = models.CharField(max_length=64, blank=True, default="")
    geoip_city = models.CharField(max_length=128, blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Visit({self.session_id})"


class PageView(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="pageviews")
    path = models.TextField(blank=True, default="")
    title = models.TextField(blank=True, default="")
    duration_ms = models.IntegerField(null=True, blank=True)
    scroll_depth = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Event(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="events")
    category = models.CharField(max_length=64)
    action = models.CharField(max_length=64)
    label = models.CharField(max_length=128, blank=True, default="")
    value = models.FloatField(null=True, blank=True)
    path = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)


class Performance(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="performance")
    path = models.TextField(blank=True, default="")
    ttfb_ms = models.FloatField(null=True, blank=True)
    fcp_ms = models.FloatField(null=True, blank=True)
    lcp_ms = models.FloatField(null=True, blank=True)
    cls = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class ErrorLog(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="errors")
    path = models.TextField(blank=True, default="")
    message = models.TextField()
    stack = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)


class DailyRollup(models.Model):
    date = models.DateField()
    path = models.TextField(blank=True, default="")

    sessions = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)
    pageviews = models.IntegerField(default=0)

    avg_duration_ms = models.FloatField(null=True, blank=True)
    avg_scroll = models.FloatField(null=True, blank=True)
    conversions = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("date", "path")
