export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#00462D",
        primaryDark: "#B9FFE6",
        secondaryLight: "#F5F6F6",
        secondaryDark: "#161616",
        white: "#FFFFFF",
        black: "#000000",
        onSecondaryLight: "#51526C",
        onSecondaryDark: "#51526C",
        descriptionLight: "#999696",
        descriptionDark: "#999696",
        greenLight: "#2A9A46",
        greenDark: "#2FAE4F",
        beigeLight: "#FFE6CC",
        beigeDark: "#4C2800",
      },
      fontFamily: {
        sans: ["IBM_Plex_Sans_Arabic"],
        serif: ["IBM_Plex_Serif_Arabic"],
        mono: ["IBM_Plex_Mono_Arabic"],
        display: ["IBM_Plex_Sans_Arabic"],
        body: ["IBM_Plex_Sans_Arabic"],
      },
    },
  },
};