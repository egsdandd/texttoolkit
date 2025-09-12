import jsdoc from 'eslint-plugin-jsdoc'

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: { jsdoc }, // <-- Lägg till DENNA RAD
    rules: {
      semi: ['error', 'never'],
      'no-unused-vars': 'error',
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns': 'warn'
    }
  }
]
