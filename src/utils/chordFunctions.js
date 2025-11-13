import { CHORD_FORMULAS, NOTES, NUM_NOTES, STANDARD_TUNING } from "./theory";

export const getFullChordName = (root, quality) => {
  const formula = CHORD_FORMULAS[quality];
  if (!formula) return `${root}`;
  return root + formula.short;
}

export const getSimplifiedChordFormula = (modeQuality) => {
    if (modeQuality.includes('maj7')) return 'maj7';
    if (modeQuality.includes('min7') || modeQuality.includes('min')) return 'min7';
    if (modeQuality.includes('dom7') || modeQuality.includes('dom')) return 'dom7';
    if (modeQuality.includes('Ø7')) return 'halfdim';
    if (modeQuality.includes('dim')) return 'dim';
    return 'maj'; // Default fallback
}


export const noteToNumber = (note) => {
  return NOTES.indexOf(note);
}

export const numberToNote = (number) => {
  return NOTES[((number % NUM_NOTES) + NUM_NOTES) % NUM_NOTES];
}

export const transpose = (note, semitones) => {
  let index = noteToNumber(note);
  return numberToNote(index + semitones);
}

export const getNoteAtFret = (stringIndex, fret) => {
  const openNote = STANDARD_TUNING[stringIndex];
  return transpose(openNote, fret);
}

export const getChordNotes = (root, quality) => {
  const formula = CHORD_FORMULAS[quality]?.intervals || [];
  const rootNum = noteToNumber(root);
  return formula.map((interval) => numberToNote(rootNum + interval));
}