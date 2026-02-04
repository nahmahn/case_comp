/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F8F9FA",
                foreground: "#1E293B",
                primary: "#2563EB",
                "primary-foreground": "#FFFFFF",
                secondary: "#64748B",
                accent: "#0F172A",
                muted: "#94A3B8",
                border: "#E2E8F0",
                surface: "#FFFFFF",
                warning: "#D97706",
                success: "#059669",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
