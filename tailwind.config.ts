import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tahoma", "Arial", "sans-serif"],
        arabic: ["Amiri", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
