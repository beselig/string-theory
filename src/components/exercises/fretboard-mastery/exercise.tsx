"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, QuestionMarkIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useKeyEventHandler } from "../../../shared/useKeyEventHandler";
import { Button } from "../../Button";
import { AudioFeedback, HowTo, Prompt, Rules } from "./components";
import { GUITAR_STRINGS, GuitarString, GuitarStringUtteranceMap, NOTES, Note } from "./data";

export const FretboardMasteryExercise = () => {
    const [audioFeedback, setAudioFeedback] = useState(false);
    const [voiceFeedback, setVoiceFeedback] = useState(true);
    const { guitarString, note, next } = useStringNotePair();

    const toggleFeedback = () => {
        const current = audioFeedback;
        setAudioFeedback(!current);
        setVoiceFeedback(current);
    };

    useVoiceFeedback(!!voiceFeedback, note, guitarString);

    useKeyEventHandler(["Space", "Enter"], () => {
        next();
    });

    return (
        <div
            className="flex h-full w-full flex-col items-center justify-between"
            onTouchStart={next}
        >
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Prompt note={note} guitarString={guitarString} />
                <HowTo />
                {audioFeedback && <AudioFeedback src={makeSampleSrc(note)} />}
            </div>
            <div className="mt-auto flex max-w-[800px] gap-5 py-10">
                <Button onClick={toggleFeedback}>
                    {audioFeedback && "Voice"}
                    {voiceFeedback && "Guitar"}
                    <SpeakerLoudIcon />
                </Button>
                <div className="hidden lg:block">
                    <article>
                        <h3 className="uppercase">How to play</h3>
                        <Rules />
                    </article>
                </div>
                <div className="lg:hidden">
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <Button>
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
            </div>
        </div>
    );
};

const useStringNotePair = () => {
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
        next: () => {
            setStringNotePair(getStringNotePair());
        },
    };
};

const useVoiceFeedback = (enabled: boolean, note: Note, guitarString: GuitarString) => {
    useEffect(() => {
        window.speechSynthesis.cancel();
        if (enabled) {
            // say guitar string and note
            const utterance = new SpeechSynthesisUtterance(
                `On ${GuitarStringUtteranceMap[guitarString]} string, play, ${note}`
            );
            speechSynthesis.speak(utterance);
        }
    }, [enabled, note, guitarString]);
};

const getRandomNote = (): Note => {
    return NOTES[Math.floor(Math.random() * NOTES.length)];
};

const getRandomGuitarString = (): GuitarString => {
    return GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)];
};

const makeSampleSrc = (note: Note) => {
    return `/samples/simple/${note.replace("#", "_sharp")}.mp3`;
};
