import { Note, GuitarString, GuitarStringUtteranceMap } from "./data";

export const Prompt = ({ note, guitarString }: { note: Note; guitarString: GuitarString }) => {
    return (
        <>
            <div className="h1 flex justify-end">
                {GuitarStringUtteranceMap[guitarString]} string
            </div>
            <p className="text-sm">Note:</p>
            <div className="h1">{note}</div>
        </>
    );
};

export const HowTo = () => {
    return (
        <>
            <p className="hidden text-sm md:inline">
                press {"<Space>"} or {"<Enter>"}
            </p>
            <p className="inline text-sm md:hidden">Tap the screen</p>
        </>
    );
};

export const AudioFeedback = ({ src }: { src: string }) => {
    return <audio src={src} autoPlay></audio>;
};

export const Rules = () => {
    return (
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
            <li>Apply all the knowledge you like to find the note on the string.</li>
            <li>
                Do not force yourself into one way of navigation use all the tools at hand to find
                the note in question!
            </li>
            <li>
                Some ways to find notes are:
                <ul className="mt-1 list-[circle] pl-5 font-extralight">
                    <li>From memory</li>
                    <li>Through an interval from another note</li>
                    <li>From memory acquired during the game</li>
                    <li>
                        By recognizing patterns on the fretboard (i.e. intervals, on same or across
                        different strings)
                    </li>
                    <li>...</li>
                </ul>
            </li>
        </ul>
    );
};
