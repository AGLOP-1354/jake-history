"use client";

import { useAnalyticsData } from "@/src/lib/hooks/useAnalyticsData";
import { AccessLogType, MaximumHitsType, MaximumHitsByHistoryIdType } from "@/src/lib/types/accessLog";
import { HistoryType } from "@/src/lib/types/history";

import StatisticsPanel from "./StatisticsPanel";
import AnalyticsCharts from "./AnalyticsCharts";

import classes from "../_styles/analytics.module.css";

type Props = {
  accessLogs: Record<string, AccessLogType[]>;
  histories: HistoryType[];
  maximumHits: MaximumHitsType;
  maximumHitsByHistoryId: MaximumHitsByHistoryIdType;
};

const Analytics = ({ accessLogs, histories, maximumHits, maximumHitsByHistoryId }: Props) => {
  const { totalAccessLogs, totalUsers, maximumHitsByHistoryIdTitle } = useAnalyticsData({
    accessLogs,
    histories,
    maximumHitsByHistoryId,
  });

  return (
    <div className={classes.Analytics}>
      <StatisticsPanel
        totalAccessLogs={totalAccessLogs}
        totalUsers={totalUsers}
        maximumHits={maximumHits}
        maximumHitsByHistoryId={maximumHitsByHistoryId}
        maximumHitsByHistoryIdTitle={maximumHitsByHistoryIdTitle}
      />

      <AnalyticsCharts accessLogs={accessLogs} histories={histories} />
    </div>
  );
};

export default Analytics;
