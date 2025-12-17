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
        navy: {
          DEFAULT: "#2D1B4E",
          50: "#f5f3f7",
          100: "#e8e4ed",
          200: "#d1c9db",
          300: "#a99bbf",
          400: "#816ba3",
          500: "#5f4282",
          600: "#4a336b",
          700: "#3d2561",
          800: "#2D1B4E",
          900: "#1f1235",
        },
        primary: {
          DEFAULT: "#2D1B4E",
          50: "#f5f3f7",
          100: "#e8e4ed",
          200: "#d1c9db",
          300: "#a99bbf",
          400: "#816ba3",
          500: "#5f4282",
          600: "#4a336b",
          700: "#3d2561",
          800: "#2D1B4E",
          900: "#1f1235",
        },
        secondary: {
          DEFAULT: "#4f46e5",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
    },
  },
  plugins: [],
};
export default config;
