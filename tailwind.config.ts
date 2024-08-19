import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "744px",
      xl: "1280px",
    },
    extend: {
      keyframes: {
        "slide-in-left": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 1s ease-out",
        "slide-in-right": "slide-in-right 1s ease-out",
      },
      translate: {
        "-full": "-100%", // 'translate-x--full': '-100%'
      },
      colors: {
        brand: {
          primary: "#10B981",
          secondary: "#34D399",
          tertiary: "#A3E635",
        },
        point: {
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          pink: "#EC4899",
          rose: "#F43F5E",
          orange: "#F97316",
          yellow: "#EAB308",
        },
        background: {
          primary: "#0F172A",
          secondary: "#1E293B",
          tertiary: "#334155",
          inverse: "#FFFFFF",
        },
        interaction: {
          inactive: "#94A3B8",
          hover: "#059669",
          pressed: "#047857",
          focus: "#10B981",
        },
        border: {
          primary: "#F8FAFC",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          tertiary: "#E2E8F0",
          default: "#64748B",
          inverse: "#FFFFFF",
          disabled: "#94A3B8",
        },
        status: {
          danger: "#DC2626",
        },
        icon: {
          primary: "#64748B",
          inverse: "#F8FAFC",
          brand: "#10B981",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradient: "linear-gradient(to right, #10B981, #A3E635)",
      },

      fontFamily: { Pretendard: ["Pretendard", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        },
      });
    },
  ],
};
export default config;
