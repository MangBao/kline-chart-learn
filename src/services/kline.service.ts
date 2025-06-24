import { reqGET } from "@/shared/apis/api-client";
import { adaptKlineData } from "@/adapters/kline.adapter";
import type { KlineChartParamsRequest } from "@/types";

class KlineService {
  async getKlineData(params: KlineChartParamsRequest) {
    const rawData = await reqGET("/api/v3/klines", params);
    return adaptKlineData(rawData);
  }
}

const klineService = new KlineService();
export default klineService;
