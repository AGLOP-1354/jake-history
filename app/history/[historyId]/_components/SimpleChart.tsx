"use client";
import dayjs from "dayjs";

import Chart from "@/src/components/chart";
import { AccessLogType } from "@/src/lib/types/accessLog";

const SimpleChart = ({ accessLogs }: { accessLogs: AccessLogType[] }) => {
  return (
    <Chart
      type="line"
      data={{
        labels: Array.from({ length: 7 }, (_, i) => {
          return dayjs()
            .subtract(6 - i, "day")
            .format("YYYY-MM-DD");
        }),
        datasets: [
          {
            data: Array.from({ length: 7 }, (_, i) => {
              const dateStr = dayjs()
                .subtract(6 - i, "day")
                .format("YYYY-MM-DD");
              return accessLogs.filter((log) => dayjs(log.createdAt).format("YYYY-MM-DD") === dateStr).length;
            }),
            borderColor: "rgba(217, 70, 239, 0.8)",
            tension: 0.4,
            pointStyle: (ctx) => (ctx.dataIndex === 6 ? "circle" : false),
            pointRadius: (ctx) => (ctx.dataIndex === 6 ? 4 : 0),
            pointBackgroundColor: "rgba(217, 70, 239, 0.8)",
            pointBorderColor: "rgba(217, 70, 239, 0.2)",
            pointBorderWidth: 8,
            borderWidth: 1.5,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        maintainAspectRatio: false,
      }}
      height={50}
    />
  );
};

export default SimpleChart;
