import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Visit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("session_id", models.UUIDField(db_index=True, default=uuid.uuid4, unique=True)),
                ("visitor_id", models.UUIDField(db_index=True)),
                ("started_at", models.DateTimeField()),
                ("ended_at", models.DateTimeField(blank=True, null=True)),
                ("referrer", models.TextField(blank=True, default="")),
                ("landing_path", models.CharField(blank=True, default="", max_length=500)),
                ("utm_source", models.CharField(blank=True, default="", max_length=200)),
                ("utm_medium", models.CharField(blank=True, default="", max_length=200)),
                ("utm_campaign", models.CharField(blank=True, default="", max_length=200)),
                ("utm_term", models.CharField(blank=True, default="", max_length=200)),
                ("utm_content", models.CharField(blank=True, default="", max_length=200)),
                (
                    "device_type",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("mobile", "Mobile"),
                            ("desktop", "Desktop"),
                            ("tablet", "Tablet"),
                            ("other", "Other"),
                        ],
                        default="",
                        max_length=20,
                    ),
                ),
                ("browser", models.CharField(blank=True, default="", max_length=120)),
                ("os", models.CharField(blank=True, default="", max_length=120)),
                ("language", models.CharField(blank=True, default="", max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "indexes": [
                    models.Index(fields=["started_at"], name="analytics_v_started_eb50d2_idx"),
                    models.Index(fields=["visitor_id"], name="analytics_v_visitor_1fdfcb_idx"),
                ],
            },
        ),
        migrations.CreateModel(
            name="DailyRollup",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(db_index=True)),
                ("path", models.CharField(db_index=True, max_length=500)),
                ("sessions", models.PositiveIntegerField(default=0)),
                ("unique_visitors", models.PositiveIntegerField(default=0)),
                ("pageviews", models.PositiveIntegerField(default=0)),
                ("avg_duration_ms", models.FloatField(default=0)),
                ("avg_scroll", models.FloatField(default=0)),
                ("conversions", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "unique_together": {("date", "path")},
            },
        ),
        migrations.CreateModel(
            name="ErrorLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("path", models.CharField(blank=True, default="", max_length=500)),
                ("message", models.TextField()),
                ("stack", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "visit",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="errors", to="analytics.visit"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("category", models.CharField(db_index=True, max_length=120)),
                ("action", models.CharField(max_length=120)),
                ("label", models.CharField(blank=True, default="", max_length=200)),
                ("value", models.FloatField(blank=True, null=True)),
                ("path", models.CharField(blank=True, default="", max_length=500)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "visit",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="events", to="analytics.visit"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PageView",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("path", models.CharField(db_index=True, max_length=500)),
                ("title", models.CharField(blank=True, default="", max_length=300)),
                ("duration_ms", models.PositiveIntegerField(blank=True, null=True)),
                ("scroll_depth", models.PositiveIntegerField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "visit",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="pageviews", to="analytics.visit"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Performance",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("path", models.CharField(db_index=True, max_length=500)),
                ("ttfb_ms", models.FloatField(blank=True, null=True)),
                ("fcp_ms", models.FloatField(blank=True, null=True)),
                ("lcp_ms", models.FloatField(blank=True, null=True)),
                ("cls", models.FloatField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "visit",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="performance", to="analytics.visit"),
                ),
            ],
        ),
    ]
