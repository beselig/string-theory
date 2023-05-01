import { useEffect, useState } from "react";
import { NoteValue, GuitarString, NOTES, GuitarStringUtteranceMap, GUITAR_STRINGS } from "../data";

export const useStringNotePair = (notes?: NoteValue[]) => {
    const getStringNotePair = (): { guitarString: GuitarString; note: NoteValue } => {
        return {
            guitarString: getRandomGuitarString(),
            note: getRandomNote(notes || NOTES),
        };
    };

    const [{ guitarString, note }, setStringNotePair] = useState<{
        note: NoteValue;
        guitarString: GuitarString;
    }>(getStringNotePair());

    return {
        note,
        guitarString,
        next: () => {
            setStringNotePair(getStringNotePair());
        },
    };
};

export const useVoiceFeedback = (enabled: boolean, note: NoteValue, guitarString: GuitarString) => {
    useEffect(() => {
        window.speechSynthesis.cancel();
        console.log("useVoiceFeedback", note);

        if (enabled) {
            // say guitar string and note
            const utterance = new SpeechSynthesisUtterance(
                `On ${GuitarStringUtteranceMap[guitarString]} string, play, ${note}.`
            );
            utterance.voice = speechSynthesis.getVoices()[0];
            speechSynthesis.speak(utterance);
        }
    }, [enabled, note, guitarString]);
};

const getRandomNote = (notes: NoteValue[]): NoteValue => {
    return notes[Math.floor(Math.random() * notes.length)];
};

const getRandomGuitarString = (): GuitarString => {
    return GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)];
};
