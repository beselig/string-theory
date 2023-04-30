/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgb(15 23 42 / 0.1)",
                DEFAULT: "0 1px 3px 0 rgb(15 23 42 / 0.2), 0 1px 2px -1px rgb(15 23 42 / 0.2)",
                md: "0 4px 6px -1px rgb(15 23 42 / 0.2), 0 2px 4px -2px rgb(15 23 42 / 0.2)",
                lg: "0 10px 15px -3px rgb(15 23 42 / 0.2), 0 4px 6px -4px rgb(15 23 42 / 0.2)",
                xl: "0 20px 25px -5px rgb(15 23 42 / 0.2), 0 8px 10px -6px rgb(15 23 42 / 0.2)",
                "2xl": "0 25px 50px -12px rgb(15 23 42 / 0.35)",
                inner: "inset 0 2px 4px 0 rgb(15 23 42 / 0.1)",
                none: "none",
            },
        },
    },
    plugins: [],
};
