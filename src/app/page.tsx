import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Exercises />
        </main>
    );
}

const Exercises = () => {
    return (
        <section className="h-32 flex flex-col justify-between text-center">
            <div className="flex min-h-screen flex-col items-center justify-center">
                <Link href="/fretboard-mastery">
                    <div className="rounded-md border lg:border-teal-950 lg:border-opacity-50 hover:border-opacity-100 transition-all p-3 w-40 h-32 flex items-center justify-around uppercase group bg-teal-950 border-teal-500 lg:bg-opacity-0 lg:hover:bg-opacity-40">
                        <div>
                            Fretboard
                            <br />
                            Mastery
                            <div className="overflow-hidden lg:h-0 group-hover:h-4 transition-all text-base leading-none">
                                {">"}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
};
