import type { IndicatorSelectorProps } from "@/types/Indicator";
import type { FC } from "react";

const indicators = ["", "MA", "EMA", "MACD", "BOLL", "RSI"];

const IndicatorSelector: FC<IndicatorSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <select
      className="select select-bordered"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {indicators.map((ind) => (
        <option key={ind} value={ind}>
          {ind || "None"}
        </option>
      ))}
    </select>
  );
};

export default IndicatorSelector;
