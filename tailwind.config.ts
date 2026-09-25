import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        swift: {
          black: "#0a0a0a",
          charcoal: "#151515",
          surface: "#1c1c1c",
          border: "#2a2a2a",
          gold: {
            DEFAULT: "#d4af37",
            light: "#f0d878",
            dark: "#a8822a",
          },
          warm: "#f5f2ea",
          muted: "#9a9a9a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        fa: ["Vazirmatn", "Tahoma", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f0d878 0%, #d4af37 50%, #a8822a 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
