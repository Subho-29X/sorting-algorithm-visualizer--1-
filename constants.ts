import type { AlgorithmDetails } from './types';

export const BASE_ANIMATION_SPEED_MS = 15;

export const DEFAULT_COLOR = '#0ea5e9'; // sky-500
export const COMPARE_COLOR = '#facc15'; // yellow-400
export const SWAP_COLOR = '#f87171'; // red-400
export const SORTED_COLOR = '#4ade80'; // green-400

export const ALGORITHMS: AlgorithmDetails[] = [
    {
        name: 'Bubble Sort',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
        },
    },
    {
        name: 'Selection Sort',
        complexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
        },
    },
    {
        name: 'Insertion Sort',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
        },
    },
    {
        name: 'Merge Sort',
        complexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
        },
    },
    {
        name: 'Quick Sort',
        complexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)',
        },
    },
];