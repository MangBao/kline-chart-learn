// src/component/TimeframeSelector.tsx
import { timeframes } from "@/shared/constants";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const TimeframeSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex space-x-4 bg-white px-2 py-1 rounded shadow-sm">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`text-sm px-2 py-1 rounded 
            ${
              selected === tf
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:text-black"
            }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
