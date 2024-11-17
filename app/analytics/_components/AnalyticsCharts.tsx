"use client";

import Chart from "@/src/components/chart";
import { useChartConfig } from "@/src/lib/hooks/useChartConfig";
import { AccessLogType } from "@/src/lib/types/accessLog";
import { HistoryType } from "@/src/lib/types/history";
import classes from "../_styles/analytics.module.css";

type Props = {
  accessLogs: Record<string, AccessLogType[]>;
  histories: HistoryType[];
};

const AnalyticsCharts = ({ accessLogs, histories }: Props) => {
  const { getHistoryChartData, getOptions } = useChartConfig(histories);

  const historyAccessLogs = Object.entries(accessLogs).reduce<AccessLogType[]>((acc, [logName, logs]) => {
    if (logName === "home") return acc;
    return [...acc, ...logs];
  }, []);

  return (
    <div className={classes.chartContainer}>
      <Chart
        type="line"
        data={getHistoryChartData(historyAccessLogs, false)}
        options={getOptions("hits history")}
        className={classes.chartItem}
      />
      <Chart
        type="line"
        data={getHistoryChartData(accessLogs.home, true)}
        options={getOptions("hits users")}
        className={classes.chartItem}
      />
    </div>
  );
};

export default AnalyticsCharts;
