import { useQuery } from "@tanstack/react-query";
import symbolService from "@/services/kline.symbol";

export const useSymbolData = () => {
  return useQuery({
    queryKey: ["symbol-data"],
    queryFn: () => symbolService.getSymbolData(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
