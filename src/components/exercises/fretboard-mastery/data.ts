export type Frequency = number;
export type Note = (typeof NOTES)[number];
export type GuitarString = (typeof GUITAR_STRINGS)[number];

export const NOTES = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"] as const;
export const GUITAR_STRINGS = ["E", "A", "D", "G", "B", "e"] as const;

export const Notes = new Map<Note, Frequency>(
    NOTES.map((note, index) => [note, 82.41 * Math.pow(2, index / 12)])
);

export const GuitarStringUtteranceMap: Record<(typeof GUITAR_STRINGS)[number], string> = {
    e: "first",
    B: "second",
    G: "third",
    D: "fourth",
    A: "fifth",
    E: "sixth",
} as const;
