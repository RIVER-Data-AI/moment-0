import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "river-black": "#2D3648",
        "primary-border": "#CBD2E0",
        "main-action": "#2D3748",
        "chat-primary-bg": "#2C3B4F",
        "chat-secondary-bg": "#ECECEC",
        "icons-primary": "#ABB0BC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
