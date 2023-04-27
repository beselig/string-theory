import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-32 flex flex-col justify-between text-center">
            <Link href="/game">
                start game
            </Link>
            </div>
        </main>
    );
}
