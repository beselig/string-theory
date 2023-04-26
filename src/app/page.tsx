import { Game } from "@/components/Game/NewGame";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-32 flex flex-col justify-between text-center">
                <Game />
            </div>
        </main>
    );
}
