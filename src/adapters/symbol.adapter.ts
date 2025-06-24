import type { SymbolItem } from "@/types";

export const adaptSymbolData = (raw: any): SymbolItem[] => {
  console.log("Raw symbol data:", raw);

  return raw.symbols
    .filter((item: any) => item.status === "TRADING")
    .map((item: any) => ({
      symbol: item.symbol,
      name: ` ( ${item.baseAsset} )`,
    }));
};
