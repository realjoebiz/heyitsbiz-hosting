import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        inkMuted: "var(--ink-muted)",
        primary: "var(--primary)",
        primaryDark: "var(--primary-dark)",
        accent2: "var(--accent2)",
        accent2Deep: "var(--accent2-deep)",
        green: "var(--green)",
        red: "var(--red)",
        line: "var(--line)",
        surfaceInverse: "var(--surface-inverse)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
