import type { Animation } from "../types";

// Bubble Sort
export const generateBubbleSortAnimations = (array: number[]): Animation[] => {
  const animation: Animation[] = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animation.push({ type: "compare", indices: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        animation.push({
          type: "swap",
          indices: [j, j + 1],
          values: [array[j + 1], array[j]],
        });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      animation.push({ type: "revert", indices: [j, j + 1] });
    }
  }
  return animation;
};

// Selection Sort
export const generateSelectionSortAnimations = (
  array: number[]
): Animation[] => {
  const animations: Animation[] = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: "compare", indices: [minIdx, j] });
      animations.push({ type: "revert", indices: [minIdx, j] });
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    animations.push({
      type: "swap",
      indices: [i, minIdx],
      values: [array[minIdx], array[i]],
    });
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    animations.push({ type: "revert", indices: [i, minIdx] });
  }
  return animations;
};

// Insertion Sort
export const generateInsertionSortAnimations = (
  array: number[]
): Animation[] => {
  const animations: Animation[] = [];
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    animations.push({ type: "compare", indices: [i, j] });
    animations.push({ type: "revert", indices: [i, j] });
    while (j >= 0 && array[j] > key) {
      // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
      animations.push({
        type: "overwrite",
        indices: [j + 1],
        values: [array[j]],
      });
      array[j + 1] = array[j];
      animations.push({ type: "compare", indices: [i, j] });
      animations.push({ type: "revert", indices: [i, j] });
      j = j - 1;
    }
    // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
    animations.push({ type: "overwrite", indices: [j + 1], values: [key] });
    array[j + 1] = key;
  }
  return animations;
};

// Merge Sort
export const generateMergeSortAnimations = (array: number[]): Animation[] => {
  const animations: Animation[] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: Animation[]
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: Animation[]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: "compare", indices: [i, j] });
    animations.push({ type: "revert", indices: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
      animations.push({
        type: "overwrite",
        indices: [k],
        values: [auxiliaryArray[i]],
      });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
      animations.push({
        type: "overwrite",
        indices: [k],
        values: [auxiliaryArray[j]],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: "compare", indices: [i, i] });
    animations.push({ type: "revert", indices: [i, i] });
    // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
    animations.push({
      type: "overwrite",
      indices: [k],
      values: [auxiliaryArray[i]],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: "compare", indices: [j, j] });
    animations.push({ type: "revert", indices: [j, j] });
    // Fix: Changed 'overwrite' animation to use single-element arrays for indices and values.
    animations.push({
      type: "overwrite",
      indices: [k],
      values: [auxiliaryArray[j]],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Quick Sort
export const generateQuickSortAnimations = (array: number[]): Animation[] => {
  const animations: Animation[] = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function quickSortHelper(
  mainArray: number[],
  low: number,
  high: number,
  animations: Animation[]
) {
  if (low < high) {
    const pi = partition(mainArray, low, high, animations);
    quickSortHelper(mainArray, low, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, high, animations);
  }
}

function partition(
  mainArray: number[],
  low: number,
  high: number,
  animations: Animation[]
): number {
  const pivot = mainArray[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push({ type: "compare", indices: [j, high] });
    animations.push({ type: "revert", indices: [j, high] });
    if (mainArray[j] < pivot) {
      i++;
      animations.push({
        type: "swap",
        indices: [i, j],
        values: [mainArray[j], mainArray[i]],
      });
      [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
      animations.push({ type: "revert", indices: [i, j] });
    }
  }
  animations.push({
    type: "swap",
    indices: [i + 1, high],
    values: [mainArray[high], mainArray[i + 1]],
  });
  [mainArray[i + 1], mainArray[high]] = [mainArray[high], mainArray[i + 1]];
  animations.push({ type: "revert", indices: [i + 1, high] });
  return i + 1;
}
