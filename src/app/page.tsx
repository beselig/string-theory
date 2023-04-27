import Link from "next/link";

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
                    <div className="group flex h-32 w-40 items-center justify-around rounded-md border border-teal-500 bg-teal-950 p-3 uppercase transition-all hover:border-opacity-100 lg:border-teal-950 lg:border-opacity-50 lg:bg-opacity-0 lg:hover:bg-opacity-40">
                        <div>
                            Fretboard
                            <br />
                            Mastery
                            <div className="overflow-hidden text-base leading-none transition-all group-hover:h-4 lg:h-0">
                                {">"}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
};
