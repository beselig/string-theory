"use client";
import { Combobox, ComboboxItem } from "@/components/Combobox";
import * as Dialog from "@radix-ui/react-dialog";
import {
    Cross2Icon,
    LoopIcon,
    QuestionMarkIcon,
    SpeakerLoudIcon,
    SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useKeyEventHandler } from "../../../shared/useKeyEventHandler";
import { Button } from "../../Button";
import { AudioFeedback, HowTo, Prompt, Rules } from "./components";
import { NOTES, NoteValue } from "./data";
import { useStringNotePair, useVoiceFeedback } from "./hooks/hooks";

type Mode = ComboboxItem<NoteValue[]>;
const modes: Mode[] = [
    {
        id: "all",
        name: "All notes",
        value: NOTES,
    },
    {
        id: "cmajor",
        name: "C Major",
        value: ["c", "d", "e", "f", "g", "a", "b"],
    },
    {
        id: "dmajor",
        name: "D Major",
        value: ["d", "e", "f#", "g", "a", "b", "c#"],
    },
];

export const FretboardMasteryExercise = () => {
    const [mode, setMode] = useState<(typeof modes)[number]>(modes[0]);
    const [muteAll, setMuteAll] = useState(false);
    const [audioFeedback, setAudioFeedback] = useState(false);
    const [voiceFeedback, setVoiceFeedback] = useState(true);
    const { guitarString, note, next } = useStringNotePair(mode.value);

    const toggleFeedback = () => {
        const current = audioFeedback;
        setAudioFeedback(!current);
        setVoiceFeedback(current);
    };

    useVoiceFeedback(!muteAll && !!voiceFeedback, note, guitarString);

    useKeyEventHandler(["Space", "Enter"], () => {
        next();
    });

    return (
        <div
            className="flex h-full w-full flex-col items-center justify-between py-5 lg:py-10"
            onTouchStart={next}
        >
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Combobox value={mode} items={modes} onChange={(value) => setMode(value as Mode)} />
                <Prompt note={note} guitarString={guitarString} />
                <HowTo />
                {!muteAll && audioFeedback && <AudioFeedback note={note} />}
            </div>
            <div className="mt-auto flex max-w-[800px] gap-5 py-10">
                <Button onClick={toggleFeedback} disabled={muteAll}>
                    {audioFeedback && "Voice"}
                    {voiceFeedback && "Guitar"}
                    <LoopIcon />
                </Button>
                <Button onClick={() => setMuteAll((prev) => !prev)}>
                    {muteAll ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
                </Button>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button className="lg:hidden">
                            How to play <QuestionMarkIcon />
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black" />
                        <Dialog.Content className=" data-[state=open]:animate-contentShow fixed inset-0 overflow-auto bg-white p-6 text-black shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-black dark:text-white sm:h-screen sm:w-screen">
                            <Dialog.Title asChild>
                                <h3 className="m-0 mb-5 border-b-2 pb-5 uppercase leading-none">
                                    How to play
                                </h3>
                            </Dialog.Title>
                            <Rules />
                            <Dialog.Close asChild>
                                <button
                                    className="absolute right-6 top-6 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full bg-white text-black focus:shadow-[0_0_0_2px] focus:outline-none"
                                    aria-label="Close"
                                >
                                    <Cross2Icon />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <article className="hidden opacity-20 transition-opacity hover:opacity-50 lg:block">
                <h3 className="uppercase">How to play</h3>
                <Rules />
            </article>
        </div>
    );
};
