module.exports = {
  theme: {
    extend: {
      scale: {
        "0": "0",
        "25": ".25",
        "50": ".5",
        "75": ".75",
        "90": ".9",
        "95": ".95",
        "100": "1",
        "105": "1.05",
        "110": "1.1",
        "125": "1.25",
        "150": "1.5",
        "200": "2",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        // big: "1224px",

        xl: "1180px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  variants: {
    zIndex: ["responsive", "hover", "focus"],
    flex: ["responsive", "hover", "focus"],
    padding: ["responsive", "hover", "focus"],
    height: ["responsive", "hover", "focus"],
    width: ["responsive", "hover", "focus"],
    borderWidth: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/ui")],
};
