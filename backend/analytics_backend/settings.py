from __future__ import annotations

import os
from urllib.parse import urlparse, parse_qs
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "unsafe-dev-key")
DEBUG = os.environ.get("DJANGO_DEBUG", "false").lower() == "true"

ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ.get("DJANGO_ALLOWED_HOSTS", "*").split(",")
    if host.strip()
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "analytics",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "analytics_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

WSGI_APPLICATION = "analytics_backend.wsgi.application"
ASGI_APPLICATION = "analytics_backend.asgi.application"

# -------------------------
# Database (DATABASE_URL > env vars > SQLite)
# -------------------------
DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
DB_ENGINE = os.environ.get("DJANGO_DB_ENGINE", "django.db.backends.sqlite3").strip()

if DATABASE_URL:
    parsed = urlparse(DATABASE_URL)
    scheme = parsed.scheme.split("+")[0]
    if scheme in ("postgres", "postgresql", "psql"):
        engine = "django.db.backends.postgresql"
    elif scheme == "mysql":
        engine = "django.db.backends.mysql"
    elif scheme == "sqlite":
        engine = "django.db.backends.sqlite3"
    else:
        engine = "django.db.backends.postgresql"

    db_config = {
        "ENGINE": engine,
        "NAME": parsed.path.lstrip("/") or "postgres",
        "USER": parsed.username or "",
        "PASSWORD": parsed.password or "",
        "HOST": parsed.hostname or "",
        "PORT": str(parsed.port or ""),
    }

    query = parse_qs(parsed.query)
    if "sslmode" in query:
        db_config["OPTIONS"] = {"sslmode": query["sslmode"][0]}

    DATABASES = {"default": db_config}
elif DB_ENGINE == "django.db.backends.postgresql":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("DJANGO_DB_NAME", "uni_analytics_db"),
            "USER": os.environ.get("DJANGO_DB_USER", "postgres"),
            "PASSWORD": os.environ.get("DJANGO_DB_PASSWORD", ""),
            "HOST": os.environ.get("DJANGO_DB_HOST", "127.0.0.1"),
            "PORT": os.environ.get("DJANGO_DB_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -------------------------
# DRF + JWT + throttles
# -------------------------
DEFAULT_INGEST = os.environ.get("ANALYTICS_THROTTLE_INGEST", "120/min")
DEFAULT_INGEST_BURST = os.environ.get("ANALYTICS_THROTTLE_INGEST_BURST", "300/min")

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_THROTTLE_CLASSES": (
        "rest_framework.throttling.ScopedRateThrottle",
    ),
    "DEFAULT_THROTTLE_RATES": {
        "ingest": DEFAULT_INGEST,
        "ingest_burst": DEFAULT_INGEST_BURST,
    },
}

# -------------------------
# CORS
# -------------------------
CORS_ALLOW_ALL_ORIGINS = os.environ.get("CORS_ALLOW_ALL_ORIGINS", "false").lower() == "true"
default_cors = ["http://localhost:5173"]
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ALLOWED_ORIGINS", ",".join(default_cors)).split(",")
    if origin.strip()
]

# -------------------------
# Analytics config
# -------------------------
ANALYTICS_ALLOWED_RANGES = {
    "today": 1,
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365,
}
ANALYTICS_DEFAULT_RANGE = "30d"

ANALYTICS_RETENTION_DAYS = int(os.environ.get("ANALYTICS_RETENTION_DAYS", "365"))

# Support BOTH env var names:
# - older: ANALYTICS_ROLLUP_ENABLED
# - render screenshot: ANALYTICS_USE_ROLLUPS
_rollup_env = os.environ.get("ANALYTICS_ROLLUP_ENABLED", "").strip()
if not _rollup_env:
    _rollup_env = os.environ.get("ANALYTICS_USE_ROLLUPS", "true").strip()
ANALYTICS_ROLLUP_ENABLED = _rollup_env.lower() == "true"

# Optional GeoIP path (will be empty on free tier unless you mount a disk/file)
ANALYTICS_GEOIP_CITY_MMDB = os.environ.get("ANALYTICS_GEOIP_CITY_MMDB", "")

# Ingestion protection (shared secret header)
ANALYTICS_INGEST_KEY = os.environ.get("ANALYTICS_INGEST_KEY", "")
