/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      aria:{
        page: 'current="page"'
      },
      colors:{
        blue: {
          500: '#2e70ff'
        }
      }
    },
  },
  plugins: [],
}
