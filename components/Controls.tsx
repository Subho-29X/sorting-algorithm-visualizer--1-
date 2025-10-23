import React from 'react';
import type { Algorithm } from '../types';
import { ALGORITHMS } from '../constants';

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
    return (
        <div className="w-full max-w-7xl bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-wrap justify-center">
                <div className="flex items-center gap-2">
                    <label htmlFor="size" className="whitespace-nowrap font-medium text-slate-300">Array Size:</label>
                    <input
                        id="size"
                        type="range"
                        min="10"
                        max="100"
                        value={arraySize}
                        onChange={(e) => onSizeChange(Number(e.target.value))}
                        disabled={isSorting}
                        className="w-36 md:w-48 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-cyan-500"
                    />
                    <span className="font-mono text-cyan-400 w-8 text-center">{arraySize}</span>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="algorithm" className="whitespace-nowrap font-medium text-slate-300">Algorithm:</label>
                    <select
                        id="algorithm"
                        value={selectedAlgorithm}
                        onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
                        disabled={isSorting}
                        className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {ALGORITHMS.map(alg => (
                            <option key={alg.name} value={alg.name}>{alg.name}</option>
                        ))}
                    </select>
                </div>
                 <div className="flex items-center gap-2">
                    <label htmlFor="speed" className="whitespace-nowrap font-medium text-slate-300">Speed:</label>
                    <select
                        id="speed"
                        value={speed}
                        onChange={(e) => onSpeedChange(Number(e.target.value))}
                        disabled={isSorting}
                        className="bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value={1}>1x</option>
                        <option value={1.5}>1.5x</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onReset}
                    disabled={isSorting}
                    className="px-6 py-2.5 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-500 transition-colors duration-200 disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                    Reset
                </button>
                <button
                    onClick={isSorting ? onStop : onStart}
                    className={`px-6 py-2.5 text-white font-bold rounded-md transition-colors duration-200 w-24 text-center ${
                        isSorting 
                        ? 'bg-red-600 hover:bg-red-500' 
                        : 'bg-cyan-600 hover:bg-cyan-500'
                    }`}
                >
                    {isSorting ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
};