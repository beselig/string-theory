"use client";
import { useState } from "react";
import { useKeyEventHandler } from "../../../shared/useKeyEventHandler";
import { AudioFeedback, Toolbar } from "./Toolbar";
import { HowTo, PlaySample, Prompt } from "./components";
import { modes } from "./data";
import { useStringNotePair, useVoiceFeedback } from "./hooks/hooks";

export const FretboardMasteryExercise = () => {
    const [mode, setMode] = useState<(typeof modes)[number]>(modes[0]);
    const [audioFeedback, setAudioFeedback] = useState<AudioFeedback>("off");
    const { guitarString, note, next } = useStringNotePair(mode.value);

    useVoiceFeedback(audioFeedback === "voice", note, guitarString);
    useKeyEventHandler(["Space", "Enter"], () => {
        next();
    });

    return (
        <div
            className="flex h-full w-full flex-col items-center justify-between p-2 md:pb-32 lg:pb-40"
            onTouchStart={next}
        >
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Prompt mode={mode} note={note} guitarString={guitarString} />
                <HowTo />
                {audioFeedback === "sample" && <PlaySample note={note} />}
            </div>
            <div className="w-full">
                <div className="m-auto flex w-full max-w-[600px] flex-col gap-2 md:items-start">
                    <Toolbar
                        audioFeedbackValue={audioFeedback}
                        onAudioFeedbackChange={setAudioFeedback}
                        mode={mode}
                        onModeChange={setMode}
                    />
                </div>
            </div>
        </div>
    );
};
