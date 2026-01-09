import { useEffect } from "react";

import { endVisit, startVisitIfNeeded } from "../../analytics/analyticsClient";

export default function AnalyticsTracker() {
  useEffect(() => {
    startVisitIfNeeded();
    const handleUnload = () => {
      void endVisit();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
}
