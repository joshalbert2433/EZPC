/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        // darkTheme: "dark",
        themes: ["light", "dark"],
    },
    plugins: [require("daisyui")],
};
