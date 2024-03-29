/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  endOfLine: 'lf',
  trailingComma: 'none',
  printWidth: 80,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: ['prettier-plugin-tailwindcss']
}
