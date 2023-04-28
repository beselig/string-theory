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
