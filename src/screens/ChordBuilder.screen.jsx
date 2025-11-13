import { useCallback, useEffect } from "react";
import { getChordNotes, getFullChordName } from "../utils/chordFunctions";
import Fretboard from "../components/Fretboard.component";
import ChordSelector from "../components/ChordSelector.component";

const ChordBuilderScreen = ({ selectedRoot, setSelectedRoot, selectedQuality, setSelectedQuality, selectedChord, setSelectedChord }) => {

  useEffect(() => {
    if (selectedRoot && selectedQuality) {
        const notes = getChordNotes(selectedRoot, selectedQuality);
        setSelectedChord({
            root: selectedRoot,
            quality: selectedQuality,
            name: getFullChordName(selectedRoot, selectedQuality),
            notes: notes
        });
    } else {
        setSelectedChord(null);
    }
  }, [selectedRoot, selectedQuality, setSelectedChord]);


  const handleFretboardNoteClick = useCallback((note) => {
    setSelectedRoot(note);
  }, [setSelectedRoot]);

  const highlightRoot = selectedRoot; 
  const highlightNotes = selectedChord?.notes || [];

  return (
    <div id="screen-lookup" className="bg-gray-900 p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Chord Builder
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Click a note on the fretboard below or in the Note Grid to set the **Root**, then select a **Quality** to build and visualize your chord.
      </p>
      
      <Fretboard
        onSelectRoot={handleFretboardNoteClick} 
        highlightRoot={highlightRoot} 
        highlightNotes={highlightNotes} 
      />

      <div
        id="chord-builder-inputs"
        className="mt-4 p-4 bg-gray-700 rounded-lg custom-scrollbar"
      >
        <ChordSelector
            selectedRoot={selectedRoot}
            selectedQuality={selectedQuality}
            setSelectedRoot={setSelectedRoot}
            setSelectedQuality={setSelectedQuality}
            selectedChord={selectedChord}
        />
      </div>
    </div>
  );
};

export default ChordBuilderScreen;