import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:        "#FAF7F2",
        ink:          "#1A1410",
        cacao:        "#3E2A20",
        espresso:     "#2A1A12",
        clay:         "#A67B5B",
        gold:         "#C9A875",
        "gold-light": "#E0C9A0",
        blush:        "#E8D5C4",
        sand:         "#EFE6DD",
        "sand-soft":  "#F5EDE5",
        muted:        "#8A7F76",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.5rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        display:      ["4rem",   { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["6rem",   { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        "super-wide": "0.3em",
        "ultra-wide": "0.4em",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "110rem",
      },
      boxShadow: {
        soft:  "0 2px 20px rgba(58, 42, 32, 0.06)",
        card:  "0 8px 40px rgba(58, 42, 32, 0.08)",
        hover: "0 16px 60px rgba(58, 42, 32, 0.12)",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "slide-in":   "slideIn 0.4s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.04)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;