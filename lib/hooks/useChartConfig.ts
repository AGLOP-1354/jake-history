import dayjs from "dayjs";
import { ChartOptions } from "chart.js";
import { HistoryType } from "@/src/lib/types/history";
import { AccessLogType } from "@/src/lib/types/accessLog";

const DAYS_TO_SHOW = 28;
const DEFAULT_COLOR = "#d946ef";

export const useChartConfig = (histories: HistoryType[]) => {
  const generateDateLabels = () =>
    Array.from({ length: DAYS_TO_SHOW }, (_, i) =>
      dayjs()
        .subtract(DAYS_TO_SHOW - 1 - i, "day")
        .format("YYYY.MM.DD")
    );

  const createDefaultDataset = (labels: string[]) => ({
    labels,
    datasets: [
      {
        data: Array(DAYS_TO_SHOW).fill(0),
        borderColor: DEFAULT_COLOR,
        tension: 0.1,
      },
    ],
  });

  const countLogsForDay = (logs: AccessLogType[], day: string, historyId?: string) =>
    logs.filter(
      (log) => dayjs(log.createdAt).format("YYYY.MM.DD") === day && (!historyId || log.historyId === historyId)
    ).length;

  const createHistoryDataset = (history: HistoryType, labels: string[], logs: AccessLogType[]) => ({
    data: labels.map((day) => countLogsForDay(logs, day, history.id)),
    borderColor: history.category?.color,
    borderDash: [5, 5],
    borderWidth: 1,
    tension: 0.1,
    backgroundColor: "transparent",
    borderCapStyle: "round",
    opacity: 0.6,
  });

  const getOptions = (title: string): ChartOptions<"line"> => ({
    plugins: {
      title: {
        display: true,
        text: title,
        position: "bottom" as const,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label(tooltipItem) {
            if (tooltipItem.datasetIndex !== 0) return "";
            return `${tooltipItem.dataset.label || ""}: ${tooltipItem.raw || 0}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  });

  const getHistoryChartData = (accessLogs: AccessLogType[], noSubDataSets?: boolean) => {
    const labels = generateDateLabels();

    if (!accessLogs?.length) {
      return createDefaultDataset(labels);
    }

    const uniqueHistories = Array.from(
      new Map(
        histories.filter((history) => history.category?.id).map((history) => [history.category!.id, history])
      ).values()
    );

    let historySets: any[] = [];
    if (!noSubDataSets) {
      historySets = uniqueHistories.map((history) => createHistoryDataset(history, labels, accessLogs));
    }

    return {
      labels,
      datasets: [
        {
          label: "전체",
          data: labels.map((day) => countLogsForDay(accessLogs, day)),
          borderColor: DEFAULT_COLOR,
          tension: 0.1,
        },
        ...historySets,
      ],
    };
  };

  return {
    getOptions,
    getHistoryChartData,
  };
};
