/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define custom background colors
        'primary': '#262626',
        'secondary': '#2C2C2C',
        // Define custom text colors
        'text-primary': '#1576A0',
        'white': '#fff',
        'light-white':'#4C4C4C',
        "light-primary":"#3E3E3E"          
      },
    },
  },
  plugins: [],
}

