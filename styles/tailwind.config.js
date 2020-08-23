module.exports = {
  important: true,
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    colors: {
      // indigo: '#5c6ac4',
      // blue: '#007ace',
      // red: '#de3618',
    }
  },
  variants: {},
  plugins: [
    // require('@tailwindcss/typography'),
  ],
};