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
            <body className={inter.className}>
                <div className="flex flex-col h-screen">
                    <Navigation />
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}
