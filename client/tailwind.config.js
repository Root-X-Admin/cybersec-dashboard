// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // enable dark mode via class strategy
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0f172a',     // dark navy
                'dark-panel': '#1e293b',  // panel/card
                'accent': '#3b82f6',      // blue accent
                'accent-light': '#60a5fa',
                'text-primary': '#f1f5f9', // text
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
