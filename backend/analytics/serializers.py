from rest_framework import serializers


class VisitStartSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    visitor_id = serializers.UUIDField()
    started_at = serializers.DateTimeField(required=False)
    referrer = serializers.CharField(required=False, allow_blank=True)
    landing_path = serializers.CharField(required=False, allow_blank=True)
    utm_source = serializers.CharField(required=False, allow_blank=True)
    utm_medium = serializers.CharField(required=False, allow_blank=True)
    utm_campaign = serializers.CharField(required=False, allow_blank=True)
    utm_term = serializers.CharField(required=False, allow_blank=True)
    utm_content = serializers.CharField(required=False, allow_blank=True)
    device_type = serializers.CharField(required=False, allow_blank=True)
    browser = serializers.CharField(required=False, allow_blank=True)
    os = serializers.CharField(required=False, allow_blank=True)
    language = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)


class VisitEndSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    ended_at = serializers.DateTimeField(required=False)


class PageViewSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    visitor_id = serializers.UUIDField()
    path = serializers.CharField()
    title = serializers.CharField(required=False, allow_blank=True)
    duration_ms = serializers.IntegerField(required=False, min_value=0)
    scroll_depth = serializers.IntegerField(required=False, min_value=0)
    created_at = serializers.DateTimeField(required=False)


class EventSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    visitor_id = serializers.UUIDField()
    category = serializers.CharField()
    action = serializers.CharField()
    label = serializers.CharField(required=False, allow_blank=True)
    value = serializers.FloatField(required=False)
    path = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)


class PerformanceSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    visitor_id = serializers.UUIDField()
    path = serializers.CharField()
    ttfb_ms = serializers.FloatField(required=False)
    fcp_ms = serializers.FloatField(required=False)
    lcp_ms = serializers.FloatField(required=False)
    cls = serializers.FloatField(required=False)
    created_at = serializers.DateTimeField(required=False)


class ErrorLogSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    visitor_id = serializers.UUIDField()
    path = serializers.CharField(required=False, allow_blank=True)
    message = serializers.CharField()
    stack = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required=False)
