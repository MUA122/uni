from rest_framework.throttling import ScopedRateThrottle


class IngestThrottle(ScopedRateThrottle):
    scope = "ingest"


class IngestBurstThrottle(ScopedRateThrottle):
    scope = "ingest_burst"
