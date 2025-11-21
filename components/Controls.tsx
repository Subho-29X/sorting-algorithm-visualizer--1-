import React from "react";
import type { Algorithm } from "../types";
import { ALGORITHMS, THEME_COLORS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

interface ControlsProps {
  arraySize: number;
  onSizeChange: (size: number) => void;
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  onStart: () => void;
  onReset: () => void;
  onStop: () => void;
  isSorting: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  arraySize,
  onSizeChange,
  selectedAlgorithm,
  onAlgorithmChange,
  onStart,
  onReset,
  onStop,
  isSorting,
  speed,
  onSpeedChange,
}) => {
  const { theme } = useTheme();
  const themeColors = THEME_COLORS[theme];

  return (
    <div
      className="w-full max-w-7xl p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 mb-4 transition-colors duration-300"
      style={{ backgroundColor: themeColors.card }}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <label
            htmlFor="size"
            className="whitespace-nowrap font-medium"
            style={{ color: themeColors.text }}
          >
            Array Size:
          </label>
          <input
            id="size"
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            disabled={isSorting}
            className="w-36 md:w-48 h-2 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-cyan-500"
            style={{
              backgroundColor: theme === "dark" ? "#334155" : "#cbd5e1",
            }}
          />
          <span
            className="font-mono w-8 text-center"
            style={{ color: themeColors.heading }}
          >
            {arraySize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="algorithm"
            className="whitespace-nowrap font-medium"
            style={{ color: themeColors.text }}
          >
            Algorithm:
          </label>
          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
            disabled={isSorting}
            className="text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            style={{
              backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
              color: themeColors.text,
              borderColor: themeColors.border,
            }}
          >
            {ALGORITHMS.map((alg) => (
              <option key={alg.name} value={alg.name}>
                {alg.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="speed"
            className="whitespace-nowrap font-medium"
            style={{ color: themeColors.text }}
          >
            Speed:
          </label>
          <select
            id="speed"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            disabled={isSorting}
            className="text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            style={{
              backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
              color: themeColors.text,
              borderColor: themeColors.border,
            }}
          >
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          disabled={isSorting}
          className="px-6 py-2.5 text-white font-semibold rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          style={{
            backgroundColor: theme === "dark" ? "#475569" : "#94a3b8",
            opacity: isSorting ? 0.5 : 1,
          }}
        >
          Reset
        </button>
        <button
          onClick={isSorting ? onStop : onStart}
          className={`px-6 py-2.5 text-white font-bold rounded-md transition-colors duration-200 w-24 text-center ${
            isSorting
              ? "bg-red-600 hover:bg-red-500"
              : "bg-cyan-600 hover:bg-cyan-500"
          }`}
        >
          {isSorting ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};
