export const metadata = {
    title: "Fretboard Trainer",
    description: "Find the note on the string.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
