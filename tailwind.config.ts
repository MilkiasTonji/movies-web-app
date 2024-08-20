import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2BD17E",
        error: "#EB5757",
        background: "#093545",
        inputColor: "#224957",
        cardColor: "#092C39"
      },
      fontSize: {
        h1: ['64px', '80px'],
        h2: ['48px', '56px'],
        h3: ['32px', '40px'],
        h4: ['24px', '32px'],
        h5: ['20px', '24px'],
        h6: ['16px', '24px'],
        large: ['20px', '32px'],
        regular: ['16px', '24px'],
        small: ['14px', '24px'],
        xsmall: ['12px', '24px'],
        caption: ['14px', '16px'],
      },
      spacing: {
        xsmall: "2px",
        small: "4px",
        regular: "8px",
        large: "12px",
        xlarge: "24px",
        xxlarge: "32px"
      },
      width: {
        'box': "300px"
      }
    },
  },
  plugins: [],
};
export default config;
