"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useKeyEventHandler } from "../../shared/useKeyEventHandler";
import { Rules } from "./Rules";
import {
    GUITAR_STRINGS,
    GuitarString,
    Note,
    getRandomGuitarString,
    getRandomNote,
} from "./game-api";
import { isMobileOrTablet } from "../../shared/isMobileOrTablet";

export default function FretboardMastery() {
    const [muted, setMuted] = useState(true);
    const { guitarString, note, next, noteSampleName } = useStringNotePair();
    useKeyEventHandler(["Space", "Enter"], () => {
        next();
    });

    return (
        <main
            className="flex h-full w-full touch-none flex-col items-center justify-around"
            onTouchStart={next}
        >
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <p className="text-sm">On</p>
                <div className="h1 flex justify-end">
                    {GuitarStringUtteranceMap[guitarString]} string
                </div>
                <p className="text-sm">play</p>
                <div className="h1">{note}</div>
                <p></p>

                <p className="text-sm">
                    {isMobileOrTablet() ? (
                        <p>Tap the screen</p>
                    ) : (
                        <p>
                            Press {"<Space>"} or {"<Enter>"}
                        </p>
                    )}
                </p>
                {!muted && <audio src={`/samples/simple/${noteSampleName}.mp3`} autoPlay></audio>}
                <button
                    role="button"
                    className="bg-slate-200 p-2 text-slate-800 hover:bg-slate-300 active:scale-95"
                    onClick={() => setMuted((prev) => !prev)}
                >
                    {muted ? "enable audio" : "mute audio"}
                </button>
            </div>
            <div className="mt-auto max-w-[800px] py-10">
                <div className="hidden lg:block">
                    <article>
                        <h3 className="uppercase">How to play</h3>
                        <Rules />
                    </article>
                </div>
                <div className="lg:hidden">
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] shadow-black hover:bg-teal-100 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                                How to play?
                            </button>
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
                    </Dialog.Root>{" "}
                </div>
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
        next: () => {
            speechSynthesis.cancel();
            // update state
            const next = getStringNotePair();
            setStringNotePair(next);

            // say guitar string and note
            const utterance = makeUtterance(next.note, next.guitarString);
            speechSynthesis.speak(utterance);
        },
    };
};

const makeUtterance = (note: Note, guitarString: GuitarString) => {
    return new SpeechSynthesisUtterance(
        `On ${GuitarStringUtteranceMap[guitarString]} string, play, ${note}`
    );
};

const GuitarStringUtteranceMap: Record<(typeof GUITAR_STRINGS)[number], string> = {
    e: "first",
    B: "second",
    G: "third",
    D: "fourth",
    A: "fifth",
    E: "sixth",
} as const;
