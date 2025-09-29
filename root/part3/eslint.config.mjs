import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
    },
  },
  {
    files: ['tests/*.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
  globalIgnores(['dist/']),
]);
