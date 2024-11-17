"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { FC } from "react";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

type ChartType = "line" | "bar";

interface ChartProps {
  type?: ChartType;
  data: ChartData<"line" | "bar">;
  options?: ChartOptions<ChartType>;
  height?: number | string;
  width?: number | string;
  className?: string;
}

const hoverLinePlugin = {
  id: "hoverLinePlugin",
  afterDraw(chart) {
    const { ctx, chartArea, tooltip } = chart;

    if (tooltip._active && tooltip._active.length) {
      const activePoint = tooltip._active[0];
      const x = activePoint.element.x;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#d946ef";
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(hoverLinePlugin);

const Chart: FC<ChartProps> = ({ type = "line", data, options, height, width, className }) => {
  const defaultOptions: ChartOptions<typeof type> = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: function (context: any) {
            return context.tick.major ? "rgba(200, 200, 200, 0.2)" : "transparent";
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          callback: function (val, index) {
            return index % 4 === 0 ? this.getLabelForValue(val as number) : "";
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        grid: {
          lineWidth: 0.1,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  } as ChartOptions<typeof type>;

  return (
    <div className={className}>
      {type === "line" ? (
        <Line
          data={data as ChartData<"line">}
          options={mergedOptions as ChartOptions<"line">}
          height={height}
          width={width}
        />
      ) : (
        <Bar
          data={data as ChartData<"bar">}
          options={mergedOptions as ChartOptions<"bar">}
          height={height}
          width={width}
        />
      )}
    </div>
  );
};

export default Chart;
