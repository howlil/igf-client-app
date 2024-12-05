/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgb2b: '#cbcdcd',
        red: '#ED2137'
      },
      backgroundImage: {
        // 'bg-login': "url('/public/admin/bg-login.jpg')"
      }
    },
  },
  plugins: [],
}


