/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize: {
                "2xs": ["0.625rem", "0.75rem"],
            },
        },
    },
    plugins: [],
};
