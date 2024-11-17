import { notFound } from "next/navigation";

import { getFetch } from "@/src/lib/customFetch";
import { AccessLogType, MaximumHitsType, MaximumHitsByHistoryIdType } from "@/src/lib/types/accessLog";
import { HistoryType } from "@/src/lib/types/history";
import Analytics from "./_components/Analytics";

import classes from "./page.module.css";

const AnalyticsWrapper = async () => {
  const accessLogs: AccessLogType[] = await getFetch({
    url: "/api/log",
    options: { cache: "no-store" },
  });

  if (!accessLogs) {
    notFound();
  }

  const {
    maximumHits,
    maximumHitsByHistoryId,
  }: {
    maximumHits: MaximumHitsType;
    maximumHitsByHistoryId: MaximumHitsByHistoryIdType;
  } = await getFetch({
    url: "/api/log/maximum",
    options: { cache: "no-store" },
  });

  const histories: HistoryType[] = await getFetch({ url: "/api/history" });

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
