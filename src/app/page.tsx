import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-32 flex flex-col justify-between text-center">
                <Link href="/game">
                    <div className="rounded-md border border-teal-950 border-opacity-50 hover:border-opacity-100 transition-all p-3 w-40 h-32 flex items-center justify-around uppercase group">
                        <div>
                            Fretboard
                            <br />
                            Mastery
                            <div className="overflow-hidden h-0 group-hover:h-5 transition-all text-base leading-none">
                                {">"}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </main>
    );
}
