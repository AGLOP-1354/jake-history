"use client";

import Chart from "@/src/components/chart";
import { useChartConfig } from "@/src/lib/hooks/useChartConfig";
import { AccessLogType } from "@/src/lib/types/accessLog";
import classes from "../_styles/analytics.module.css";

type Props = {
  accessLogs: Record<string, AccessLogType[]>;
};

const AnalyticsCharts = ({ accessLogs }: Props) => {
  const { getChartData, getOptions } = useChartConfig();

  return (
    <div className={classes.chartContainer}>
      <Chart
        type="line"
        data={getChartData(accessLogs.home)}
        options={getOptions("hits history")}
        className={classes.chartItem}
      />
      <Chart
        type="line"
        data={getChartData(accessLogs.home)}
        options={getOptions("hits users")}
        className={classes.chartItem}
      />
    </div>
  );
};

export default AnalyticsCharts;
