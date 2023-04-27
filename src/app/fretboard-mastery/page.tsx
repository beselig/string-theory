"use client";
import { useState } from "react";
import { useKeyEventHandler } from "../../shared/useKeyEventHandler";
import { GuitarString, Note, getRandomGuitarString, getRandomNote } from "./game-api";

export default function FretboardMastery() {
    const [muted, setMuted] = useState(false);
    const { guitarString, note, next, noteSampleName } = useStringNotePair();
    useKeyEventHandler(["Space", "Enter"], () => {
        next();
    });

    return (
        <main
            className="flex h-full w-full touch-none items-center justify-around"
            onTouchStart={next}
        >
            <div className="flex flex-col items-center gap-4">
                <p>Play</p>
                <div className="flex items-center gap-3">
                    <div className="flex w-14 justify-end text-4xl font-bold">{note}</div>
                    <div className="w-5">
                        <span>on</span>
                    </div>
                    <div className="flex w-14 text-4xl font-bold">{guitarString}</div>
                </div>
                <p></p>
                <p>Hit space to generate a new note</p>
                {!muted && <audio src={`/samples/simple/${noteSampleName}.mp3`} autoPlay></audio>}
                <button
                    role="button"
                    className="bg-slate-200 p-2 text-slate-800 hover:bg-slate-300 active:scale-95"
                    onClick={() => setMuted((prev) => !prev)}
                >
                    {muted ? "enable audio" : "mute audio"}
                </button>
            </div>
        </main>
    );
}

const useStringNotePair = () => {
    const makeFileName = (note: Note) => {
        return note.replace("#", "_sharp");
    };
    const getStringNotePair = (): { guitarString: GuitarString; note: Note } => {
        return {
            guitarString: getRandomGuitarString(),
            note: getRandomNote(),
        };
    };

    const [{ guitarString, note }, setStringNotePair] = useState<{
        note: Note;
        guitarString: GuitarString;
    }>(getStringNotePair());

    return {
        note,
        guitarString,
        noteSampleName: makeFileName(note),
        next: () => setStringNotePair(getStringNotePair()),
    };
};
