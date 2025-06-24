import { useQuery } from "@tanstack/react-query";
import klineService from "@/services/kline.service";
import type { KLineData } from "klinecharts";
import type { KlineChartParamsRequest } from "@/types";

export const useKlineData = (params: KlineChartParamsRequest) => {
  return useQuery<KLineData[]>({
    queryKey: ["kline-data", params], // phân biệt cache theo param
    queryFn: () => klineService.getKlineData(params),
    enabled: !!params?.symbol, // tránh gọi API khi chưa đủ param
  });
};
