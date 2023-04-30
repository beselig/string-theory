// vexflow:
import { useEffect, useRef } from "react";
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import { NoteValue } from "./data";

const makeStaveNote = (note: NoteValue) => {
    const notes = new StaveNote({ keys: [note + "/4"], duration: "w" });
    if (note.includes("#")) notes.addModifier(new Accidental("#"));
    return notes;
};
export const Score = ({ note }: { note: NoteValue }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (ref.current === null) return;
        ref.current.innerHTML = "";

        const renderer = new Renderer(ref.current, Renderer.Backends.CANVAS);

        renderer.resize(240, 100);

        const context = renderer.getContext();
        const stave = new Stave(20 /** x */, -10 /** y */, 200)
            .setContext(context)
            .addClef("treble")
            .addTimeSignature("4/4");
        stave.draw();

        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables([makeStaveNote(note)]);

        // Format and justify the notes to 400 pixels.
        new Formatter().joinVoices([voice]).format([voice]);

        voice.draw(context, stave);
    });

    return (
        <canvas
            ref={ref}
            id="vexflow"
            className="rounded-md bg-white shadow-lg shadow-slate-300"
        ></canvas>
    );
};
