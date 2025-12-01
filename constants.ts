import type { AlgorithmDetails } from "./types";

// Animation speed in milliseconds (lower = faster)
export const BASE_ANIMATION_SPEED_MS = 15;

// Array value constraints
export const MIN_ARRAY_VALUE = 5;
export const MAX_ARRAY_VALUE = 100;

export const DEFAULT_COLOR = "#0ea5e9"; // sky-500
export const COMPARE_COLOR = "#facc15"; // yellow-400
export const SWAP_COLOR = "#f87171"; // red-400
export const SORTED_COLOR = "#4ade80"; // green-400
export const PIVOT_COLOR = "#a78bfa"; // violet-400

export const THEME_COLORS = {
  light: {
    background: "#f1f5f9", // slate-100
    card: "#ffffff",
    text: "#1e293b", // slate-800
    textSecondary: "#475569", // slate-600
    border: "#cbd5e1", // slate-300
    heading: "#0ea5e9", // sky-500
  },
  dark: {
    background: "#0f172a", // slate-900
    card: "#1e293b", // slate-800
    text: "#f1f5f9", // slate-100
    textSecondary: "#cbd5e1", // slate-300
    border: "#334155", // slate-700
    heading: "#22d3ee", // cyan-400
  },
};

export const ALGORITHMS: AlgorithmDetails[] = [
  {
    name: "Bubble Sort",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    description:
      "Simple comparison-based algorithm that repeatedly swaps adjacent elements if they're in wrong order.",
  },
  {
    name: "Selection Sort",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    description:
      "Divides array into sorted and unsorted sections, repeatedly selecting the minimum element.",
  },
  {
    name: "Insertion Sort",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    description:
      "Builds sorted array one item at a time by inserting each element into its proper position.",
  },
  {
    name: "Merge Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    description:
      "Divide-and-conquer algorithm that splits array into halves, sorts them, and merges back.",
  },
  {
    name: "Quick Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    description:
      "Efficient divide-and-conquer algorithm using a pivot to partition the array.",
  },
  {
    name: "Merge Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
];
