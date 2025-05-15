import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary/80": "#3b82f6",
        "primary/10": "#dbeafe",
        "accent-teal": "#0d9488",
        charcoal: "#1f2937",
      },
      fontFamily: {
        muktaMalar: ['"Mukta Malar"', "sans-serif"],
        dmSans: ['"DM Sans"', "sans-serif"],
        notoSans: ['"Noto Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
