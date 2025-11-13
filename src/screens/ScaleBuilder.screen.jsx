import { useCallback, useEffect } from "react";
import { SCALES_DATA } from "../utils/theory";
import { noteToNumber, numberToNote } from "../utils/chordFunctions";
import Fretboard from "../components/Fretboard.component";
import ScaleSelector from "../components/ScaleSelector.component";

const ScaleBuilderScreen = ({ selectedRoot, setSelectedRoot, selectedScaleType, setSelectedScaleType, selectedScale, setSelectedScale }) => {
    
    // Effect to update selectedScale object whenever root or scale type changes
    useEffect(() => {
      if (selectedRoot && selectedScaleType) {
          const intervals = SCALES_DATA[selectedScaleType]?.intervals || [];
          const rootNum = noteToNumber(selectedRoot);
          const notes = intervals.map((interval) => numberToNote(rootNum + interval));
          
          setSelectedScale({
              root: selectedRoot,
              type: selectedScaleType,
              name: SCALES_DATA[selectedScaleType].name,
              notes: notes
          });
      } else {
          setSelectedScale(null);
      }
    }, [selectedRoot, selectedScaleType, setSelectedScale]);


    // Handler for clicking a note on the Fretboard (sets the root)
    const handleFretboardNoteClick = useCallback((note) => {
        setSelectedRoot(note);
    }, [setSelectedRoot]);

    // Highlighting Props for Fretboard
    const highlightRoot = selectedRoot; 
    const highlightNotes = selectedScale?.notes || [];

    return (
        <div id="screen-scale" className="bg-gray-900 p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
                Scale Builder
            </h2>
            <p className="text-sm text-gray-400 mb-4">
                Click a note on the fretboard below or in the Note Grid to set the **Root**, then select a **Scale Type** to visualize the notes.
            </p>
            
            <Fretboard
              onSelectRoot={handleFretboardNoteClick} 
              highlightRoot={highlightRoot} 
              highlightNotes={highlightNotes} 
            />

            <div
                id="scale-builder-inputs"
                className="mt-4 p-4 bg-gray-700 rounded-lg custom-scrollbar"
            >
                <ScaleSelector
                    selectedRoot={selectedRoot}
                    selectedScaleType={selectedScaleType}
                    setSelectedRoot={setSelectedRoot}
                    setSelectedScaleType={setSelectedScaleType}
                    selectedScale={selectedScale}
                />
            </div>
        </div>
    );
};

export default ScaleBuilderScreen;