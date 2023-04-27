export type Frequency = number;
export type Note = (typeof NOTES)[number];
export type GuitarString = (typeof GUITAR_STRINGS)[number];

export const NOTES = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"] as const;
export const GUITAR_STRINGS = ["E", "A", "D", "G", "B", "e"] as const;

export const Notes = new Map<Note, Frequency>(
    NOTES.map((note, index) => [note, 82.41 * Math.pow(2, index / 12)])
);

export const getFrequencyFromNote = (note: Note): Frequency => {
    return Notes.get(note) ?? 0;
};

export const getRandomNote = (): Note => {
    return NOTES[Math.floor(Math.random() * NOTES.length)];
};

export const getRandomGuitarString = (): GuitarString => {
    return GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)];
};
