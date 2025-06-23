import type { KLineData } from "klinecharts";

export interface KlineChartComponentProps {
  width?: number;
  height?: number;
  data: KLineData[];
  className?: string;
}
