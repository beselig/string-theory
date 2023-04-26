"use client";
import { useState } from "react";
import { useKeyEventHandler } from "../../shared/useKeyEventHandler";
import { GuitarString, Note, getRandomGuitarString, getRandomNote } from "./game-api";

export const Game = () => {
    const [muted, setMuted] = useState(false);
    const { guitarString, note } = useStringNotePair();

    if (!guitarString || !note) return <>Loading ...</>;

    return (
        <div className="flex flex-col gap-4 items-center">
            <p>Play</p>
            <div className="flex gap-3 items-center">
                <div className="w-14 flex justify-end text-4xl font-bold">{note}</div>
                <div className="w-5">
                    <span>on</span>
                </div>
                <div className="w-14 flex text-4xl font-bold">{guitarString}</div>
            </div>
            <p></p>
            <p>Hit space to generate a new note</p>
            {!muted && <audio src={`/samples/simple/${makeFileName(note)}.mp3`} autoPlay></audio>}
            <button
                role="button"
                className="p-2 bg-slate-200 text-slate-800 hover:bg-slate-300 active:scale-95"
                onClick={() => setMuted((prev) => !prev)}
            >
                {muted ? "enable audio" : "mute audio"}
            </button>
        </div>
    );
};

const makeFileName = (note: Note) => {
    return note.replace("#", "_sharp");
};

const getStringNotePair = (): { guitarString: GuitarString; note: Note } => {
    return {
        guitarString: getRandomGuitarString(),
        note: getRandomNote(),
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
