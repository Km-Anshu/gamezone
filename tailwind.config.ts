import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1422px",
      // => @media (min-width: 1422px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "2xxl": "1620px",
      // => @media(min-width: 1620px){ ...}
    },
    extend: {
      backgroundImage: {
        "home-bg": "url('/assets/home-bg.jpg')",
        "pitches-bg": "url('/assets/pitches-bg.png')",
        "product-insight-bg": "url('/assets/product-insight-bg.png')",
        "sales-flow-bg": "url('/assets/sales-flow-bg.png')",
        "performance-report-bg": "url('/assets/performance-report-bg.png')",
        "goroup-tooltip-bg": "url('/assets/gourp-tooltip-bg.png')",
      },
      colors: {
        "body-background": "#f4f7fe",

        "white-prime-1": "#fcfcfc",
        "white-base-prime-1": "#9AA8D1",
        "white-base-prime-2": "#e0e4f2",
        "blue-prime-1": "#4434DD",
        "blue-prime-light": "#adb9da",
        "blue-secondary-1": "#8076EE",
        "blue-dark-prime-1": "#2B3674",
        "blue-dark-prime-2": "#707eae",
        "orange-prime-1": "#fb7a7a",
        "gray-light-1": "#d9dff1",
        "gray-light-2": "#848aae",
        "gray-light-3": "#d7def1",
        "gray-light-4": "#f0f4ff",
        "gray-light-5": "#EFEFFE",
        "gray-light-6": "#eceff7",
        "gray-dark-1": "#babad4",
        "gray-dark-2": "#aaafc7",
        "gray-dark-3": "#eaebf1",
        "gray-dark-4": "#f4f4f5",
        "red-prime-1": "#f86565",
        "green-light-1": "#deeff6",
        "green-prime-1": "#8cca81",
        "green-prime-3": "#a4dddc",
        "purple-prime-1": "#975cd7",
      },
      borderRadius: {
        xxlarge: "1.87rem",
        "xxlarge-1": "1.83rem",
      },
      spacing: {},
    },
  },
  plugins: [require("daisyui")],
};
export default config;
