import { useEffect, useRef } from "react";
import { init, dispose, type Chart } from "klinecharts";
import type { KlineChartComponentProps } from "@/types";

const KlineChartComponent = ({
  width = undefined,
  height = 485,
  data,
  className = "",
}: KlineChartComponentProps) => {
  const chartRef = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = init(containerRef.current);
    chartRef.current = chart;

    if (!chart) return;

    chart.applyNewData(data);

    return () => {
      if (containerRef.current) {
        dispose(containerRef.current);
      }
      chartRef.current = null;
    };
  }, [data]);

  return (
    <div ref={containerRef} className={className} style={{ width, height }} />
  );
};

export default KlineChartComponent;
