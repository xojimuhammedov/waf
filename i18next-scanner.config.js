// eslint-disable-next-line no-undef
module.exports = {
  input: ['src/**/*.ts', 'src/**/*.tsx'], // Glob patterns to match your source code files.
  output: 'locales/$LOCALE/$NAMESPACE.json',
  options: {
    debug: false,
    func: {
      list: ['t'], // This should match the function you use for translations in your code (e.g., 't' or 'i18n.t').
      extensions: ['.ts', '.tsx']
    },
    trans: false // You don't need to provide translations in this configuration.
  }
};
