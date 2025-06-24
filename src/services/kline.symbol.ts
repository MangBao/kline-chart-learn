import { adaptSymbolData } from "@/adapters/symbol.adapter";
import { reqGET } from "@/shared/apis/api-client";

class SymbolService {
  async getSymbolData() {
    const raw = await reqGET("/api/v3/exchangeInfo");
    console.log("Adapt symbol data:", adaptSymbolData(raw));
    
    return adaptSymbolData(raw);
  }
}

const symbolService = new SymbolService();
export default symbolService;
