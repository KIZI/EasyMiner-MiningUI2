/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'plugin:@stylistic/disable-legacy',
  ],
  plugins: [
    '@stylistic',
  ],
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/no-multi-spaces': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};