import { useCallback, useEffect, useMemo, useState } from "react";
import { transpose } from "../utils/chordFunctions";
import { CIRCLE_NOTES, NOTES, NUM_NOTES } from "../utils/theory";

const CircleExplorerScreen = ({ selectedRoot, setSelectedRoot }) => {
    const [highlightKey, setHighlightKey] = useState(selectedRoot);

    useEffect(() => {
        setHighlightKey(selectedRoot);
    }, [selectedRoot]);

    const getRelativeKey = useCallback((majorKey) => {
        return transpose(majorKey, -3) + 'm';
    }, []);

    const keyRelationships = useMemo(() => {
        const majorKey = highlightKey;
        const index = CIRCLE_NOTES.indexOf(majorKey);
        if (index === -1) return {};

        const currentMajor = majorKey;
        const currentMinor = getRelativeKey(majorKey);

        const dominantMajor = CIRCLE_NOTES[(index + 1) % NUM_NOTES];
        const dominantMinor = getRelativeKey(dominantMajor);

        const subdominantMajor = CIRCLE_NOTES[(index - 1 + NUM_NOTES) % NUM_NOTES];
        const subdominantMinor = getRelativeKey(subdominantMajor);

        return {
            currentMajor, currentMinor,
            dominantMajor, dominantMinor,
            subdominantMajor, subdominantMinor,
        };
    }, [highlightKey, getRelativeKey]);
    
    const size = 400;
    const radius = size / 2;
    const innerRadius = radius * 0.4;
    const outerRadius = radius * 0.85;

    const circlePositions = CIRCLE_NOTES.map((note, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = radius + outerRadius * Math.sin(angle);
        const y = radius - outerRadius * Math.cos(angle);
        
        const innerX = radius + innerRadius * Math.sin(angle);
        const innerY = radius - innerRadius * Math.cos(angle);

        return { note, angle, x, y, innerX, innerY, relativeMinor: getRelativeKey(note) };
    });

    // Helper to get highlight class
    const getHighlightClass = (note, isMajor) => {
        const { currentMajor, currentMinor, dominantMajor, dominantMinor, subdominantMajor, subdominantMinor } = keyRelationships;
        const key = isMajor ? note : note + 'm';

        if (isMajor && note === currentMajor) {
            // Changed text-gray-900 to text-white
            return 'fill-primary text-white font-extrabold'; // Current Major
        } else if (!isMajor && key === currentMinor) {
            // Changed text-gray-900 to text-white
            return 'fill-secondary text-white font-extrabold'; // Relative Minor
        } else if ((isMajor && (note === dominantMajor || note === subdominantMajor)) || 
                   (!isMajor && (key === dominantMinor || key === subdominantMinor))) {
            return 'fill-gray-600 text-white'; // Related Key (already white text)
        }
        return 'fill-gray-800 text-gray-400'; // Default
    };

    return (
        <div id="screen-circle" className="bg-gray-900 p-6 rounded-xl shadow-2xl flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">
                Circle Explorer (Fifths & Fourths)
            </h2>
            <p className="text-sm text-gray-400 mb-4 text-center max-w-lg">
                Select a key below to see its position on the Circle and highlight its primary related keys: **Dominant (V)**, **Subdominant (IV)**, and **Relative Minors**.
            </p>

            <div className="mb-4 w-full max-w-sm">
                <select
                    value={selectedRoot}
                    onChange={(e) => {
                        setSelectedRoot(e.target.value);
                        setHighlightKey(e.target.value);
                    }}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-primary focus:border-primary"
                >
                    {NOTES.map(note => <option key={note} value={note}>{note} Major</option>)}
                </select>
            </div>
            
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {/* Outer Circle (Background) */}
                    <circle cx={radius} cy={radius} r={outerRadius + 15} fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
                    
                    {/* Circle of Fifths Lines (Subtle) */}
                    <g stroke="#374151" strokeWidth="1" opacity="0.5">
                        {circlePositions.map((pos, i) => (
                            <line key={`line-${i}`} x1={pos.x} y1={pos.y} x2={pos.innerX} y2={pos.innerY} />
                        ))}
                    </g>

                    {/* Outer Circle - Major Keys */}
                    {circlePositions.map((pos) => (
                        <g 
                            key={`outer-${pos.note}`} 
                            transform={`translate(${pos.x}, ${pos.y})`}
                            onClick={() => setHighlightKey(pos.note)}
                            className="cursor-pointer"
                        >
                            <circle r="20" className={getHighlightClass(pos.note, true)} stroke="#a1a1aa" strokeWidth="1" />
                            <text 
                                x="0" y="5" 
                                textAnchor="middle" 
                                fontSize="12" 
                                className="font-bold" // Removed redundant text-gray-900 class
                            >
                                {pos.note}
                            </text>
                        </g>
                    ))}
                    
                    {/* Inner Circle - Minor Keys */}
                    {circlePositions.map((pos) => (
                        <g 
                            key={`inner-${pos.note}`} 
                            transform={`translate(${pos.innerX}, ${pos.innerY})`}
                            onClick={() => setHighlightKey(transpose(pos.note, -3))} // Set Major root based on minor selection
                            className="cursor-pointer"
                        >
                            <circle r="12" className={getHighlightClass(pos.note, false)} />
                            <text 
                                x="0" y="4" 
                                textAnchor="middle" 
                                fontSize="9" 
                                className="font-medium" // Removed redundant text-gray-900 class
                            >
                                {pos.relativeMinor}
                            </text>
                        </g>
                    ))}
                    
                    {/* Center Text */}
                    <text x={radius} y={radius - 15} textAnchor="middle" fontSize="14" className="fill-white font-bold">
                        Circle of Fifths
                    </text>
                    <text x={radius} y={radius + 5} textAnchor="middle" fontSize="16" className="fill-yellow-300 font-extrabold">
                        {highlightKey} Major
                    </text>
                    <text x={radius} y={radius + 25} textAnchor="middle" fontSize="12" className="fill-white">
                        ({getRelativeKey(highlightKey)} Minor)
                    </text>
                </svg>
            </div>

            {/* Relationship Key */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-bold text-white mb-2">Key Relationships: {highlightKey} Major</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-primary"></span>
                        <span className="text-white">I (Tonic): {keyRelationships.currentMajor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-secondary"></span>
                        <span className="text-white">vi (Relative Minor): {keyRelationships.currentMinor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-gray-600"></span>
                        <span className="text-white">V (Dominant): {keyRelationships.dominantMajor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-gray-600"></span>
                        <span className="text-white">IV (Subdominant): {keyRelationships.subdominantMajor}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircleExplorerScreen;