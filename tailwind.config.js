/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dblue: "#1d2226",
        btnblue: "#0a66c2",
        btnbluedark: "#004182",
        btnbluelight: "rgba(112,181,249,0.2)",
        lstone: "#f3f2ef",
        "bg-gradient-radial":
          "radial-gradient(circle, rgba(21, 32, 43, 1) 100%, rgba(25, 69, 71, 1) 50%)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      screens: {
        b600: "1210px",
        b400: "950px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
