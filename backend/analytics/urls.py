from django.urls import path

from .views import (
    AuthLoginView,
    VisitStartView,
    VisitEndView,
    PageViewCreateView,
    EventCreateView,
    PerformanceCreateView,
    ErrorLogCreateView,
    OverviewView,
    TimeseriesView,
    TopPagesView,
    ReferrersView,
    GeoView,
    DevicesView,
    ConversionsView,
    PerformanceReportView,
    ExportCsvView,
)

urlpatterns = [
    # -------------------------
    # Auth
    # -------------------------
    path("auth/login", AuthLoginView.as_view(), name="analytics-auth-login"),

    # -------------------------
    # Ingestion (AllowAny + ingest key enforced in views)
    # -------------------------
    path("visit/start", VisitStartView.as_view(), name="visit-start"),
    path("visit/end", VisitEndView.as_view(), name="visit-end"),
    path("pageview", PageViewCreateView.as_view(), name="pageview-create"),
    path("event", EventCreateView.as_view(), name="event-create"),
    path("perf", PerformanceCreateView.as_view(), name="performance-create"),
    path("error", ErrorLogCreateView.as_view(), name="error-create"),

    # -------------------------
    # Admin reporting (JWT required)
    # -------------------------
    path("admin/overview", OverviewView.as_view(), name="analytics-overview"),
    path("admin/timeseries", TimeseriesView.as_view(), name="analytics-timeseries"),
    path("admin/top-pages", TopPagesView.as_view(), name="analytics-top-pages"),
    path("admin/referrers", ReferrersView.as_view(), name="analytics-referrers"),
    path("admin/geo", GeoView.as_view(), name="analytics-geo"),
    path("admin/devices", DevicesView.as_view(), name="analytics-devices"),
    path("admin/conversions", ConversionsView.as_view(), name="analytics-conversions"),
    path("admin/performance", PerformanceReportView.as_view(), name="analytics-performance"),

    # -------------------------
    # Export
    # -------------------------
    path("admin/export/csv", ExportCsvView.as_view(), name="analytics-export-csv"),
]
