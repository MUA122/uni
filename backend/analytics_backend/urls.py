from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT (direct SimpleJWT endpoints)
    path("api/auth/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),

    # Analytics API
    path("api/analytics/", include("analytics.urls")),
]
