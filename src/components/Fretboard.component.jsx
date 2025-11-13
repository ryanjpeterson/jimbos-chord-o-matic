import { useCallback, useMemo } from "react";
import { getNoteAtFret } from "../utils/chordFunctions";
import { FRET_COUNT } from "../utils/theory";

const Fretboard = ({ onSelectRoot, highlightRoot, highlightNotes }) => {

  const getNoteClasses = useCallback((note, stringIndex, fret) => {
    let classes = 'fret-note text-white transition-all duration-200';
    
    // Check if the current note is the root for the active builder (Chord/Scale)
    const isRoot = note === highlightRoot; 
    // Check if the current note is part of the scale/chord being built
    const isTone = highlightNotes.includes(note); 

    const cellBgClass = fret === 0 ? "bg-gray-700" : "";
    
    // Highlighting logic now relies on generic 'isTone' and 'isRoot'
    if (isTone) {
      if (isRoot) {
        // Darkest GREEN for Root, yellow ring for emphasis
        classes += ' bg-green-800'; 
      } else {
        // Standard GREEN for other tones
        classes += ' bg-green-500'; 
      }
    } 
    // Default style
    else {
      classes += ' bg-gray-600 hover:bg-primary';
    }

    // Determine fret markers
    let markers = null;
    if ([3, 5, 7, 9].includes(fret)) {
      markers = <div className="dot-marker"></div>;
    }
    if (fret === 12) {
      markers = (
        <>
          <div className="dot-marker" style={{ left: '35%' }}></div>
          <div className="dot-marker" style={{ left: '65%' }}></div>
        </>
      );
    }

    const noteDisplay = (
      <div 
        key={`${stringIndex}-${fret}`}
        className={classes}
        data-note={note}
        // When clicked, set this note as the selected root
        onClick={() => onSelectRoot(note)}
      >
        {note}
      </div>
    );
    
    return (
      <div 
        key={`cell-${stringIndex}-${fret}`}
        className={`fret-cell relative ${cellBgClass}`}
      >
        {markers}
        {noteDisplay}
      </div>
    );
  }, [highlightRoot, highlightNotes, onSelectRoot]);

  // Generate Fretboard Grid
  const fretboardContent = useMemo(() => {
    const strings = [];
    for (let i = 5; i >= 0; i--) {
      const stringIndex = i;
      const stringCells = [];
      
      for (let fret = 0; fret <= FRET_COUNT; fret++) {
        const note = getNoteAtFret(stringIndex, fret);
        stringCells.push(getNoteClasses(note, stringIndex, fret));
      }
      
      strings.push(
        <div key={`string-${stringIndex}`} className="fretboard-grid">
          {stringCells}
        </div>
      );
    }
    return strings;
  }, [getNoteClasses]);


  // Fretboard Header rendering
  const headerCells = useMemo(() => {
    const frets = ['Open', ...Array.from({ length: FRET_COUNT }, (_, i) => i + 1)];
    return (
      <div
        id="fretboard-header"
        className="grid items-center h-6 mb-1 text-gray-400 font-bold"
        style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }} 
      >
        
        {frets.map((fret, index) => (
          <div
            key={`fret-header-${index}`}
            className={`text-xs text-center h-full grid place-content-center border-r border-gray-600 ${index === 0 ? 'bg-gray-700' : ''}`}
          >
            {fret}
          </div>
        ))}
      </div>
    );
  }, []);


  return (
    <div
      id="fretboard"
      className="p-2 border border-gray-600 rounded-lg bg-gray-800 shadow-inner overflow-x-auto"
    >
      {headerCells}
      <div id="fretboard-strings" className="space-y-1">
        {fretboardContent}
      </div>
    </div>
  );
};

export default Fretboard;