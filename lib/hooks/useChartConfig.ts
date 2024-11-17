"use client";

import dayjs from "dayjs";
import { ChartOptions } from "chart.js";

import { AccessLogType } from "@/src/lib/types/accessLog";

export const useChartConfig = () => {
  const last28Days = Array.from({ length: 28 }, (_, i) => {
    return dayjs()
      .subtract(27 - i, "day")
      .format("YYYY.MM.DD");
  });

  const getOptions = (title: string): ChartOptions<"line"> => ({
    plugins: {
      title: {
        display: true,
        text: title,
        position: "bottom" as const,
      },
      legend: {
        display: false,
      },
    },
  });

  const getChartData = (accessLogs: AccessLogType[]) => {
    if (!accessLogs?.length) {
      return {
        labels: last28Days,
        datasets: [
          {
            data: Array(28).fill(0),
            borderColor: "#d946ef",
            tension: 0.1,
          },
        ],
      };
    }

    const data = last28Days.map(
      (day) => accessLogs.filter((log) => dayjs(log.createdAt).format("YYYY.MM.DD") === day).length
    );

    return {
      labels: last28Days,
      datasets: [
        {
          data,
          borderColor: "#d946ef",
          tension: 0.1,
        },
      ],
    };
  };

  return {
    getOptions,
    getChartData,
  };
};
