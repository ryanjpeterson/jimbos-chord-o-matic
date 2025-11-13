export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const NUM_NOTES = 12;
// 6th to 1st string (Low E to High E)
export const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];
export const FRET_COUNT = 12;

// Notes arranged in the order of the Circle of Fifths (12 notes total)
export const CIRCLE_NOTES = [
    'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'
];

export const CHORD_FORMULAS = {
  maj: { intervals: [0, 4, 7], name: "Major", short: "maj" },
  min: { intervals: [0, 3, 7], name: "Minor", short: "min" },
  aug: { intervals: [0, 4, 8], name: "Augmented", short: "aug" },
  dim: { intervals: [0, 3, 6], name: "Diminished", short: "dim" },

  // Seventh Chords
  dom7: { intervals: [0, 4, 7, 10], name: "Dominant 7th", short: "7" },
  maj7: { intervals: [0, 4, 7, 11], name: "Major 7th", short: "maj7" },
  min7: { intervals: [0, 3, 7, 10], name: "Minor 7th", short: "min7" },
  halfdim: { intervals: [0, 3, 6, 10], name: "Half-Diminished 7th", short: "m7b5" },
  dim7: { intervals: [0, 3, 6, 9], name: "Diminished 7th", short: "dim7" },

  // Suspended/Add
  sus4: { intervals: [0, 5, 7], name: "Suspended 4th", short: "sus4" },
  add9: { intervals: [0, 4, 7, 2], name: "Add 9", short: "add9" },
  
  // Extended Chords (Simplified intervals)
  dom9: { intervals: [0, 4, 7, 10, 2], name: "Dominant 9th", short: "9" },
  maj9: { intervals: [0, 4, 7, 11, 2], name: "Major 9th", short: "maj9" },
  min9: { intervals: [0, 3, 7, 10, 2], name: "Minor 9th", short: "min9" },
  dom11: { intervals: [0, 4, 7, 10, 5], name: "Dominant 11th", short: "11" },
};

// Qualities to display in the button column
export const QUALITY_OPTIONS = [
    'maj', 'min', 'dom7', 'maj7', 'min7', 'sus4', 'dim', 'aug', 
    'halfdim', 'dim7', 'dom9', 'maj9', 'min9', 'dom11', 'add9'
];

// --- SCALE DATA (Updated with Whole Tone and Half-Whole Diminished) ---
export const SCALES_DATA = {
    major: { name: "Major (Ionian)", intervals: [0, 2, 4, 5, 7, 9, 11] },
    min: { name: "Natural Minor (Aeolian)", intervals: [0, 2, 3, 5, 7, 8, 10] },
    phrygian: { name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
    dorian: { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
    lydian: { name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
    mixolydian: { name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
    hmin: { name: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
    mmin: { name: "Melodic Minor (Asc)", intervals: [0, 2, 3, 5, 7, 9, 11] },
    pmaj: { name: "Pentatonic Major", intervals: [0, 2, 4, 7, 9] },
    pmin: { name: "Pentatonic Minor", intervals: [0, 3, 5, 7, 10] },
    blues: { name: "Minor Blues", intervals: [0, 3, 5, 6, 7, 10] },
    // NEW SYMMETRICAL SCALES
    wht: { name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10] },
    hwd: { name: "Half-Whole Diminished", intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
};

// --- DIATONIC MODE CHORD DATA (used by DiatonicAnalysisScreen) ---
export const MODES_DATA = {
  ionian: { // Major
    name: 'Ionian (Major)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    chords: [
      { quality: "maj7", symbol: "Imaj7" },
      { quality: "min7", symbol: "ii7" },
      { quality: "min7", symbol: "iii7" },
      { quality: "maj7", symbol: "IVmaj7" },
      { quality: "dom7", symbol: "V7" },
      { quality: "min7", symbol: "vi7" },
      { quality: "min7", symbol: "viiØ7" }, // Half-diminished
    ],
  },
  dorian: {
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    chords: [
      { quality: "min7", symbol: "i7" },
      { quality: "min7", symbol: "ii7" },
      { quality: "maj7", symbol: "♭IIImaj7" },
      { quality: "dom7", symbol: "IV7" },
      { quality: "min7", symbol: "v7" },
      { quality: "min7", symbol: "viØ7" },
      { quality: "maj7", symbol: "♭VIImaj7" },
    ],
  },
  phrygian: {
    name: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    chords: [
      { quality: "min7", symbol: "i7" },
      { quality: "maj7", symbol: "♭IImaj7" },
      { quality: "dom7", symbol: "♭III7" },
      { quality: "min7", symbol: "iv7" },
      { quality: "min7", symbol: "vØ7" },
      { quality: "maj7", symbol: "♭VImaj7" },
      { quality: "min7", symbol: "♭vii7" },
    ],
  },
  lydian: {
    name: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    chords: [
      { quality: "maj7", symbol: "Imaj7" },
      { quality: "dom7", symbol: "II7" },
      { quality: "min7", symbol: "iii7" },
      { quality: "min7", symbol: "ivØ7" },
      { quality: "maj7", symbol: "Vmaj7" },
      { quality: "min7", symbol: "vi7" },
      { quality: "min7", symbol: "vii7" },
    ],
  },
  mixolydian: {
    name: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    chords: [
      { quality: "dom7", symbol: "I7" },
      { quality: "min7", symbol: "ii7" },
      { quality: "dim", symbol: "iiiØ7" }, // Half-diminished
      { quality: "maj7", symbol: "IVmaj7" },
      { quality: "min7", symbol: "v7" },
      { quality: "min7", symbol: "viØ7" },
      { quality: "maj7", symbol: "♭VIImaj7" },
    ],
  },
  aeolian: { // Natural Minor
    name: 'Aeolian (Minor)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    chords: [
      { quality: "min7", symbol: "i7" },
      { quality: "min7", symbol: "iiØ7" },
      { quality: "maj7", symbol: "♭IIImaj7" },
      { quality: "min7", symbol: "iv7" },
      { quality: "min7", symbol: "v7" },
      { quality: "maj7", symbol: "♭VImaj7" },
      { quality: "dom7", symbol: "♭VII7" },
    ],
  },
  locrian: {
    name: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    chords: [
      { quality: "dim", symbol: "iØ7" },
      { quality: "maj7", symbol: "♭IImaj7" },
      { quality: "min7", symbol: "♭iii7" },
      { quality: "min7", symbol: "iv7" },
      { quality: "maj7", symbol: "♭Vmaj7" },
      { quality: "dom7", symbol: "♭VI7" },
      { quality: "min7", symbol: "♭vii7" },
    ],
  },
};