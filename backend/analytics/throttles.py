from rest_framework.throttling import AnonRateThrottle


class IngestThrottle(AnonRateThrottle):
    scope = "ingest"


class IngestBurstThrottle(AnonRateThrottle):
    scope = "ingest_burst"
