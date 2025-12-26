/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        hand: ["Caveat_400Regular", "Caveat"],
        "hand-medium": ["Caveat_500Medium", "Caveat"],
        "hand-semibold": ["Caveat_600SemiBold", "Caveat"],
        "hand-bold": ["Caveat_700Bold", "Caveat"],
      },
      colors: {
        // Warm origami palette - inspired by sky gradient
        background: "hsl(35, 30%, 97%)",
        foreground: "hsl(25, 20%, 15%)",
        card: "hsl(40, 40%, 98%)",
        "card-foreground": "hsl(25, 20%, 15%)",
        muted: "hsl(35, 20%, 90%)",
        "muted-foreground": "hsl(25, 15%, 45%)",
        destructive: "hsl(0, 70%, 55%)",
        "destructive-foreground": "hsl(0, 0%, 100%)",
        border: "hsl(25, 20%, 20%)",
        // Aha origami palette
        aha: {
          "sky-top": "hsl(200, 55%, 65%)",
          "sky-mid": "hsl(180, 40%, 75%)",
          "sky-bottom": "hsl(340, 45%, 85%)",
          peach: "hsl(25, 60%, 88%)",
          cream: "hsl(40, 35%, 95%)",
          sage: "hsl(150, 25%, 80%)",
          lavender: "hsl(280, 30%, 88%)",
          coral: "hsl(12, 70%, 78%)",
          teal: "hsl(195, 45%, 35%)", // splash bg color
        },
      },
      borderRadius: {
        "2xl": 16,
        "3xl": 24,
      },
    },
  },
  plugins: [],
};

