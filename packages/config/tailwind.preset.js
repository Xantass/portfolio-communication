/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        bg: "#F5EFE6",
        ink: "#4A3B30",
        "ink-muted": "#6b584a",
        "ink-soft": "#5c4c3f",
        accent: "#C49D83",
        "accent-soft": "#BDA18A",
        blush: "#E8D5CC",
        olive: "#9E9F8D",
        tile: "#DACBB8",
        sand: "#EFE6D8",
        stone: "#D5CABC",
        wheat: "#E3D9C6",
        peach: "#FFDFD1",
        cream: "#F3E7DA",
        contact: "#4A3B30",
        "contact-line": "#8a7462",
        overlay: "rgba(74,59,48,0.85)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.3s ease",
      },
    },
  },
};

module.exports = preset;
