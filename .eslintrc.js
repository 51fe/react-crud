module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended',
    'plugin:react/jsx-runtime', 'plugin:@typescript-eslint/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
