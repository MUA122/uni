import { useEffect } from "react";

import { startVisitIfNeeded } from "../../analytics/analyticsClient";

export default function AnalyticsTracker() {
  useEffect(() => {
    startVisitIfNeeded();
  }, []);

  return null;
}
