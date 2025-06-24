import type { KLineData } from "klinecharts";

export interface KlineChartComponentProps {
  width?: number;
  height?: number;
  data: KLineData[];
  className?: string;
  indicator?: string;
  subIndicator?: string;
}

export interface KlineChartParamsRequest {
  symbol?: string;
  interval?: string;
  limit?: number;
}
