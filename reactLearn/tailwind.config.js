const obj = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./learn-space/tailwind/*.html"],
  plugins: [],
  // tailwind 4 no longer support darkMode: "class" so use css way instead
  // darkMode: "class",
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
