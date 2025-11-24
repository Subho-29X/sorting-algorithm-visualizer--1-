import React, { useState, useEffect, useCallback, useRef } from "react";
import { Controls } from "./components/Controls";
import { Visualizer } from "./components/Visualizer";
import { ComplexityInfo } from "./components/ComplexityInfo";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./contexts/ThemeContext";
import { generateBubbleSortAnimations } from "./services/sortingService";
import { generateSelectionSortAnimations } from "./services/sortingService";
import { generateInsertionSortAnimations } from "./services/sortingService";
import { generateMergeSortAnimations } from "./services/sortingService";
import { generateQuickSortAnimations } from "./services/sortingService";
import type { Algorithm, Bar, Animation } from "./types";
import {
  ALGORITHMS,
  DEFAULT_COLOR,
  COMPARE_COLOR,
  SWAP_COLOR,
  SORTED_COLOR,
  BASE_ANIMATION_SPEED_MS,
  THEME_COLORS,
  MIN_ARRAY_VALUE,
  MAX_ARRAY_VALUE,
} from "./constants";

const App: React.FC = () => {
  const { theme } = useTheme();
  const themeColors = THEME_COLORS[theme];

  const [arraySize, setArraySize] = useState<number>(50);
  const [bars, setBars] = useState<Bar[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("Bubble Sort");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [comparisonCount, setComparisonCount] = useState<number>(0);
  // Fix: Changed NodeJS.Timeout to number for browser compatibility.
  const timeoutIdsRef = useRef<number[]>([]);

  const stopSorting = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    setIsSorting(false);
    // Reset colors to default to indicate the process has stopped
    setBars((prevBars) =>
      prevBars.map((bar) => ({ ...bar, color: DEFAULT_COLOR }))
    );
  }, []);

  const resetArray = useCallback(() => {
    // Stop any ongoing sort before resetting
    stopSorting();

    const newArray: Bar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value:
          Math.floor(Math.random() * (MAX_ARRAY_VALUE - MIN_ARRAY_VALUE + 1)) +
          MIN_ARRAY_VALUE,
        color: DEFAULT_COLOR,
      });
    }
    setBars(newArray);
    setIsSorted(false);
    setComparisonCount(0);
  }, [arraySize, stopSorting]);

  useEffect(() => {
    resetArray();
  }, [arraySize, resetArray]);

  const animateSort = (animations: Animation[]) => {
    setIsSorting(true);
    const delay = BASE_ANIMATION_SPEED_MS / speed;

    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        setBars((prevBars) => {
          const newBars = [...prevBars];
          const { type, indices, values } = animation;

          if (type === "compare") {
            const [idx1, idx2] = indices;
            if (newBars[idx1])
              newBars[idx1] = { ...newBars[idx1], color: COMPARE_COLOR };
            if (idx2 < newBars.length && newBars[idx2])
              newBars[idx2] = { ...newBars[idx2], color: COMPARE_COLOR };
            setComparisonCount((prev) => prev + 1);
          } else if (type === "revert") {
            const [idx1, idx2] = indices;
            if (newBars[idx1])
              newBars[idx1] = { ...newBars[idx1], color: DEFAULT_COLOR };
            if (idx2 < newBars.length && newBars[idx2])
              newBars[idx2] = { ...newBars[idx2], color: DEFAULT_COLOR };
          } else if (type === "swap") {
            const [idx1, idx2] = indices;
            const [val1, val2] = values!;
            if (newBars[idx1])
              newBars[idx1] = { value: val1, color: SWAP_COLOR };
            if (newBars[idx2])
              newBars[idx2] = { value: val2, color: SWAP_COLOR };
          } else if (type === "overwrite") {
            const [idx] = indices;
            const [val] = values!;
            if (newBars[idx]) newBars[idx] = { value: val, color: SWAP_COLOR };
          }

          return newBars;
        });
      }, i * delay);
      timeoutIdsRef.current.push(timeoutId);
    });

    const finishTimeout = setTimeout(() => {
      finishAnimation();
    }, animations.length * delay);
    timeoutIdsRef.current.push(finishTimeout);
  };

  const finishAnimation = () => {
    const delay = BASE_ANIMATION_SPEED_MS / speed / 2.0;

    bars.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setBars((currentBars) => {
          const newBars = [...currentBars];
          if (newBars[index]) {
            newBars[index] = { ...newBars[index], color: SORTED_COLOR };
          }
          return newBars;
        });
      }, index * delay);
      timeoutIdsRef.current.push(timeoutId);
    });

    const finalTimeout = setTimeout(() => {
      setIsSorting(false);
      setIsSorted(true);
      timeoutIdsRef.current = [];
    }, bars.length * delay + 500);
    timeoutIdsRef.current.push(finalTimeout);
  };
  // const refresh = setTimeout(() => {
  //     setIsSorting(false);
  //     setIsSorted(true);
  //     timeoutIdsRef.current = [];
  //   }, bars.length * delay + 500);
  //   timeoutIdsRef.current.push(finalTimeout);
  // };

  const startSorting = () => {
    if (isSorting) return;

    // Clean up previous timeouts just in case
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];

    // Reset colors before starting
    setBars(bars.map((b) => ({ ...b, color: DEFAULT_COLOR })));
    setIsSorted(false);
    setComparisonCount(0);

    const arrayValues = bars.map((bar) => bar.value);
    let animations: Animation[] = [];

    switch (selectedAlgorithm) {
      case "Bubble Sort":
        animations = generateBubbleSortAnimations(arrayValues);
        break;
      case "Selection Sort":
        animations = generateSelectionSortAnimations(arrayValues);
        break;
      case "Insertion Sort":
        animations = generateInsertionSortAnimations(arrayValues);
        break;
      case "Merge Sort":
        animations = generateMergeSortAnimations(arrayValues);
        break;
      case "Quick Sort":
        animations = generateQuickSortAnimations(arrayValues);
        break;
      default:
        break;
    }
    animateSort(animations);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-4 font-sans transition-colors duration-300"
      style={{ backgroundColor: themeColors.background }}
    >
      <header className="w-full max-w-7xl mb-4 relative">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <h1 
          className="text-3xl md:text-4xl font-bold text-center tracking-wider"
          style={{ color: themeColors.heading }}
        >
          Sorting Algorithm Visualizer
        </h1>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: themeColors.textSecondary }}
        >
          Tip: Press <span className="font-mono">T</span> to toggle theme
        </p>
      </header>
      <Controls
        arraySize={arraySize}
        onSizeChange={setArraySize}
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        onStart={startSorting}
        onReset={resetArray}
        onStop={stopSorting}
        isSorting={isSorting}
        speed={speed}
        onSpeedChange={setSpeed}
      />
      <Visualizer bars={bars} />
      {(isSorting || isSorted) && (
        <div
          className="mt-4 text-center text-lg font-semibold"
          style={{ color: themeColors.text }}
        >
          Comparisons: {comparisonCount}
        </div>
      )}
      {isSorted && <ComplexityInfo algorithm={selectedAlgorithm} />}
    </div>
  );
};

export default App;
