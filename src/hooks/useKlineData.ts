import { useQuery } from "@tanstack/react-query";
import klineService from "@/services/kline.service";
import type { KLineData } from "klinecharts";

export const useKlineData = () => {
  return useQuery<KLineData[]>({
    queryKey: ["kline-data"],
    queryFn: () => klineService.getKlineData(),
  });
};
