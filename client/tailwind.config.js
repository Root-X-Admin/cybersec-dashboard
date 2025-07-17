/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#0e1621',
                darkBlue: '#1e293b',
                accent: '#38bdf8', // cyan-400
            }
        },
    },
    plugins: [],
}
