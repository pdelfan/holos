/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        orange: { light: "#FF7D29", DEFAULT: "#FF6400", dark: "#E45A00" },
        purple: { light: "#DE5AFF", DEFAULT: "#CC00FF", dark: "#A900D3" },
        green: { light: "#1C8B1C", DEFAULT: "#115511", dark: "#0A330A" },
        gray: { light: "#838383", DEFAULT: "#555555", dark: "#181818" },
        input: {
          DEFAULT: "#EDEDED",
          placeholder: "#888888",
          text: "#666666",
        },
        button: {
          DEFAULT: "#EDEDED",
          text: "#808080",
          hover: "#E6E6E6",
        },
        table: {
          head: "#DCDCDC",
          row: "#FAFAFA",
          headBorder: "#B0B0B0",
          rowBorder: "#DDDDDD",
        },
      },
    },
  },
  plugins: [],
};
