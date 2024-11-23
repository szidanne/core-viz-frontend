import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FFFFFF",
          surface: "#F0F0F0",
          primaryText: "#333333",
          secondaryText: "#666666",
          accent: "#4A90E2",
          button: "#4A90E2",
          hover: "#E5E5E5",
        },
        dark: {
          background: "#121212",
          surface: "#1E1E1E",
          primaryText: "#E5E5E5",
          secondaryText: "#B0B0B0",
          accent: "#4A90E2",
          button: "#4A90E2",
          hover: "#2D2D2D",
        },
        success: "#27AE60",
        warning: "#F39C12",
        error: "#E74C3C",
        "french-gray": "#abb2b8",
        onyx: "#333538",
        jet: "#2b2a2b",
      },
      fontSize: {
        xxs: "0.625rem", // double extra small, 10px
        "3xs": "0.5rem", // triple extra small, 8px
        "4xs": "0.375rem", // quadruple extra small, 6px
      },
      lineHeight: {
        xxs: "0.75rem", // line height for 'xxs' (12px)
        "3xs": "0.625rem", // line height for '3xs' (10px)
        "4xs": "0.5rem", // line height for '4xs' (8px)
      },
    },
  },
  plugins: [],
} satisfies Config;
