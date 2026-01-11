from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("analytics", "0002_visit_geo_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="visit",
            name="client_country",
            field=models.CharField(blank=True, default="", max_length=64),
        ),
        migrations.AddField(
            model_name="visit",
            name="client_city",
            field=models.CharField(blank=True, default="", max_length=128),
        ),
        migrations.AddField(
            model_name="visit",
            name="geoip_country",
            field=models.CharField(blank=True, default="", max_length=64),
        ),
        migrations.AddField(
            model_name="visit",
            name="geoip_city",
            field=models.CharField(blank=True, default="", max_length=128),
        ),
    ]
