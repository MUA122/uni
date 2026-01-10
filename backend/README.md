# Analytics backend (Django)

This service collects anonymous website analytics and exposes admin-only reporting endpoints.

## Quick setup
1) Create a virtual environment and install deps:
   - `pip install -r requirements.txt`
2) Configure environment variables (examples):
   - `DJANGO_SECRET_KEY=change-me`
   - `DJANGO_DEBUG=true`
   - `DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1`
   - `CORS_ALLOWED_ORIGINS=https://uni-rc9t.vercel.app`
   - `ANALYTICS_RETENTION_DAYS=365`
3) Run migrations and create an admin user:
   - `python manage.py migrate`
   - `python manage.py createsuperuser`
4) Start the server:
   - `python manage.py runserver`

## Auth
Admin endpoints use JWT:
- `POST /api/auth/token` with `{ "username": "...", "password": "..." }`
- `POST /api/auth/token/refresh`
Alternate login wrapper:
- `POST /api/analytics/auth/login` with `{ "username": "...", "password": "..." }`

Include `Authorization: Bearer <access>` for admin endpoints.

## Ingestion endpoints (AllowAny)
- `POST /api/analytics/visit/start`
- `POST /api/analytics/visit/end`
- `POST /api/analytics/pageview`
- `POST /api/analytics/event`
- `POST /api/analytics/perf`
- `POST /api/analytics/error`
All ingestion requests must include `X-Analytics-Key` when `ANALYTICS_INGEST_KEY` is set.

## Admin reporting (JWT required)
- `GET /api/analytics/admin/overview?range=30d`
- `GET /api/analytics/admin/timeseries?metric=sessions&range=30d`
- `GET /api/analytics/admin/top-pages?range=30d`
- `GET /api/analytics/admin/referrers?range=30d`
- `GET /api/analytics/admin/geo?range=30d`
- `GET /api/analytics/admin/devices?range=30d`
- `GET /api/analytics/admin/conversions?range=30d`
- `GET /api/analytics/admin/performance?range=30d`

Supported ranges: `today`, `7d`, `30d`, `90d`, `1y`.

## Geo (consent-based)
Perform geo lookup on the client after the user consents, then send `country`/`city`
in `visit/start`. No IPs are stored server-side.

## Ingestion security (recommended)
Set a shared secret on the backend:
- `ANALYTICS_INGEST_KEY=your-secret`

Then set the frontend build env var:
- `VITE_ANALYTICS_INGEST_KEY=your-secret`

All ingestion calls will include `X-Analytics-Key`.

## Retention
Run `python manage.py purge_old_analytics` on a daily cron to delete data older than the retention window.

## Rate limiting
Default ingestion throttles are:
- `ingest`: 120 requests/minute
- `ingest_burst`: 300 requests/minute

Adjust via `DEFAULT_THROTTLE_RATES` in `analytics_backend/settings.py`.

## Daily rollups (optional)
Enable with `ANALYTICS_ROLLUP_ENABLED=true` (default). Run daily:
- `python manage.py rollup_daily_analytics`
Use `--date=YYYY-MM-DD` to backfill a specific day.
