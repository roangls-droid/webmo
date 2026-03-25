import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#0b1220",
          800: "#121a2c",
          700: "#182338",
          200: "#d0d8e5"
        },
        brand: {
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5"
        },
        accent: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b"
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99, 102, 241, 0.28), 0 18px 60px rgba(99, 102, 241, 0.2)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(650px circle at var(--x, 50%) var(--y, 10%), rgba(34,197,94,0.14), transparent 62%), radial-gradient(900px circle at 50% 0%, rgba(251,191,36,0.08), transparent 58%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

