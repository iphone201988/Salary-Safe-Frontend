/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',    
        secondary: '#F3F4F6 ',  
      },
      screens: {
        "max-720": { max: "720px" },
      },
    },
  },
  plugins: [],
}