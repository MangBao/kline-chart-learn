import { subIndicators } from "@/shared/constants";
import type { SubIndicatorSelectorProps } from "@/types/Indicator";
import type { FC } from "react";

const SubIndicatorSelector: FC<SubIndicatorSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <select
      className="select select-bordered"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {subIndicators.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SubIndicatorSelector;
