
import React from 'react';
import type { Bar } from '../types';

interface VisualizerProps {
    bars: Bar[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ bars }) => {
    const barWidth = 100 / bars.length;

    return (
        <div className="w-full max-w-7xl h-[60vh] bg-slate-800 p-4 rounded-lg shadow-inner flex items-end justify-start gap-[1px]">
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
                ></div>
            ))}
        </div>
    );
};
