import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        grey2: "#6b7380",
        purple1: "#7c3aed",
        purple2: "#4e45e5",
        purple3: "#4237c8",
        white2: "#f2f4f7",
        black2: "#010001",
      },
    },
  },
  plugins: [],
} satisfies Config;
