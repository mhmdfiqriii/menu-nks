/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#DB0007",
        "primary-soft": "#fff0f0",
        "border-soft": "#ffe3e3"
      },

      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "13px",
        md: "14px",
        lg: "16px",
        xl: "18px"
      },

      borderRadius: {
        card: "20px",
        modal: "24px",
        button: "14px",
        pill: "999px"
      },

      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,0.05)",
        float: "0 12px 30px rgba(0,0,0,0.12)"
      }

    },
  },
  plugins: [],
}