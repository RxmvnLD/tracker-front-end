/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
/*
sm: '640px',
md: '768px',
lg: '1024px',
xl: '1280px',
2xl: '1536p"isolatedModules": true,x',
*/

module.exports = {
    content: ["'./src/**/*.{html,js,jsx,ts,tsx}'"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: "#c6a9ff",
                secondary: "#98EECC",
                success: "#D0F5BE",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
