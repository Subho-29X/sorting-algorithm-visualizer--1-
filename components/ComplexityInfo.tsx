
import React from 'react';
import type { Algorithm } from '../types';
import { ALGORITHMS } from '../constants';

interface ComplexityInfoProps {
    algorithm: Algorithm;
}

export const ComplexityInfo: React.FC<ComplexityInfoProps> = ({ algorithm }) => {
    const details = ALGORITHMS.find(alg => alg.name === algorithm);

    if (!details) return null;

    return (
        <div className="w-full max-w-7xl bg-slate-800 p-4 rounded-lg shadow-lg mt-4 animate-fade-in">
            <h2 className="text-xl font-bold text-cyan-400 mb-3 text-center">{details.name} - Time Complexity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-700 p-3 rounded-md">
                    <h3 className="text-lg font-semibold text-green-400">Best Case</h3>
                    <p className="font-mono text-lg">{details.complexity.best}</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-md">
                    <h3 className="text-lg font-semibold text-yellow-400">Average Case</h3>
                    <p className="font-mono text-lg">{details.complexity.average}</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-md">
                    <h3 className="text-lg font-semibold text-red-400">Worst Case</h3>
                    <p className="font-mono text-lg">{details.complexity.worst}</p>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
