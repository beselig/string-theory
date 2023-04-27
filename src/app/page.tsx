import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-32 flex flex-col justify-between text-center">
                <Link
                    href="/game"
                    className="p-3 bg-teal-300 text-teal-950 hover:bg-teal-400 active:bg-teal-400 active:scale-95"
                >
                    start game
                </Link>
            </div>
        </main>
    );
}
