from django.contrib import admin

from .models import DailyRollup, ErrorLog, Event, PageView, Performance, Visit


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ("session_id", "visitor_id", "started_at", "ended_at", "device_type")
    search_fields = ("session_id", "visitor_id", "referrer", "landing_path")
    list_filter = ("device_type", "browser", "os")


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("path", "visit", "created_at")
    search_fields = ("path", "title")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("category", "action", "label", "visit", "created_at")
    search_fields = ("category", "action", "label", "path")


@admin.register(Performance)
class PerformanceAdmin(admin.ModelAdmin):
    list_display = ("path", "visit", "lcp_ms", "fcp_ms", "ttfb_ms", "cls", "created_at")
    search_fields = ("path",)


@admin.register(ErrorLog)
class ErrorLogAdmin(admin.ModelAdmin):
    list_display = ("path", "message", "visit", "created_at")
    search_fields = ("path", "message")


@admin.register(DailyRollup)
class DailyRollupAdmin(admin.ModelAdmin):
    list_display = ("date", "path", "sessions", "unique_visitors", "pageviews", "conversions")
    list_filter = ("date",)
    search_fields = ("path",)
