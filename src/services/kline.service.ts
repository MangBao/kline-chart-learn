import { reqGET } from "@/shared/apis/api-client";
import { env } from "@/shared/constants/env";

class KlineService {
  getKlineData() {
    return reqGET("/datas/kline.json", undefined, {
      customBaseURL: env.KLINE_API_URL,
    });
  }
}

const klineService = new KlineService();
export default klineService;
