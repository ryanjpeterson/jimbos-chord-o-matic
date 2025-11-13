import { NOTES, SCALES_DATA } from "../utils/theory";

const ScaleSelector = ({ selectedRoot, selectedScaleType, setSelectedRoot, setSelectedScaleType, selectedScale }) => {
    
    const scaleName = selectedScale ? `${selectedScale.root} ${SCALES_DATA[selectedScale.type]?.name || 'Scale'}` : 'Select Root and Scale Type';
    const scaleNotes = selectedScale ? selectedScale.notes.join(', ') : 'Click a note above and choose a scale type.';
    const scaleOptions = Object.keys(SCALES_DATA);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Root Note Grid (12 notes) - Reused from Chord Selector */}
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-white">Choose Root Note</h3>
                <div className="grid grid-cols-4 gap-2">
                    {NOTES.map(note => {
                        const isSelected = note === selectedRoot;
                        return (
                            <button
                                key={note}
                                onClick={() => setSelectedRoot(note)}
                                className={`p-2 rounded-lg text-lg font-bold transition duration-150 ${
                                    // Root Button: Active = Light Gray BG + Dark Text
                                    isSelected ? 'bg-primary text-white-900' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                {note}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Column 2: Scale Type Buttons */}
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-white">Choose Scale Type</h3>
                {/* Updated grid for better layout with more options */}
                <div className="grid grid-cols-2 gap-2"> 
                    {scaleOptions.map(scaleKey => {
                        const isSelected = scaleKey === selectedScaleType;
                        const scaleInfo = SCALES_DATA[scaleKey];

                        return (
                            <button
                                key={scaleKey}
                                onClick={() => setSelectedScaleType(scaleKey)}
                                className={`p-2 rounded-lg text-sm font-medium transition duration-150 ${
                                    // Scale Type Button: Active = Secondary Green BG + Dark Text
                                    isSelected ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                            >
                                {scaleInfo.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Combined Scale Result Display (Full width) */}
            <div className="md:col-span-2 mt-2 p-4 bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-white mb-1">
                    Current Scale: <span className="text-white">{scaleName}</span>
                </h3>
                <p className="text-sm text-gray-200">
                    Notes: {scaleNotes}
                </p>
            </div>
        </div>
    );
};

export default ScaleSelector;