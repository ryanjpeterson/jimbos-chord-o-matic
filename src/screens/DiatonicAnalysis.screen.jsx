import { useMemo } from "react";
import { MODES_DATA, NOTES } from "../utils/theory";
import { getChordNotes, getFullChordName, getSimplifiedChordFormula, noteToNumber, numberToNote } from "../utils/chordFunctions";

const DiatonicAnalysisScreen = ({ selectedKey, setSelectedKey }) => {
  const keyRoot = selectedKey.root;
  const keyMode = selectedKey.mode; // Use 'mode' instead of 'quality'

  const diatonicChords = useMemo(() => {
    const modeData = MODES_DATA[keyMode];
    if (!modeData) return [];

    const modeIntervals = modeData.intervals;
    const modeChords = modeData.chords;
    const rootNum = noteToNumber(keyRoot);

    return modeIntervals.map((interval, index) => {
      const chordRoot = numberToNote(rootNum + interval);
      const chordInfo = modeChords[index];
      
      const simplifiedQuality = getSimplifiedChordFormula(chordInfo.quality); 
      
      // Use the *full* quality (e.g., maj7, min7) for notes, as this is analysis
      const chordNotes = getChordNotes(chordRoot, simplifiedQuality).join(", ");
      
      const fullRomanSymbol = chordInfo.symbol;
      const fullChordName = getFullChordName(chordRoot, simplifiedQuality);

      return { fullChordName, romanSymbol: fullRomanSymbol, chordNotes, key: index };
    });
  }, [keyRoot, keyMode]);

  return (
    <div id="screen-diatonic" className="bg-gray-900 p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Diatonic Chord Analysis
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Find the diatonic chords (the key) related to a chosen root note.
      </p>

      {/* Selectors */}
      <div className="flex space-x-2 mb-4">
        <select
          value={keyRoot}
          onChange={(e) => setSelectedKey(prev => ({ ...prev, root: e.target.value }))}
          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-primary focus:border-primary"
        >
          {NOTES.map(note => <option key={note} value={note}>{note}</option>)}
        </select>
        <select
          value={keyMode}
          onChange={(e) => setSelectedKey(prev => ({ ...prev, mode: e.target.value }))}
          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-primary focus:border-primary"
        >
          {/* Options now include all 7 modes */}
          {Object.entries(MODES_DATA).map(([key, data]) => (
             <option key={key} value={key}>{data.name}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons (Simplified) */}
      <div className="mb-4">
        {/* Placeholder for future buttons or spacing */}
      </div>

      {/* Diatonic Result */}
      <div
        id="diatonic-result"
        className="mt-4 p-4 bg-gray-700 rounded-lg custom-scrollbar max-h-96 overflow-y-auto"
      >
        <h3 className="font-bold text-lg mb-4 text-white">
          Diatonic Chords in the Key of <span className="text-primary">{keyRoot} {MODES_DATA[keyMode]?.name || 'Mode'}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {diatonicChords.map((chord) => (
            <div
              key={chord.key}
              className="bg-gray-800 p-3 rounded-lg shadow-md border-l-4 border-primary"
            >
              {/* Roman numeral symbol (includes flats/sharps) */}
              <div className="text-sm text-gray-400">{chord.romanSymbol}</div>
              {/* Simplified Chord Name (maj, min, 7, etc.) */}
              <div className="text-xl font-bold text-white">{chord.fullChordName}</div>
              <div className="text-xs text-gray-500">({chord.chordNotes})</div>
            </div>
          ))}
        </div>
      </div>

      {/* LLM Progression, Modulation, and RHYTHM Result Areas Removed */}
    </div>
  );
};

export default DiatonicAnalysisScreen;