from django.urls import path

from .views import (
    AuthLoginView,
    ConversionsView,
    DevicesView,
    ErrorLogCreateView,
    EventCreateView,
    GeoView,
    OverviewView,
    PageViewCreateView,
    PerformanceCreateView,
    PerformanceView,
    ReferrersView,
    TimeseriesView,
    TopPagesView,
    VisitEndView,
    VisitStartView,
)

urlpatterns = [
    path("auth/login", AuthLoginView.as_view(), name="auth-login"),
    path("visit/start", VisitStartView.as_view(), name="visit-start"),
    path("visit/end", VisitEndView.as_view(), name="visit-end"),
    path("pageview", PageViewCreateView.as_view(), name="pageview"),
    path("event", EventCreateView.as_view(), name="event"),
    path("perf", PerformanceCreateView.as_view(), name="perf"),
    path("error", ErrorLogCreateView.as_view(), name="error"),
    path("admin/overview", OverviewView.as_view(), name="admin-overview"),
    path("admin/timeseries", TimeseriesView.as_view(), name="admin-timeseries"),
    path("admin/top-pages", TopPagesView.as_view(), name="admin-top-pages"),
    path("admin/referrers", ReferrersView.as_view(), name="admin-referrers"),
    path("admin/geo", GeoView.as_view(), name="admin-geo"),
    path("admin/devices", DevicesView.as_view(), name="admin-devices"),
    path("admin/conversions", ConversionsView.as_view(), name="admin-conversions"),
    path("admin/performance", PerformanceView.as_view(), name="admin-performance"),
]
