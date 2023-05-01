// vexflow:
import { useEffect, useRef } from "react";
import { Accidental, Annotation, Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import { ModeItem, NoteValue } from "./data";

const makeStaveNote = (note: NoteValue) => {
    const notes = new StaveNote({ keys: [note + "/4"], duration: "w" });
    notes.addModifier(new Annotation(note));
    if (note.includes("#")) notes.addModifier(new Accidental("#"));
    return notes;
};

export const Score = ({ note, mode }: { note: NoteValue; mode: ModeItem }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (ref.current === null) return;
        ref.current.innerHTML = "";

        const renderer = new Renderer(ref.current, Renderer.Backends.CANVAS);

        renderer.resize(360, 150);

        const context = renderer.getContext();
        context.scale(1.5, 1.5);
        const stave = new Stave(20 /** x */, -10 /** y */, 200)
            .setContext(context)
            .addClef("treble");
        if (mode) stave.addKeySignature(mode.id);
        stave.addTimeSignature("4/4").setEndBarType(3);

        stave.draw();

        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables([makeStaveNote(note)]);

        // Format and justify the notes to 400 pixels.
        new Formatter().joinVoices([voice]).format([voice]);

        voice.draw(context, stave);
    });

    return (
        <div className="rounded-md bg-white shadow-lg">
            <canvas ref={ref} id="vexflow" className=""></canvas>
        </div>
    );
};
