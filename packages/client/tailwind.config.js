/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        spicy: {
          primary: "#F97316", // 🔥 bright orange
          secondary: "#DC2626", // deep red
          accent: "#FACC15", // yellow pop
          neutral: "#1E1E1E", // dark neutral base
          "base-100": "#0F0F0F", // background
          info: "#3ABFF8",
          success: "#22C55E",
          warning: "#FB923C",
          error: "#EF4444",
          "--rounded-box": "1.2rem",
          "--rounded-btn": "1rem",
          "--tab-radius": "0.8rem",
        },
      },
      "light",
      "dark",
    ],
  },
};
