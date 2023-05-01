import { ComboboxItem } from "@/components/Combobox";

export type Frequency = number;
export type NoteValue = (typeof NOTES)[number];
export type GuitarString = (typeof GUITAR_STRINGS)[number];

export const NOTES: string[] = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"];
export const GUITAR_STRINGS = ["E", "A", "D", "G", "B", "e"] as const;

export const Notes = new Map<NoteValue, Frequency>(
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

export type ModeItem = ComboboxItem<NoteValue[]>;
export const modes: ModeItem[] = [
    {
        id: "C",
        name: "All notes",
        value: NOTES,
    },
    {
        id: "C",
        name: "C Major",
        value: ["c", "d", "e", "f", "g", "a", "b"],
    },
    {
        id: "D",
        name: "D Major",
        value: ["d", "e", "f#", "g", "a", "b", "c#"],
    },
];
