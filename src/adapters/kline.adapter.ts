import type { KLineData } from "klinecharts";

export const adaptKlineData = (rawData: any[]): KLineData[] => {
  return rawData.map((item) => ({
    timestamp: item[0],
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
    volume: parseFloat(item[5]),
  }));
};
