import { getFullChordName } from "../utils/chordFunctions";
import { CHORD_FORMULAS, NOTES, QUALITY_OPTIONS } from "../utils/theory";

const ChordSelector = ({ selectedRoot, selectedQuality, setSelectedRoot, setSelectedQuality, selectedChord }) => {
    const chordName = selectedChord ? getFullChordName(selectedChord.root, selectedChord.quality) : 'Select Root and Quality';
    const chordNotes = selectedChord ? selectedChord.notes.join(', ') : 'Click a note above and choose a quality.';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Root Note Grid (12 notes) */}
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
                                    isSelected ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                }`}
                            >
                                {note}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-white">Choose Quality</h3>
                <div className="grid grid-cols-3 gap-2">
                    {QUALITY_OPTIONS.map(qualityKey => {
                        const isSelected = qualityKey === selectedQuality;
                        const formula = CHORD_FORMULAS[qualityKey];
                        if (!formula) return null;

                        return (
                            <button
                                key={qualityKey}
                                onClick={() => setSelectedQuality(qualityKey)}
                                className={`p-2 rounded-lg text-sm font-medium transition duration-150 ${
                                    isSelected ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                            >
                                {formula.short}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="md:col-span-2 mt-2 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-white mb-1">
                    Current Chord: <span className="text-white">{chordName}</span>
                </h3>
                <p className="text-sm text-gray-200">
                    Notes: {chordNotes}
                </p>
            </div>
        </div>
    );
};

export default ChordSelector;