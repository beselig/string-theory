import { Navigation } from "@/components/Navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "String theory",
    description:
        "A gamification approach to learning to navigate the guitar and building muscle memory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={
                    inter.className + " bg-white font-sans text-black dark:bg-black dark:text-white"
                }
            >
                <div className="flex h-screen flex-col">
                    <Navigation />
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}
