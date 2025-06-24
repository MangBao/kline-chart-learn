import { useState } from "react";
import KlineChartComponent from "@components/KlineChartComponent";
import TimeframeSelector from "@components/TimeframeSelector";
import SymbolsPopupSelector from "@components/SympolsPopupSelector";
import { useKlineData } from "@/hooks/useKlineData";
import { useSymbolData } from "@/hooks/useSymbolData";

const KlineChartContainer = () => {
  const [timeframe, setTimeframe] = useState("15m");
  const { data: symbolsData = [] } = useSymbolData();
  const [symbol, setSymbol] = useState(
    symbolsData.find((s) => s.symbol === "BTCUSDT")?.symbol || "BTCUSDT"
  );

  const { data, isLoading } = useKlineData({
    symbol,
    interval: timeframe,
    limit: 100,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SymbolsPopupSelector
          symbols={symbolsData}
          selected={symbol}
          onSelect={setSymbol}
        />
        <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : (
        <KlineChartComponent data={data ?? []} />
      )}
    </div>
  );
};

export default KlineChartContainer;
