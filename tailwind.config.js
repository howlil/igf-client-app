/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgb2b: '#cbcdcd',
        red: {
          DEFAULT: '#ED2137', 
          100: '#FEECEF',    
        },
      },
      backgroundImage: {
        'bg-login': "url('/admin/bg-login.jpg')"
      }
    },
  },
  plugins: [],
}


