export type Algorithm = 'Bubble Sort' | 'Selection Sort' | 'Insertion Sort' | 'Merge Sort' | 'Quick Sort';

export interface Bar {
    value: number;
    color: string;
}

// Fix: Use number[] for indices and values to be more flexible for different animation types.
export interface Animation {
    type: 'compare' | 'swap' | 'revert' | 'overwrite';
    indices: number[];
    values?: number[];
}

export interface AlgorithmDetails {
    name: Algorithm;
    complexity: {
        best: string;
        average: string;
        worst: string;
    };
}