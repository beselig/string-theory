"use client";
import { useState } from "react";
import { GameApi, GuitarString, Note } from "./game-api";
import { useKeyEventHandler } from "../../shared/useKeyEventHandler";


export const Game = () => {
    const [muted, setMuted] = useState(false)
    const pair = useStringNotePair();
    const { guitarString, note } = pair || {};

    if (!guitarString || !note) return <>Loading ...</>;

    return (
        <>
            <h1>
                Play {note} on {guitarString}
            </h1>
            <p>Hit space to generate a new note</p>
            {muted ? null : <audio src={`/samples/${makeFileName(note)}.mp3`} autoPlay></audio>}
            <button role="button" className="bg-slate-200 text-slate-800 hover:bg-slate-300 active:scale-95" onClick={() => setMuted(prev => !prev)}>{muted ? "enable audio" : "mute audio"}</button>
        </>
    );
};

const makeFileName = (note: Note) => {
    return note.replace("#", "_sharp_")
}

const getStringNotePair = (): { guitarString: GuitarString; note: Note } => {
    const randomGuitarString = GameApi.getRandomGuitarString();
    return {
        guitarString: randomGuitarString,
        note: GameApi.getRandomNoteForString(randomGuitarString),
    };
};

const useStringNotePair = () => {
    const [stringNotePair, setStringNotePair] = useState<{
        guitarString: GuitarString;
        note: Note;
    }>(getStringNotePair());
    console.log("stringNotePair", stringNotePair);

    useKeyEventHandler(["Space", "Enter"], () => {
        setStringNotePair(getStringNotePair());
    });

    return stringNotePair;
};
