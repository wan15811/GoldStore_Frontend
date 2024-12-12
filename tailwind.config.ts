import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        chart1: "#E60049",
        chart2: "#0BB4FF",
        chart3: "#50E991",
        chart4: "#E6D800",
        chart5: "#9B19F5",
        chart6: "#FFA300",
        chart7: "#DC0AB4",
        chart8: "#B3D4FF",
        chart9: "#00BFA0",

        buttonColor: "#FFEE65",
        SelectedButtonColor: "#B3D4FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
