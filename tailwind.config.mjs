/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        violet: "var(--violet)",
        lightPink: "var(--light-pink)",
        darkPink: "var(--dark-pink)",
        lightBlue: "var(--light-blue)",
        darkBlue: "var(--dark-blue)",
      },
    },
  },
  plugins: [],
};
