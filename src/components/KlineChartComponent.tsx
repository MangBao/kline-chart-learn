import { useEffect, useRef } from "react";
import { init, dispose, type Chart } from "klinecharts";
import type { KlineChartComponentProps } from "@/types";

const KlineChartComponent = ({
  width = undefined,
  height = 620,
  data,
  indicator,
  subIndicator, // 👈 thêm mới
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

    // Overlay indicator (trên biểu đồ nến, ví dụ: MA, EMA)
    if (indicator) {
      chart.createIndicator(indicator, true, { id: "candle_pane" });
    }

    // Sub-indicator (pane phụ, ví dụ: MACD, RSI, Volume)
    if (subIndicator) {
      chart.createIndicator(subIndicator, false); // không truyền id -> tạo sub pane
    }

    return () => {
      if (containerRef.current) {
        dispose(containerRef.current);
      }
      chartRef.current = null;
    };
  }, [data, indicator, subIndicator]);

  return (
    <div ref={containerRef} className={className} style={{ width, height }} />
  );
};

export default KlineChartComponent;
