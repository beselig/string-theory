import { CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Home() {
    return (
        <main className="flex h-full items-center justify-around">
            <Exercises />
        </main>
    );
}

const Exercises = () => {
    return (
        <section className="h-32 text-center">
            <div className="flex flex-col items-center justify-center">
                <Link href="/fretboard-mastery">
                    <Tile>Fretboard Mastery</Tile>
                </Link>
            </div>
        </section>
    );
};

const Tile = ({ children }: PropsWithChildren) => {
    return (
        <div className="group flex h-32 w-40 items-center justify-around rounded-md border border-teal-950 bg-teal-800 p-3 uppercase text-white transition-all dark:bg-opacity-30 hover:dark:bg-opacity-40">
            <div>
                {children}
                <div className="h-6 overflow-hidden text-base leading-none transition-all group-hover:h-6 group-hover:overflow-visible lg:h-0">
                    <CaretRightIcon className="inline h-8 w-8 scale-100 transition-transform group-hover:scale-100 lg:scale-0" />
                </div>
            </div>
        </div>
    );
};
