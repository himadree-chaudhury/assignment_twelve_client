import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangeInput = ({
  label,
  min,
  max,
  step,
  defaultMin,
  defaultMax,
  onChange,
}) => {
  const [range, setRange] = useState([defaultMin, defaultMax]);

  const handleChange = (newRange) => {
    setRange(newRange);
    if (onChange) onChange({ min: newRange[0], max: newRange[1] });
  };

  return (
    <div className="w-full max-w-xs">
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={range}
        onChange={handleChange}
        railStyle={{ backgroundColor: "#e5e7eb", height: "4px" }}
        trackStyle={[{ backgroundColor: "oklch(58.87% 0.246 347.77)" }]}
        handleStyle={[
          {
            borderColor: "oklch(58.87% 0.246 347.77)",
            backgroundColor: "oklch(58.87% 0.246 347.77)",
            width: "16px",
            height: "16px",
            marginTop: "-6px",
          },
          {
            borderColor: "oklch(58.87% 0.246 347.77)",
            backgroundColor: "oklch(58.87% 0.246 347.77)",
            width: "16px",
            height: "16px",
            marginTop: "-6px",
          },
        ]}
        className="mb-1"
      />
      <p className="mb-2 flex justify-between text-xs">
        <span>{min}</span>
        <span>{max}</span>
      </p>
      <p className="text-sm font-medium">
        {label}: {range[0]} - {range[1]}
      </p>
    </div>
  );
};

export default RangeInput;
