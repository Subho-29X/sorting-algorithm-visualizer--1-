import React from "react";
import type { Bar } from "../types";

interface VisualizerProps {
  bars: Bar[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ bars }) => {
  const barWidth = 100 / bars.length;
  const maxValue = Math.max(...bars.map((b) => b.value));
  const minValue = Math.min(...bars.map((b) => b.value));

  return (
    <div className="w-full max-w-7xl h-[60vh] bg-slate-800 p-4 rounded-lg shadow-inner flex items-end justify-start gap-[1px] relative">
      <div className="absolute top-2 left-4 text-slate-400 text-sm">
        Min: {minValue} | Max: {maxValue}
      </div>
      {bars.map((bar, index) => (
        <div
          key={index}
          className="bar transition-all duration-100 ease-linear"
          style={{
            height: `${bar.value}%`,
            width: `${barWidth}%`,
            backgroundColor: bar.color,
            // minWidth:'2px' // uncomment for very small arrays
          }}
          title={`Value: ${bar.value}`}
        ></div>
      ))}
    </div>
  );
};
