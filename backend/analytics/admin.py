from django.contrib import admin

from .models import DailyRollup, ErrorLog, Event, PageView, Performance, Visit


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ("session_id", "visitor_id", "started_at", "ended_at", "device_type")
    search_fields = ("session_id", "visitor_id", "landing_path", "referrer", "country", "city")
    list_filter = ("device_type", "browser", "os", "language", "country")


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("visit", "path", "duration_ms", "scroll_depth", "created_at")
    search_fields = ("path", "title")
    list_filter = ("created_at",)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("visit", "category", "action", "label", "value", "path", "created_at")
    search_fields = ("category", "action", "label", "path")
    list_filter = ("created_at", "category", "action")


@admin.register(Performance)
class PerformanceAdmin(admin.ModelAdmin):
    list_display = ("visit", "path", "ttfb_ms", "fcp_ms", "lcp_ms", "cls", "created_at")
    search_fields = ("path",)
    list_filter = ("created_at",)


@admin.register(ErrorLog)
class ErrorLogAdmin(admin.ModelAdmin):
    list_display = ("visit", "path", "message", "created_at")
    search_fields = ("path", "message")
    list_filter = ("created_at",)


@admin.register(DailyRollup)
class DailyRollupAdmin(admin.ModelAdmin):
    list_display = ("date", "path", "sessions", "unique_visitors", "pageviews")
    search_fields = ("path",)
    list_filter = ("date",)
