import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151412",
        bone: "#f7f2ea",
        porcelain: "#fffdf9",
        oat: "#dfd2bf",
        stone: "#8a8176"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
