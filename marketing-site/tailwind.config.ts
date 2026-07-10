import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        elevated: "#030304",
        foreground: "rgba(255, 255, 255, 0.9)",
        muted: "rgba(255, 255, 255, 0.6)",
        brand: {
          indigo: "#1D3FD6",
          cyan: "#3FE0FF",
        },
        risk: {
          critical: "#FF4545",
          high: "#FFA53F",
          medium: "#F5D547",
          safe: "#2FD97C",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(to right, rgba(29, 63, 214, 0.5), rgba(63, 224, 255, 0.5))',
      }
    },
  },
  plugins: [],
};
export default config;
