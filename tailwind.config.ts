import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080a12",
        surface: {
          DEFAULT: "#0f1222",
          subtle: "#141830",
          card: "#121528",
          hover: "#1a1f3d",
          border: "#23294f",
        },
        forge: {
          purple: "#8b5cf6",
          purpleDark: "#6d28d9",
          purpleLight: "#a78bfa",
          neon: "#c084fc",
          indigo: "#6366f1",
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "glow-lg": "0 0 40px -10px rgba(139, 92, 246, 0.4)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        "glow-rose": "0 0 25px -5px rgba(244, 63, 94, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "purple-glass": "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)",
        "card-glass": "linear-gradient(180deg, rgba(21, 25, 49, 0.7) 0%, rgba(15, 18, 34, 0.85) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
