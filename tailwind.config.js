/** @type {import('tailwindcss').Config} */
module.exports = {  
  plugins: [require("tailwindcss-animated")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        orange: { light: "#FF7D29", DEFAULT: "#FF6D0E", dark: "#E5620C" },
        purple: { light: "#DE5AFF", DEFAULT: "#CC00FF", dark: "#A900D3" },
        green: { light: "#1C8B1C", DEFAULT: "#115511", dark: "#0A330A" },
        gray: { light: "#838383", DEFAULT: "#555555", dark: "#181818" },
        nandor: { light: "#E3FFF5", DEFAULT: "#A3B3AD", dark: "#4B5A54" },
        input: {
          DEFAULT: "#EDEDED",
          placeholder: "#888888",
          text: "#666666",
          focus: "#E3E3E3",
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
        header: {
          1: "#333333",
          2: "#888888",
        },
      },
    },
  },
};
