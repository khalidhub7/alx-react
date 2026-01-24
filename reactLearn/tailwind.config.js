const obj = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./learn-space/tailwind/*"],
  plugins: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0000FF", // blue
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        main: ["Inter", "sans-serif"],
      },
    },
  },
};

export default obj;
