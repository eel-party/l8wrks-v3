module.exports = {
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
        // padding: '8rem',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};