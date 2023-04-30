"use client";
import * as Dialog from "@radix-ui/react-dialog";
import {
    Cross2Icon,
    LoopIcon,
    QuestionMarkIcon,
    ShadowInnerIcon,
    SpeakerLoudIcon,
    SpeakerOffIcon,
    SwitchIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useKeyEventHandler } from "../../../shared/useKeyEventHandler";
import { Button } from "../../Button";
import { AudioFeedback, HowTo, Prompt, Rules } from "./components";
import { GUITAR_STRINGS, GuitarString, GuitarStringUtteranceMap, NOTES, NoteValue } from "./data";

export const FretboardMasteryExercise = () => {
    const [muteAll, setMuteAll] = useState(false);
    const [audioFeedback, setAudioFeedback] = useState(false);
    const [voiceFeedback, setVoiceFeedback] = useState(true);
    const { guitarString, note, next } = useStringNotePair();

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
                <Prompt note={note} guitarString={guitarString} />
                <HowTo />
                {!muteAll && audioFeedback && <AudioFeedback src={makeSampleSrc(note)} />}
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

const useStringNotePair = () => {
    const getStringNotePair = (): { guitarString: GuitarString; note: NoteValue } => {
        return {
            guitarString: getRandomGuitarString(),
            note: getRandomNote(),
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

const useVoiceFeedback = (enabled: boolean, note: NoteValue, guitarString: GuitarString) => {
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

const getRandomNote = (): NoteValue => {
    return NOTES[Math.floor(Math.random() * NOTES.length)];
};

const getRandomGuitarString = (): GuitarString => {
    return GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)];
};

const makeSampleSrc = (note: NoteValue) => {
    return `/samples/simple/${note.replace("#", "_sharp")}.mp3`;
};
