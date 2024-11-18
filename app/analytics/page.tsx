import { notFound } from "next/navigation";

import { getAccessLogs, getMaximumHits } from "@/src/lib/utils/queries/analyticsQueries";
import { getHistories } from "@/src/lib/utils/queries/historyQueries";
import Analytics from "./_components/Analytics";

import classes from "./page.module.css";
import { AccessLogType } from "@/src/lib/types/accessLog";

const AnalyticsWrapper = async () => {
  const [accessLogs, maximumData, historiesResponse] = await Promise.all([
    getAccessLogs(),
    getMaximumHits(),
    getHistories(),
  ]);

  if (!accessLogs || !maximumData || !historiesResponse.success || !historiesResponse.data) {
    notFound();
  }

  const { maximumHits, maximumHitsByHistoryId } = maximumData;
  const histories = historiesResponse.data;

  const accessLogsByHistoryId = accessLogs.reduce<Record<string, AccessLogType[]>>(
    (acc, log) => {
      if (!log.historyId) {
        return {
          ...acc,
          home: [...(acc.home || []), log],
        };
      }

      return {
        ...acc,
        [log.historyId]: [...(acc[log.historyId] || []), log],
      };
    },
    { home: [] }
  );

  return (
    <div className={classes.AnalyticsWrapper}>
      <Analytics
        accessLogs={accessLogsByHistoryId}
        histories={histories}
        maximumHits={maximumHits}
        maximumHitsByHistoryId={maximumHitsByHistoryId}
      />
    </div>
  );
};

export default AnalyticsWrapper;
